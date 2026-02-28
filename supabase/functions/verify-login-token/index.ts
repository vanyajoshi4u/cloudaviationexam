import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// This function does NOT require authentication - user is signed out when clicking magic link
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { token, uid } = await req.json();

    if (!token || !uid) {
      return new Response(JSON.stringify({ error: "Missing token or uid", valid: false }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find the verification record
    const { data: verification, error } = await supabaseAdmin
      .from("login_verifications")
      .select("*")
      .eq("token", token)
      .eq("user_id", uid)
      .eq("verified", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !verification) {
      console.error("Verification lookup error:", error);
      return new Response(JSON.stringify({
        error: "Invalid or expired verification link. Please log in again.",
        valid: false,
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark as verified
    await supabaseAdmin
      .from("login_verifications")
      .update({ verified: true })
      .eq("id", verification.id);

    // Create active session (remove old ones first)
    await supabaseAdmin.from("active_sessions").delete().eq("user_id", uid);
    await supabaseAdmin.from("active_sessions").insert({ user_id: uid });

    return new Response(JSON.stringify({
      valid: true,
      message: "Login verified successfully!",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Verify token error:", error);
    return new Response(JSON.stringify({ error: error.message, valid: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
