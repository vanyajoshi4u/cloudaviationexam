// Shared rate limiter for edge functions
// Uses the rate_limits table via service role key

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface RateLimitConfig {
  /** Unique key prefix, e.g. "login", "reset-pwd" */
  action: string;
  /** Identifier: IP address, user ID, or email */
  identifier: string;
  /** Max requests allowed in the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

export async function checkRateLimit(config: RateLimitConfig): Promise<RateLimitResult> {
  const key = `${config.action}:${config.identifier}`;

  try {
    // Try to get existing record
    const getRes = await fetch(
      `${supabaseUrl}/rest/v1/rate_limits?key=eq.${encodeURIComponent(key)}&select=id,request_count,window_start&limit=1`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      }
    );

    const records = await getRes.json();
    const now = new Date();

    if (records && records.length > 0) {
      const record = records[0];
      const windowStart = new Date(record.window_start);
      const windowEnd = new Date(windowStart.getTime() + config.windowSeconds * 1000);

      // Window expired — reset
      if (now >= windowEnd) {
        await fetch(
          `${supabaseUrl}/rest/v1/rate_limits?id=eq.${record.id}`,
          {
            method: "PATCH",
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              request_count: 1,
              window_start: now.toISOString(),
            }),
          }
        );
        return { allowed: true, remaining: config.maxRequests - 1 };
      }

      // Window still active
      if (record.request_count >= config.maxRequests) {
        const retryAfter = Math.ceil((windowEnd.getTime() - now.getTime()) / 1000);
        return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
      }

      // Increment
      await fetch(
        `${supabaseUrl}/rest/v1/rate_limits?id=eq.${record.id}`,
        {
          method: "PATCH",
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_count: record.request_count + 1,
          }),
        }
      );

      return { allowed: true, remaining: config.maxRequests - record.request_count - 1 };
    }

    // No record — create one
    await fetch(
      `${supabaseUrl}/rest/v1/rate_limits`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          key,
          request_count: 1,
          window_start: now.toISOString(),
        }),
      }
    );

    return { allowed: true, remaining: config.maxRequests - 1 };
  } catch (e) {
    console.error("Rate limit check error:", e);
    // Fail open — don't block users if rate limiter has issues
    return { allowed: true, remaining: config.maxRequests };
  }
}

export function rateLimitResponse(result: RateLimitResult, corsHeaders: Record<string, string>) {
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please try again later.",
      retryAfterSeconds: result.retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        ...(result.retryAfterSeconds ? { "Retry-After": String(result.retryAfterSeconds) } : {}),
      },
    }
  );
}

export function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
