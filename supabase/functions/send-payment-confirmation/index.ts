import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email;

    const { plan, amount, discountCode } = await req.json();
    const planLabels: Record<string, string> = {
      "3_months": "3 Months (RTR Part-2)",
      "6_months": "6 Months",
      "12_months": "12 Months",
      "live_atc_3_months": "3 Months (Live ATC)",
    };
    const planLabel = planLabels[plan] || plan;

    // Get profile name
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: profile } = await adminClient
      .from("profiles")
      .select("full_name")
      .eq("user_id", userId)
      .single();

    const userName = profile?.full_name || "Student";

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Get phone from profile
    const { data: phoneProfile } = await adminClient
      .from("profiles")
      .select("phone")
      .eq("user_id", userId)
      .single();

    const userPhone = phoneProfile?.phone || "N/A";

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
        to: [userEmail],
        subject: "✈️ Payment Successful – Your Subscription is Active!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #0ea5e9; margin: 0;">Cloud<span style="color: #1e293b;">Aviation</span> Exams</h1>
              <p style="color: #94a3b8; font-size: 12px; letter-spacing: 2px; margin: 4px 0 0;">EXAM PREPARATION</p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
              <h2 style="color: #1e293b; margin: 0 0 8px;">Payment Successful! ✅</h2>
              <p style="color: #64748b; margin: 0 0 16px;">Hi ${userName},</p>
              <p style="color: #64748b; margin: 0 0 16px;">
                Your payment of <strong style="color: #0ea5e9;">₹${amount}</strong> for the 
                <strong>${planLabel}</strong> plan has been confirmed. Your subscription is now active!
              </p>
              
              <div style="background: white; border-radius: 8px; padding: 16px; margin: 16px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; padding: 4px 0; font-size: 14px;">Plan</td>
                    <td style="color: #1e293b; padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">${planLabel}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 4px 0; font-size: 14px;">Amount</td>
                    <td style="color: #1e293b; padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">₹${amount}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8; padding: 4px 0; font-size: 14px;">Status</td>
                    <td style="color: #22c55e; padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">Active</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #64748b; margin: 16px 0 0;">
                You now have full access to all quiz questions and study materials. Start preparing for your exams today!
              </p>
            </div>
            
            <div style="text-align: center;">
              <a href="https://cloudaviationexams.com/topics" 
                 style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Start Learning →
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
              If you have any questions, reply to this email. Happy studying! ✈️
            </p>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) {
      throw new Error(`Resend API failed [${emailRes.status}]: ${JSON.stringify(emailData)}`);
    }

    console.log(`Payment confirmation email sent to ${userEmail}:`, emailData);

    // Send admin notification email
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
        to: ["cloudaviation4u@gmail.com"],
        subject: `🛒 New Subscription – ${userName} bought ${planLabel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e293b;">New Subscription Purchase 🎉</h2>
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
                  <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Plan</td>
                  <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">${planLabel}</td>
                </tr>
                <tr>
                  <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Amount</td>
                  <td style="color: #1e293b; padding: 8px 0; font-size: 14px; text-align: right; font-weight: 600;">₹${amount}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    const adminEmailData = await adminEmailRes.json();
    if (!adminEmailRes.ok) {
      console.error("Admin notification email failed:", adminEmailData);
    } else {
      console.log("Admin notification email sent:", adminEmailData);
    }

    return new Response(
      JSON.stringify({ success: true, message: `Confirmation email sent to ${userEmail}` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
