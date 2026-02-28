import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the authenticated user
    const supabaseUser = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { action } = await req.json();

    if (action === "check-session") {
      // Check if user already has an active session
      const { data: sessions } = await supabaseAdmin
        .from("active_sessions")
        .select("*")
        .eq("user_id", user.id);

      // Clean up stale sessions (older than 24 hours)
      if (sessions && sessions.length > 0) {
        const staleThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const activeSession = sessions.find((s: any) => s.last_active_at > staleThreshold);
        
        if (activeSession) {
          return new Response(JSON.stringify({ 
            hasActiveSession: true,
            message: "You are already logged in on another device. Please log out from the other device first." 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Clean up stale sessions
        await supabaseAdmin
          .from("active_sessions")
          .delete()
          .eq("user_id", user.id);
      }

      return new Response(JSON.stringify({ hasActiveSession: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "send-verification") {
      // Clean up old verifications for this user
      await supabaseAdmin
        .from("login_verifications")
        .delete()
        .eq("user_id", user.id);

      // Create new verification token
      const { data: verification, error: verifyInsertError } = await supabaseAdmin
        .from("login_verifications")
        .insert({ user_id: user.id })
        .select("token")
        .single();

      if (verifyInsertError || !verification) {
        throw new Error("Failed to create verification");
      }

      // Get origin from request for the verification link
      const origin = req.headers.get("origin") || "https://cloudaviationexam.lovable.app";
      const verificationLink = `${origin}/verify-login?token=${verification.token}&uid=${user.id}`;

      // Send email
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "CloudAviation Exam's <onboarding@resend.dev>",
          to: [user.email!],
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
        });
      }

      return new Response(JSON.stringify({ success: true, message: "Verification email sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify-token") {
      const { token, uid } = await req.json().catch(() => ({}));
      // Token and uid come from URL params, re-parse from body
      const body = JSON.parse(await new Response(req.body).text().catch(() => "{}"));
      
      // Actually we already parsed the body above. Let me restructure.
      return new Response(JSON.stringify({ error: "Use GET endpoint for token verification" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "activate-session") {
      // Check if verification is complete
      const { data: verifications } = await supabaseAdmin
        .from("login_verifications")
        .select("*")
        .eq("user_id", user.id)
        .eq("verified", true)
        .gt("expires_at", new Date().toISOString());

      if (!verifications || verifications.length === 0) {
        return new Response(JSON.stringify({ error: "Login not verified" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Remove any existing sessions and create new one
      await supabaseAdmin.from("active_sessions").delete().eq("user_id", user.id);
      await supabaseAdmin.from("active_sessions").insert({ user_id: user.id });

      // Clean up verifications
      await supabaseAdmin.from("login_verifications").delete().eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "logout") {
      // Remove active session
      await supabaseAdmin.from("active_sessions").delete().eq("user_id", user.id);
      // Clean up verifications
      await supabaseAdmin.from("login_verifications").delete().eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "heartbeat") {
      // Update last_active_at to keep session alive
      await supabaseAdmin
        .from("active_sessions")
        .update({ last_active_at: new Date().toISOString() })
        .eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
