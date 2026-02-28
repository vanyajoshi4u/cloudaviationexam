import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@4.0.0";

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
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate user with getUser for Lovable Cloud ES256 tokens
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const body = await req.json();
    const { action } = body;

    if (action === "check-session") {
      // Clean up stale sessions first
      await supabaseAdmin.rpc("cleanup_stale_sessions");

      const { data: sessions } = await supabaseAdmin
        .from("active_sessions")
        .select("*")
        .eq("user_id", user.id);

      if (sessions && sessions.length > 0) {
        return new Response(JSON.stringify({
          hasActiveSession: true,
          message: "You are already logged in on another device. Please log out from the other device first.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ hasActiveSession: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "send-verification") {
      // Ensure profile exists (for first login after email verification)
      const { data: existingProfile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!existingProfile) {
        await supabaseAdmin.from("profiles").insert({
          user_id: user.id,
          full_name: user.user_metadata?.full_name || "",
          phone: user.user_metadata?.phone || "",
          email: user.email || "",
        });
      }

      // Clean up old verifications
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
        console.error("Verification insert error:", verifyInsertError);
        throw new Error("Failed to create verification");
      }

      const origin = req.headers.get("origin") || "https://cloudaviationexam.lovable.app";
      const verificationLink = `${origin}/verify-login?token=${verification.token}&uid=${user.id}`;

      // Send email
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const { error: emailError } = await resend.emails.send({
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
        if (emailError) {
          console.error("Email send error:", emailError);
        }
      } else {
        console.warn("No RESEND_API_KEY configured, skipping email");
      }

      return new Response(JSON.stringify({ success: true, message: "Verification email sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "logout") {
      await supabaseAdmin.from("active_sessions").delete().eq("user_id", user.id);
      await supabaseAdmin.from("login_verifications").delete().eq("user_id", user.id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "heartbeat") {
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
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
