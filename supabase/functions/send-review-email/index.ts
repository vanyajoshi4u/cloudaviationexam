import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, review, userEmail } = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0ea5e9; margin: 0;">Cloud<span style="color: #1e293b;">Aviation</span> Exams</h1>
          <p style="color: #94a3b8; font-size: 12px; letter-spacing: 2px; margin: 4px 0 0;">USER REVIEW</p>
        </div>
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin: 0 0 16px;">New Review Received 📝</h2>
          <p style="color: #64748b;"><strong>User:</strong> ${userEmail}</p>
          <p style="color: #64748b;"><strong>Rating:</strong> ${stars} (${rating}/5)</p>
          <p style="color: #64748b;"><strong>Review:</strong></p>
          <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
            ${review ? review.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<em>No written review provided</em>"}
          </div>
        </div>
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">Sent from CloudAviation Exams Review System</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CloudAviation Exam's <noreply@cloudaviationexams.com>",
        to: ["cloudaviation4u@gmail.com"],
        subject: `New Review: ${rating}/5 Stars from ${userEmail}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
