const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const { token, uid, action } = await req.json();

    // Poll action: check if a verification for this user has been verified
    if (action === "check-status") {
      if (!uid) {
        return new Response(JSON.stringify({ verified: false, error: "Missing uid" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(
        `${supabaseUrl}/rest/v1/login_verifications?user_id=eq.${uid}&verified=eq.true&select=id&limit=1`,
        {
          headers: {
            "apikey": serviceRoleKey,
            "Authorization": `Bearer ${serviceRoleKey}`,
          },
        }
      );

      const data = await res.json();
      const verified = Array.isArray(data) && data.length > 0;

      return new Response(JSON.stringify({ verified }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify action: mark token as verified and create session
    if (!token || !uid) {
      return new Response(JSON.stringify({ error: "Missing token or uid", valid: false }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find the verification record
    const now = new Date().toISOString();
    const lookupRes = await fetch(
      `${supabaseUrl}/rest/v1/login_verifications?token=eq.${encodeURIComponent(token)}&user_id=eq.${uid}&verified=eq.false&expires_at=gt.${now}&select=id&limit=1`,
      {
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
      }
    );

    const verifications = await lookupRes.json();
    if (!Array.isArray(verifications) || verifications.length === 0) {
      return new Response(JSON.stringify({
        error: "Invalid or expired verification link. Please log in again.",
        valid: false,
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const verificationId = verifications[0].id;

    // Mark as verified
    await fetch(
      `${supabaseUrl}/rest/v1/login_verifications?id=eq.${verificationId}`,
      {
        method: "PATCH",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verified: true }),
      }
    );

    // Create active session (remove old ones first)
    await fetch(`${supabaseUrl}/rest/v1/active_sessions?user_id=eq.${uid}`, {
      method: "DELETE",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
      },
    });

    // Create active session (remove old ones first)
    await fetch(`${supabaseUrl}/rest/v1/active_sessions?user_id=eq.${uid}`, {
      method: "DELETE",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
      },
    });

    await fetch(`${supabaseUrl}/rest/v1/active_sessions`, {
      method: "POST",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({ user_id: uid }),
    });

    // Send admin notification email (fire-and-forget)
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      // Fetch user profile for name, phone, email
      const profileRes = await fetch(
        `${supabaseUrl}/rest/v1/profiles?user_id=eq.${uid}&select=full_name,phone,email&limit=1`,
        {
          headers: {
            "apikey": serviceRoleKey,
            "Authorization": `Bearer ${serviceRoleKey}`,
          },
        }
      );
      const profiles = await profileRes.json();
      const profile = Array.isArray(profiles) && profiles.length > 0 ? profiles[0] : null;
      const userName = profile?.full_name || "Unknown";
      const userEmail = profile?.email || "Unknown";
      const userPhone = profile?.phone || "N/A";

      // Check if user has any active subscription
      const subRes = await fetch(
        `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${uid}&status=eq.approved&select=id&limit=1`,
        {
          headers: {
            "apikey": serviceRoleKey,
            "Authorization": `Bearer ${serviceRoleKey}`,
          },
        }
      );
      const subs = await subRes.json();
      const hasSubscription = Array.isArray(subs) && subs.length > 0;
      const subStatus = hasSubscription ? "✅ Subscribed" : "❌ No Subscription";

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
          to: ["cloudaviation4u@gmail.com"],
          subject: `🔑 User Login – ${userName} (${subStatus})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1e293b;">User Login Notification</h2>
              <div style="background: #f8fafc; border-radius: 12px; padding: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Name</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${userName}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Email</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${userEmail}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Phone</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${userPhone}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Subscription</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${subStatus}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Time</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                  </tr>
                </table>
              </div>
            </div>
          `,
        }),
      }).catch((err) => console.error("Admin login notification failed:", err));
    }

    return new Response(JSON.stringify({
      valid: true,
      message: "Login verified successfully!",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Verify token error:", error);
    return new Response(JSON.stringify({ error: msg, valid: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
