const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

async function dbQuery(path: string, options: RequestInit = {}) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: options.method === "PATCH" ? "return=minimal" : "",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  return { ok: res.ok, data: text ? JSON.parse(text) : null };
}

async function sendExpiryEmail(email: string, fullName: string, daysLeft: number, plan: string) {
  const planLabel = plan === "3_months" ? "3 Months" : plan === "6_months" ? "6 Months" : "12 Months";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
      to: [email],
      subject: `⚠️ Your subscription expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""} — CloudAviation Exam's`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a2e; text-align: center;">✈️ Subscription Expiry Notice</h2>
          <p style="color: #333;">Hi ${fullName || "there"},</p>
          <p style="color: #555;">
            Your <strong>${planLabel}</strong> subscription on CloudAviation Exam's 
            will expire in <strong>${daysLeft} day${daysLeft !== 1 ? "s" : ""}</strong>.
          </p>
          <p style="color: #555;">
            To continue accessing all quiz content and practice exams without interruption, 
            please renew your subscription before it expires.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://cloudaviationexams.com/subscribe" 
               style="background-color: #0ea5e9; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Renew Now
            </a>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you've already renewed, please disregard this email.
          </p>
        </div>
      `,
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Find subscriptions expiring within 3 days that haven't been notified
    const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    const { data: expiringSubs, ok } = await dbQuery(
      `subscriptions?status=eq.approved&expiry_notified=eq.false&expires_at=lte.${threeDaysFromNow}&expires_at=gte.${now}&select=id,user_id,plan,expires_at`
    );

    if (!ok || !expiringSubs || expiringSubs.length === 0) {
      return new Response(
        JSON.stringify({ message: "No expiring subscriptions to notify", count: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let notified = 0;

    for (const sub of expiringSubs) {
      try {
        // Get user profile
        const { data: profiles } = await dbQuery(
          `profiles?user_id=eq.${sub.user_id}&select=email,full_name&limit=1`
        );

        if (!profiles || profiles.length === 0) continue;

        const profile = profiles[0];
        const daysLeft = Math.ceil(
          (new Date(sub.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );

        await sendExpiryEmail(profile.email, profile.full_name, daysLeft, sub.plan);

        // Mark as notified
        await dbQuery(`subscriptions?id=eq.${sub.id}`, {
          method: "PATCH",
          body: JSON.stringify({ expiry_notified: true }),
        });

        notified++;
      } catch (e) {
        console.error(`Failed to notify sub ${sub.id}:`, e);
      }
    }

    return new Response(
      JSON.stringify({ message: `Notified ${notified} users`, count: notified }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Expiry check error:", error);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
