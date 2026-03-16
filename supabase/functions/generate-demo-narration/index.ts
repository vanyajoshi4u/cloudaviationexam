import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NARRATION_SCRIPT = `Welcome to Cloud Aviation Academy. Practice DGCA questions in Practice and Test modes, then train in the RTR Part 2 simulator with push to talk and QR answer flow.`;
const GEORGE_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

let cachedAudioBuffer: ArrayBuffer | null = null;
let cachedAt = 0;
let quotaCooldownUntil = 0;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const QUOTA_COOLDOWN_MS = 30 * 60 * 1000;

const jsonResponse = (payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const now = Date.now();

  if (cachedAudioBuffer && now - cachedAt < CACHE_TTL_MS) {
    return new Response(cachedAudioBuffer.slice(0), {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  if (quotaCooldownUntil > now) {
    return jsonResponse({
      fallback: "speech_synthesis",
      reason: "quota_exceeded",
      voice: "george",
    });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      console.error("TTS error: ELEVENLABS_API_KEY is not configured");
      return jsonResponse({
        fallback: "speech_synthesis",
        reason: "missing_api_key",
        voice: "george",
      });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${GEORGE_VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: NARRATION_SCRIPT,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.72,
            similarity_boost: 0.75,
            style: 0.18,
            use_speaker_boost: true,
            speed: 0.96,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs error:", response.status, errorText);

      const isQuotaExceeded =
        response.status === 429 ||
        errorText.includes("quota_exceeded") ||
        (response.status === 401 && errorText.toLowerCase().includes("quota"));

      if (isQuotaExceeded) {
        quotaCooldownUntil = now + QUOTA_COOLDOWN_MS;
        return jsonResponse({
          fallback: "speech_synthesis",
          reason: "quota_exceeded",
          voice: "george",
        });
      }

      return jsonResponse({
        fallback: "speech_synthesis",
        reason: `provider_error_${response.status}`,
        voice: "george",
      });
    }

    const audioBuffer = await response.arrayBuffer();
    cachedAudioBuffer = audioBuffer;
    cachedAt = now;

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return jsonResponse({
      fallback: "speech_synthesis",
      reason: "tts_unavailable",
      voice: "george",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
