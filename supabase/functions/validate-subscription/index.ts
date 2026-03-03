const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function getUser(token: string) {
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

async function dbQuery(path: string) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
  });
  const text = await res.text();
  return { ok: res.ok, data: text ? JSON.parse(text) : null };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ valid: false, reason: "no_auth" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const user = await getUser(token);

    if (!user?.id) {
      return new Response(
        JSON.stringify({ valid: false, reason: "invalid_token" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check active session
    const { data: sessions } = await dbQuery(
      `active_sessions?user_id=eq.${user.id}&select=id&limit=1`
    );
    if (!sessions || sessions.length === 0) {
      return new Response(
        JSON.stringify({ valid: false, reason: "no_session" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin
    const { data: roles } = await dbQuery(
      `user_roles?user_id=eq.${user.id}&role=eq.admin&select=role&limit=1`
    );
    if (roles && roles.length > 0) {
      return new Response(
        JSON.stringify({ valid: true, role: "admin" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check subscription
    const { data: subs } = await dbQuery(
      `subscriptions?user_id=eq.${user.id}&status=eq.approved&select=plan,expires_at&order=created_at.desc`
    );

    const activeSubs = (subs || []).filter((s: any) => s.expires_at && new Date(s.expires_at) > new Date());

    if (activeSubs.length === 0) {
      return new Response(
        JSON.stringify({ valid: false, reason: "no_subscription" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const plans = activeSubs.map((s: any) => s.plan);
    return new Response(
      JSON.stringify({ valid: true, plan: plans[0], plans }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Validate subscription error:", error);
    return new Response(
      JSON.stringify({ valid: false, reason: "error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
