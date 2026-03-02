const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Compute SHA-256 hash of image data
async function hashImage(base64Data: string): Promise<string> {
  const binaryStr = atob(base64Data);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Check if screenshot hash already exists
async function isScreenshotDuplicate(hash: string): Promise<boolean> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/subscriptions?screenshot_hash=eq.${hash}&select=id&limit=1`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    }
  );
  if (!res.ok) return false;
  const data = await res.json();
  return data && data.length > 0;
}

import { checkRateLimit, rateLimitResponse, getClientIP } from "../_shared/rate-limiter.ts";
import { logAudit } from "../_shared/audit-logger.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limit: 5 payment verifications per 15 minutes per IP
    const ip = getClientIP(req);
    const rateCheck = await checkRateLimit({
      action: "verify-payment",
      identifier: ip,
      maxRequests: 5,
      windowSeconds: 900,
    });
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck, corsHeaders);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageBase64, referralCode, expectedAmount } = await req.json();
    if (!imageBase64 || !referralCode || !expectedAmount) {
      return new Response(JSON.stringify({ error: "Missing imageBase64, referralCode, or expectedAmount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check for duplicate screenshot
    const screenshotHash = await hashImage(imageBase64);
    const isDuplicate = await isScreenshotDuplicate(screenshotHash);
    if (isDuplicate) {
      logAudit({ action: "payment_duplicate_blocked", ip_address: ip, details: { screenshotHash } });
      return new Response(
        JSON.stringify({
          match: false,
          message: "This payment screenshot has already been used. Each payment screenshot can only be used once. Please make a new payment and upload a fresh screenshot.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use Gemini vision to extract referral code from screenshot
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an OCR assistant analyzing payment screenshots. Extract THREE things from the image:
1. The referral code, transaction ID, UTR number, or reference number
2. The payment amount (in ₹ or INR)
3. The recipient/payee name (the person or account the payment was sent TO)

Return your response in this exact JSON format:
{"referralCode": "THE_CODE_OR_NOT_FOUND", "amount": THE_NUMBER_OR_0, "recipientName": "THE_NAME_OR_NOT_FOUND"}

If you cannot find a referral code, use "NOT_FOUND" for referralCode.
If you cannot find an amount, use 0 for amount.
If you cannot find a recipient name, use "NOT_FOUND" for recipientName.
Return ONLY the JSON, nothing else.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the referral code, payment amount, and recipient name from this payment screenshot.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Service busy, please try again in a moment" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content?.trim() || "";

    console.log(`AI raw response: "${rawContent}", User referral: "${referralCode}", Expected amount: ${expectedAmount}`);

    // Parse AI response JSON
    let extracted = { referralCode: "NOT_FOUND", amount: 0, recipientName: "NOT_FOUND" };
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extracted = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("Failed to parse AI response as JSON:", rawContent);
    }

    // Validate recipient name - must be TANISHKA AGARWAL
    const validNames = ["tanishka agarwal"];
    const extractedName = (extracted.recipientName || "NOT_FOUND").toLowerCase().trim();
    const nameMatch = extractedName !== "not_found" && validNames.some(n => extractedName.includes(n) || n.includes(extractedName));

    if (!nameMatch) {
      return new Response(
        JSON.stringify({
          match: false,
          message: "The payment recipient name does not match. Payment must be made to TANISHKA AGARWAL. Please pay to the correct account and upload a new screenshot.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate referral code
    if (extracted.referralCode === "NOT_FOUND") {
      return new Response(
        JSON.stringify({
          match: false,
          message: "Could not find a referral code in the screenshot. Please ensure the referral code is visible in your payment screenshot.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedExtracted = extracted.referralCode.toLowerCase().replace(/[\s-]/g, "");
    const normalizedInput = referralCode.trim().toLowerCase().replace(/[\s-]/g, "");
    const codeMatch = normalizedExtracted.includes(normalizedInput) || normalizedInput.includes(normalizedExtracted);

    if (!codeMatch) {
      return new Response(
        JSON.stringify({
          match: false,
          message: `The referral code in your screenshot ("${extracted.referralCode}") does not match the code you entered ("${referralCode}"). Please check and try again.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate amount
    const extractedAmount = Number(extracted.amount);
    if (extractedAmount > 0 && extractedAmount !== Number(expectedAmount)) {
      return new Response(
        JSON.stringify({
          match: false,
          message: `The payment amount in your screenshot (₹${extractedAmount}) does not match the selected plan (₹${expectedAmount}). Please pay the correct amount and upload a new screenshot.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        match: true,
        message: "Payment screenshot verified successfully!",
        screenshotHash,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
