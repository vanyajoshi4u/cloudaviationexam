import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

    const { to } = await req.json();

    const subject = "🎁 Exclusive Discount – ₹250 OFF on Live ATC Add-on!";
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">☁️ Cloud Aviation Exams</h1>
    </div>
    <div style="padding:32px 24px;">
      <p style="color:#333;font-size:16px;line-height:1.6;margin-top:0;">Dear Yash,</p>
      <p style="color:#333;font-size:16px;line-height:1.6;">We have an <strong>exclusive offer</strong> just for you! 🎉</p>
      <p style="color:#333;font-size:16px;line-height:1.6;">Use the discount code below to get <strong>₹250 OFF</strong> on the <strong>Live ATC Simulator Add-on</strong> (₹499 → ₹249):</p>
      <div style="text-align:center;margin:24px 0;">
        <div style="display:inline-block;background:#f0f9ff;border:2px dashed #3b82f6;border-radius:12px;padding:16px 32px;">
          <span style="font-size:28px;font-weight:800;color:#1e40af;letter-spacing:4px;">YASH250</span>
        </div>
      </div>
      <p style="color:#333;font-size:16px;line-height:1.6;">This code is <strong>exclusive to you</strong> and can only be used once. Don't miss out!</p>
      <div style="text-align:center;margin:28px 0;">
        <a href="https://cloudaviationexams.com/auth?mode=login" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">Login &amp; Subscribe Now</a>
      </div>
      <p style="color:#333;font-size:16px;line-height:1.6;">If you have any questions, feel free to reach out to us.</p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:0;">Best regards,<br><strong>Team Cloud Aviation</strong><br>Cloud Aviation Exams</p>
    </div>
    <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Cloud Aviation Exams. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Cloud Aviation Exams <noreply@cloudaviationexams.com>",
        to: [to],
        subject,
        html: htmlBody,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));

    return new Response(JSON.stringify({ success: true, message: `Email sent to ${to}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
