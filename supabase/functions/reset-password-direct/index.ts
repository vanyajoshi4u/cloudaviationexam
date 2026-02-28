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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Step 1: Find user by email using profiles table
    console.log("Step 1: Looking up profile...");
    const profileRes = await fetchWithTimeout(
      `${supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(email.toLowerCase().trim())}&select=user_id&limit=1`,
      {
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
      }
    );

    if (!profileRes.ok) {
      const errText = await profileRes.text();
      console.error("Profile lookup failed:", errText);
      throw new Error(`Profile lookup failed: ${errText}`);
    }

    const profiles = await profileRes.json();
    console.log("Profile lookup result:", profiles?.length, "profiles found");

    if (!profiles || profiles.length === 0) {
      return new Response(JSON.stringify({ error: "No account found with this email" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = profiles[0].user_id;
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

    // Step 3: Clear active sessions (fire and forget - don't block on this)
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
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Failed to reset password" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
