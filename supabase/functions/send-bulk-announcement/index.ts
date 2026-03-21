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

    const { mode, testEmail, subject: customSubject, htmlBody: customHtmlBody, excludeEmails, onlyNonSubscribers } = await req.json();

    const subject = customSubject || "New Features | Cloud Aviation Exams";
    const htmlBody = customHtmlBody || `<!DOCTYPE html><html><body><p>Default announcement</p></body></html>`;

    if (mode === "test") {
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
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
      const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      // Get all profile emails
      const profilesRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=email,user_id`, {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
      const profiles = await profilesRes.json();

      let targetEmails: string[] = [];

      if (onlyNonSubscribers) {
        // Get user_ids with active subscriptions
        const subsRes = await fetch(
          `${SUPABASE_URL}/rest/v1/subscriptions?select=user_id&status=eq.approved&expires_at=gt.${new Date().toISOString()}`,
          {
            headers: {
              apikey: SUPABASE_SERVICE_ROLE_KEY,
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            },
          }
        );
        const subs = await subsRes.json();
        const activeUserIds = new Set(subs.map((s: any) => s.user_id));

        targetEmails = profiles
          .filter((p: any) => p.email && !activeUserIds.has(p.user_id))
          .map((p: any) => p.email);
      } else {
        targetEmails = profiles.map((p: any) => p.email).filter(Boolean);
      }

      // Exclude specific emails
      const excludeSet = new Set((excludeEmails || []).map((e: string) => e.toLowerCase()));
      targetEmails = [...new Set(targetEmails)].filter(
        (e) => !excludeSet.has(e.toLowerCase()) && !e.includes("privaterelay.appleid.com")
      );

      console.log(`Sending to ${targetEmails.length} users`);

      let sent = 0, failed = 0;
      const errors: string[] = [];

      for (const email of targetEmails) {
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
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          failed++;
          errors.push(`${email}: ${e}`);
        }
      }

      return new Response(JSON.stringify({ success: true, total: targetEmails.length, sent, failed, errors: errors.slice(0, 10) }), {
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
