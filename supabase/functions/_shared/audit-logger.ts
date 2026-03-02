// Shared audit logger for edge functions
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export type AuditAction =
  | "login_attempt"
  | "login_verified"
  | "login_blocked_session"
  | "login_blocked_device"
  | "logout"
  | "force_logout"
  | "password_reset"
  | "payment_submitted"
  | "payment_duplicate_blocked"
  | "subscription_created"
  | "admin_action"
  | "rate_limited";

interface AuditEntry {
  user_id?: string;
  action: AuditAction;
  details?: Record<string, unknown>;
  ip_address?: string;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    await fetch(`${supabaseUrl}/rest/v1/audit_logs`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        user_id: entry.user_id || null,
        action: entry.action,
        details: entry.details || {},
        ip_address: entry.ip_address || null,
      }),
    });
  } catch (e) {
    console.error("Audit log failed (non-critical):", e);
  }
}
