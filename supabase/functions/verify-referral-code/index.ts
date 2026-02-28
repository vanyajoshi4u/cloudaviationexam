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

    const { imageBase64, referralCode } = await req.json();
    if (!imageBase64 || !referralCode) {
      return new Response(JSON.stringify({ error: "Missing imageBase64 or referralCode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
            content: `You are an OCR assistant. The user will send a payment screenshot image. Your job is to find any referral code, transaction ID, UTR number, or reference number visible in the image. Return ONLY the code/number you find, nothing else. If you find multiple codes, return them separated by commas. If you cannot find any code, return "NOT_FOUND".`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the referral code or transaction reference number from this payment screenshot.",
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
    const extractedText = aiData.choices?.[0]?.message?.content?.trim() || "NOT_FOUND";

    console.log(`Extracted text: "${extractedText}", User referral code: "${referralCode}"`);

    // Check if the user's referral code appears in the extracted text (case-insensitive)
    const normalizedExtracted = extractedText.toLowerCase().replace(/[\s-]/g, "");
    const normalizedInput = referralCode.trim().toLowerCase().replace(/[\s-]/g, "");

    const match = normalizedExtracted.includes(normalizedInput) || normalizedInput.includes(normalizedExtracted);

    // If extracted is NOT_FOUND, we can't verify - let it through with a warning
    if (extractedText === "NOT_FOUND") {
      return new Response(
        JSON.stringify({
          match: false,
          extracted: extractedText,
          message: "Could not find a referral code in the screenshot. Please ensure the referral code is visible in your payment screenshot.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        match,
        extracted: extractedText,
        message: match
          ? "Referral code verified successfully!"
          : `The referral code in your screenshot ("${extractedText}") does not match the code you entered ("${referralCode}"). Please check and try again.`,
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
