import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, review, userEmail } = await req.json();

    const stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e3a5f;">New Review from CloudAviation Exams</h2>
        <p><strong>User:</strong> ${userEmail}</p>
        <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
        <p><strong>Review:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 8px;">
          ${review ? review.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<em>No written review provided</em>"}
        </div>
        <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #888;">Sent from CloudAviation Exams Review System</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CloudAviation Reviews <onboarding@resend.dev>",
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
