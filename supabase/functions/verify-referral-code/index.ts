const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Compute SHA-256 hash of image data
async function hashImage(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Compute SHA-256 hash from base64 string (legacy support)
async function hashImageBase64(base64Data: string): Promise<string> {
  const binaryStr = atob(base64Data);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return hashImage(bytes);
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

// Download image from Supabase storage and return as base64
async function downloadFromStorage(storagePath: string): Promise<{ base64: string; bytes: Uint8Array }> {
  const url = `${supabaseUrl}/storage/v1/object/payment-screenshots/${storagePath}`;
  const res = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to download screenshot from storage: ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  // Convert to base64
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  const base64 = btoa(binary);
  return { base64, bytes };
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

    const body = await req.json();
    const { referralCode, expectedAmount } = body;

    if (!referralCode || !expectedAmount) {
      return new Response(JSON.stringify({ error: "Missing referralCode or expectedAmount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Support both: new storagePath approach and legacy imageBase64 approach
    let imageBase64: string;
    let imageBytes: Uint8Array;

    if (body.storagePath) {
      // New approach: download from storage (no large payload in request)
      console.log("Using storage-based verification for:", body.storagePath);
      const downloaded = await downloadFromStorage(body.storagePath);
      imageBase64 = downloaded.base64;
      imageBytes = downloaded.bytes;
    } else if (body.imageBase64) {
      // Legacy approach: base64 in request body
      console.log("Using legacy base64 verification");
      imageBase64 = body.imageBase64;
      const binaryStr = atob(imageBase64);
      imageBytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        imageBytes[i] = binaryStr.charCodeAt(i);
      }
    } else {
      return new Response(JSON.stringify({ error: "Missing storagePath or imageBase64" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check for duplicate screenshot
    const screenshotHash = await hashImage(imageBytes);
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
            content: `You are an OCR assistant analyzing payment screenshots. Extract FOUR things from the image:
1. The UTR number (a 12-digit numeric code, e.g. 532318140034)
2. The Transaction ID (usually starts with "T" followed by digits, e.g. T2603031617537445458455)
3. The payment amount (in ₹ or INR)
4. The recipient/payee name (the person or account the payment was sent TO)

Return your response in this exact JSON format:
{"utr": "THE_UTR_OR_NOT_FOUND", "transactionId": "THE_TRANSACTION_ID_OR_NOT_FOUND", "amount": THE_NUMBER_OR_0, "recipientName": "THE_NAME_OR_NOT_FOUND"}

If you cannot find a UTR number, use "NOT_FOUND" for utr.
If you cannot find a Transaction ID, use "NOT_FOUND" for transactionId.
If you cannot find an amount, use 0 for amount.
If you cannot find a recipient name, use "NOT_FOUND" for recipientName.
Return ONLY the JSON, nothing else.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the UTR number, Transaction ID, payment amount, and recipient name from this payment screenshot.",
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
    let extracted = { utr: "NOT_FOUND", transactionId: "NOT_FOUND", amount: 0, recipientName: "NOT_FOUND" };
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extracted = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("Failed to parse AI response as JSON:", rawContent);
    }

    // Validate recipient name - must be TANISHKA AGARWAL or RAHUL
    const validNames = ["tanishka agarwal", "rahul"];
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

    // Validate UTR or Transaction ID - user can enter either one
    const normalizedInput = referralCode.trim().toLowerCase().replace(/[\s-]/g, "");
    const extractedUtr = (extracted.utr || "NOT_FOUND").toLowerCase().replace(/[\s-]/g, "");
    const extractedTxnId = (extracted.transactionId || "NOT_FOUND").toLowerCase().replace(/[\s-]/g, "");

    const utrMatch = extractedUtr !== "not_found" && (extractedUtr.includes(normalizedInput) || normalizedInput.includes(extractedUtr));
    const txnMatch = extractedTxnId !== "not_found" && (extractedTxnId.includes(normalizedInput) || normalizedInput.includes(extractedTxnId));

    if (!utrMatch && !txnMatch) {
      // Check if neither was found at all
      if (extractedUtr === "not_found" && extractedTxnId === "not_found") {
        return new Response(
          JSON.stringify({
            match: false,
            message: "Could not find a UTR number or Transaction ID in the screenshot. Please ensure it is visible in your payment screenshot.",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const foundCode = extractedUtr !== "not_found" ? extracted.utr : extracted.transactionId;
      return new Response(
        JSON.stringify({
          match: false,
          message: `The code in your screenshot ("${foundCode}") does not match what you entered ("${referralCode}"). You can enter either the 12-digit UTR number or the Transaction ID starting with T.`,
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});