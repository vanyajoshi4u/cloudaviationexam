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

    const { mode, testEmail } = await req.json();

    const subject = "New Features: Bookmarks & Performance Analytics | Cloud Aviation Exams";
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">☁️ Cloud Aviation Exams</h1>
      <p style="color:#93c5fd;margin:8px 0 0;font-size:14px;">New Feature Announcement</p>
    </div>
    <div style="padding:32px 24px;">
      <p style="color:#333;font-size:16px;line-height:1.6;margin-top:0;">Dear Aviator,</p>
      <p style="color:#333;font-size:16px;line-height:1.6;">We're excited to announce <strong>two new features</strong> to help you prepare smarter for your DGCA exams!</p>

      <div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
        <h3 style="color:#1e40af;margin:0 0 8px;font-size:16px;">🔖 Bookmark & Notes</h3>
        <p style="color:#333;font-size:14px;line-height:1.5;margin:0;">Now you can <strong>bookmark any question</strong> during a quiz and add personal notes for revision. All your bookmarked questions are saved and accessible from the <strong>Bookmarks</strong> section on your dashboard — perfect for focused revision sessions.</p>
      </div>

      <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;">
        <h3 style="color:#166534;margin:0 0 8px;font-size:16px;">📊 Performance Analytics</h3>
        <p style="color:#333;font-size:14px;line-height:1.5;margin:0;">Track your <strong>subject-wise accuracy</strong> across all quizzes. See your strengths, identify weak areas, and monitor your progress — all from the new <strong>Analytics</strong> section on your dashboard.</p>
      </div>

      <div style="text-align:center;margin:28px 0;">
        <a href="https://cloudaviationexams.com" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;">Try It Now →</a>
      </div>
      <p style="color:#333;font-size:16px;line-height:1.6;">These features are available right now — just log in and start using them!</p>
      <p style="color:#333;font-size:16px;line-height:1.6;margin-bottom:0;">Blue skies,<br><strong>Team Cloud Aviation</strong></p>
    </div>
    <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Cloud Aviation Exams. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

    if (mode === "test") {
      // Send to single test email
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "Cloud Aviation Exams <noreply@cloudaviationexams.com>",
          to: [testEmail],
          subject,
          html: htmlBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      return new Response(JSON.stringify({ success: true, message: `Test email sent to ${testEmail}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (mode === "bulk") {
      // Get all user emails from profiles
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      const profilesRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=email,full_name`, {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
      const profiles = await profilesRes.json();

      const uniqueEmails = [...new Set(profiles.map((p: any) => p.email).filter(Boolean))] as string[];
      console.log(`Sending to ${uniqueEmails.length} users`);

      let sent = 0, failed = 0;
      const errors: string[] = [];

      for (const email of uniqueEmails) {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
            body: JSON.stringify({
              from: "Cloud Aviation Exams <noreply@cloudaviationexams.com>",
              to: [email],
              subject,
              html: htmlBody,
            }),
          });
          if (res.ok) {
            sent++;
          } else {
            const err = await res.text();
            failed++;
            errors.push(`${email}: ${err}`);
          }
          // Small delay to avoid rate limits
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          failed++;
          errors.push(`${email}: ${e}`);
        }
      }

      return new Response(JSON.stringify({ success: true, total: uniqueEmails.length, sent, failed, errors: errors.slice(0, 10) }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid mode. Use 'test' or 'bulk'.");
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
