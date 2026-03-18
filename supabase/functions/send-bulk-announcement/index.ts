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

    const { mode, testEmail, subject: customSubject, htmlBody: customHtmlBody } = await req.json();

    const subject = customSubject || "New Features: Bookmarks & Performance Analytics | Cloud Aviation Exams";
    const htmlBody = customHtmlBody || `<!DOCTYPE html><html><body><p>Default announcement</p></body></html>`;

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
