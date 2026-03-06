const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Helper: call Supabase REST API
async function dbQuery(path: string, options: RequestInit = {}) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      "apikey": serviceRoleKey,
      "Authorization": `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      "Prefer": options.method === "POST" ? "return=representation" : "",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null };
}

// Helper: get user from token
async function getUser(token: string) {
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

// Helper: call RPC function
async function rpc(fnName: string) {
  await fetch(`${supabaseUrl}/rest/v1/rpc/${fnName}`, {
    method: "POST",
    headers: {
      "apikey": serviceRoleKey,
      "Authorization": `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
}

import { checkRateLimit, rateLimitResponse, getClientIP } from "../_shared/rate-limiter.ts";
import { logAudit } from "../_shared/audit-logger.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ip = getClientIP(req);
    const authHeader = req.headers.get("Authorization");
    const body = await req.json();
    const { action, origin: clientOrigin, fingerprint, device_label } = body;
    const normalizedFingerprint = typeof fingerprint === "string" ? fingerprint.trim() : "";
    const normalizedDeviceLabel = typeof device_label === "string" ? device_label.trim() : "";

    // Rate limit based on action type
    const rateIdentifier = normalizedFingerprint || ip;

    if (action === "check-and-verify" || action === "send-verification") {
      const rateCheck = await checkRateLimit({
        action: "login-verify",
        identifier: rateIdentifier,
        maxRequests: 20,
        windowSeconds: 900,
      });
      if (!rateCheck.allowed) return rateLimitResponse(rateCheck, corsHeaders);
    } else if (action === "force-logout") {
      // Force-logout guardrail per trusted device
      const rateCheck = await checkRateLimit({
        action: "force-logout",
        identifier: rateIdentifier,
        maxRequests: 10,
        windowSeconds: 1800,
      });
      if (!rateCheck.allowed) return rateLimitResponse(rateCheck, corsHeaders);
    }

    // Handle logout without requiring authentication
    if (action === "logout") {
      let userId: string | null = null;

      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.replace("Bearer ", "");
        const user = await getUser(token);
        userId = user?.id || null;
      }

      if (!userId) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await dbQuery(`active_sessions?user_id=eq.${userId}`, { method: "DELETE" });
      await dbQuery(`login_verifications?user_id=eq.${userId}`, { method: "DELETE" });
      logAudit({ user_id: userId, action: "logout", ip_address: ip });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Force logout: clears all sessions for an authenticated user so they can re-login
    if (action === "force-logout") {
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "No authorization header" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const token = authHeader.replace("Bearer ", "");
      const user = await getUser(token);
      if (!user?.id) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // SERVER-SIDE: Force logout requires a trusted device fingerprint
      if (!normalizedFingerprint) {
        return new Response(JSON.stringify({
          error: "Device verification is required for force logout.",
          blocked: true,
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: knownDevices } = await dbQuery(
        `device_fingerprints?user_id=eq.${user.id}&fingerprint=eq.${encodeURIComponent(normalizedFingerprint)}&select=id&limit=1`
      );
      if (!knownDevices || knownDevices.length === 0) {
        // This device is NOT registered - block force-logout
        logAudit({ user_id: user.id, action: "force_logout_blocked_unknown_device", ip_address: ip, details: { fingerprint: normalizedFingerprint } });
        return new Response(JSON.stringify({ 
          error: "Force logout is only available from your trusted device. Please contact support.",
          blocked: true 
        }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Clear all sessions and verifications
      await dbQuery(`active_sessions?user_id=eq.${user.id}`, { method: "DELETE" });
      await dbQuery(`login_verifications?user_id=eq.${user.id}`, { method: "DELETE" });

      // Send alert email to account owner about force-logout
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey && user.email) {
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
            to: [user.email],
            subject: "⚠️ Security Alert: All Devices Logged Out",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #dc2626; text-align: center;">⚠️ Security Alert</h2>
                <p style="color: #555; text-align: center;">
                  All devices have been logged out of your CloudAviation Exam's account.
                </p>
                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="color: #991b1b; font-size: 14px; margin: 0;">
                    <strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}<br/>
                    <strong>IP:</strong> ${ip}
                  </p>
                </div>
                <p style="color: #555; font-size: 13px; text-align: center;">
                  If this wasn't you, please change your password immediately.
                </p>
              </div>
            `,
          }),
        }).catch((err) => console.error("Force logout alert email failed:", err));
      }

      logAudit({ user_id: user.id, action: "force_logout", ip_address: ip });
      return new Response(JSON.stringify({ success: true, message: "All sessions cleared. You can now log in." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // All other actions require authentication
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = await getUser(token);

    if (!user?.id) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sendVerificationEmail = (verificationLink: string) => {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (!resendApiKey || !user.email) {
        console.warn("Missing RESEND_API_KEY or user email");
        return;
      }

      (globalThis as any).EdgeRuntime?.waitUntil?.((async () => {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
              to: [user.email],
              subject: "Verify Your Login - CloudAviation Exam's",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #1a1a2e; text-align: center;">✈️ Login Verification</h2>
                  <p style="color: #555; text-align: center;">
                    A login attempt was made to your CloudAviation Exam's account. Click the button below to verify this login.
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" 
                       style="background-color: #0ea5e9; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                      Verify Login
                    </a>
                  </div>
                  <p style="color: #999; font-size: 12px; text-align: center;">
                    This link expires in 10 minutes. If you didn't attempt to log in, please ignore this email.
                  </p>
                </div>
              `,
            }),
          });
          if (!res.ok) {
            const errText = await res.text();
            console.error("Email send error:", errText);
          }
        } catch (e) {
          console.error("Email send exception:", e);
        }
      })());
    };

    const ensureProfile = async () => {
      const { data: profiles } = await dbQuery(
        `profiles?user_id=eq.${user.id}&select=id&limit=1`
      );
      if (!profiles || profiles.length === 0) {
        await dbQuery("profiles", {
          method: "POST",
          body: JSON.stringify({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || "",
            phone: user.user_metadata?.phone || "",
            email: user.email || "",
          }),
        });
      }
    };

    const createAndQueueVerification = async () => {
      await ensureProfile();

      // Clean up old verifications
      await dbQuery(`login_verifications?user_id=eq.${user.id}`, { method: "DELETE" });

      // Create new verification token WITH fingerprint
      if (!normalizedFingerprint) {
        throw new Error("Device verification is required. Please enable browser fingerprinting and try again.");
      }

      const verificationBody: Record<string, string> = {
        user_id: user.id,
        fingerprint: normalizedFingerprint,
      };
      if (normalizedDeviceLabel) verificationBody.device_label = normalizedDeviceLabel;

      const { data: verifications, ok } = await dbQuery("login_verifications", {
        method: "POST",
        body: JSON.stringify(verificationBody),
      });

      if (!ok || !verifications?.[0]?.token) {
        throw new Error("Failed to create verification");
      }

      // Always use the published custom domain to avoid auth-bridge interception
      const origin = "https://cloudaviationexams.com";
      const verificationLink = `${origin}/verify-login?token=${verifications[0].token}&uid=${user.id}`;
      sendVerificationEmail(verificationLink);
    };

    if (action === "check-session" || action === "check-and-verify") {
      await rpc("cleanup_stale_sessions");

      const { data: sessions } = await dbQuery(
        `active_sessions?user_id=eq.${user.id}&select=id`
      );

      if (sessions && sessions.length > 0) {
        logAudit({ user_id: user.id, action: "login_blocked_session", ip_address: ip });
        return new Response(JSON.stringify({
          hasActiveSession: true,
          message: "You are already logged in on another device. Please log out from the other device first.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // SERVER-SIDE strict fingerprint check before sending verification
      if (action === "check-and-verify") {
        if (!normalizedFingerprint) {
          return new Response(JSON.stringify({
            hasActiveSession: false,
            deviceBlocked: true,
            error: "Device verification failed. Please disable private mode/content blockers and try again.",
          }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { data: deviceCheck } = await dbQuery(
          `rpc/check_device_allowed`,
          {
            method: "POST",
            body: JSON.stringify({ _user_id: user.id, _fingerprint: normalizedFingerprint }),
          }
        );

        if (deviceCheck === false) {
          logAudit({ user_id: user.id, action: "login_blocked_device_limit", ip_address: ip, details: { fingerprint: normalizedFingerprint } });
          return new Response(JSON.stringify({
            hasActiveSession: false,
            deviceBlocked: true,
            error: "You are up to the device limit. You have already set up 3 devices. For more info contact cloudaviation4u@gmail.com",
          }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      if (action === "check-and-verify") {
        await createAndQueueVerification();
        return new Response(JSON.stringify({ hasActiveSession: false, success: true, message: "Verification email sent" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ hasActiveSession: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "send-verification") {
      if (!normalizedFingerprint) {
        return new Response(JSON.stringify({
          error: "Device verification failed. Please try again from your trusted browser.",
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: deviceCheck } = await dbQuery(
        `rpc/check_device_allowed`,
        {
          method: "POST",
          body: JSON.stringify({ _user_id: user.id, _fingerprint: normalizedFingerprint }),
        }
      );

      if (deviceCheck === false) {
        return new Response(JSON.stringify({
          error: "You are up to the device limit. You have already set up 3 devices. For more info contact cloudaviation4u@gmail.com",
          deviceBlocked: true,
        }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await createAndQueueVerification();
      return new Response(JSON.stringify({ success: true, message: "Verification email sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create-session") {
      await ensureProfile();
      await dbQuery(`active_sessions?user_id=eq.${user.id}`, { method: "DELETE" });
      await dbQuery("active_sessions", {
        method: "POST",
        body: JSON.stringify({ user_id: user.id }),
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "heartbeat") {
      await dbQuery(
        `active_sessions?user_id=eq.${user.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ last_active_at: new Date().toISOString() }),
        }
      );
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
