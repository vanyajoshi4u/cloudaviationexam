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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const body = await req.json();
    const { action, origin: clientOrigin } = body;

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
      return new Response(JSON.stringify({ success: true }), {
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

      EdgeRuntime.waitUntil((async () => {
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

      // Create new verification token
      const { data: verifications, ok } = await dbQuery("login_verifications", {
        method: "POST",
        body: JSON.stringify({ user_id: user.id }),
      });

      if (!ok || !verifications?.[0]?.token) {
        throw new Error("Failed to create verification");
      }

      // Always use the published domain to avoid auth-bridge interception on preview URLs
      const origin = "https://cloudaviationexam.lovable.app";
      const verificationLink = `${origin}/verify-login?token=${verifications[0].token}&uid=${user.id}`;
      sendVerificationEmail(verificationLink);
    };

    if (action === "check-session" || action === "check-and-verify") {
      await rpc("cleanup_stale_sessions");

      const { data: sessions } = await dbQuery(
        `active_sessions?user_id=eq.${user.id}&select=id`
      );

      if (sessions && sessions.length > 0) {
        return new Response(JSON.stringify({
          hasActiveSession: true,
          message: "You are already logged in on another device. Please log out from the other device first.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
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
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
