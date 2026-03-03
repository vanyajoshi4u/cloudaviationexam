const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

import { checkRateLimit, rateLimitResponse, getClientIP } from "../_shared/rate-limiter.ts";
import { logAudit } from "../_shared/audit-logger.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limit: 5 password resets per 15 minutes per IP
    const ip = getClientIP(req);
    const rateCheck = await checkRateLimit({
      action: "reset-pwd",
      identifier: ip,
      maxRequests: 5,
      windowSeconds: 900,
    });
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck, corsHeaders);

    const { email, password } = await req.json();
    console.log("Reset password request for:", email);

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Step 1: Find user by email using generate_link (works even if no profile exists)
    console.log("Step 1: Looking up user...");
    let userId: string | null = null;

    // Try profiles table first (fast)
    const profileRes = await fetchWithTimeout(
      `${supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(email.toLowerCase().trim())}&select=user_id&limit=1`,
      {
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
      }
    );

    if (profileRes.ok) {
      const profiles = await profileRes.json();
      if (profiles && profiles.length > 0) {
        userId = profiles[0].user_id;
        console.log("Found via profiles table");
      }
    } else {
      await profileRes.text();
    }

    // Fallback: use Auth Admin generate_link to find user by email
    if (!userId) {
      console.log("Trying auth admin generate_link...");
      const linkRes = await fetchWithTimeout(
        `${supabaseUrl}/auth/v1/admin/generate_link`,
        {
          method: "POST",
          headers: {
            "apikey": serviceRoleKey,
            "Authorization": `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "recovery",
            email: email.toLowerCase().trim(),
          }),
        }
      );

      if (linkRes.ok) {
        const linkData = await linkRes.json();
        userId = linkData.id || linkData.user?.id || null;
        console.log("Found via generate_link:", !!userId);
      } else {
        const errText = await linkRes.text();
        console.log("generate_link response:", linkRes.status, errText);
      }
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: "No account found with this email" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Step 2: Updating password for user:", userId);

    // Step 2: Update password via Auth Admin API
    const updateRes = await fetchWithTimeout(
      `${supabaseUrl}/auth/v1/admin/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error("Password update failed:", errText);
      throw new Error(`Password update failed: ${errText}`);
    }

    console.log("Step 3: Clearing active sessions...");

    // Step 3: Clear active sessions (fire and forget)
    fetchWithTimeout(
      `${supabaseUrl}/rest/v1/active_sessions?user_id=eq.${userId}`,
      {
        method: "DELETE",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
      }
    ).catch((e) => console.error("Session cleanup failed (non-critical):", e));

    console.log("Password reset complete!");
    logAudit({ user_id: userId!, action: "password_reset", ip_address: ip, details: { email } });
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to reset password";
    console.error("Reset password error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
