import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const KEEPALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useInactivityLogout = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepaliveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastKeepaliveRef = useRef<number>(0);

  useEffect(() => {
    // Periodically update last_active_at so the session isn't cleaned up
    const sendKeepalive = async () => {
      const now = Date.now();
      // Debounce: skip if last keepalive was less than 4 minutes ago
      if (now - lastKeepaliveRef.current < 4 * 60 * 1000) return;
      lastKeepaliveRef.current = now;

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase
            .from("active_sessions")
            .update({ last_active_at: new Date().toISOString() })
            .eq("user_id", session.user.id);
        }
      } catch (e) {
        console.error("Keepalive failed:", e);
      }
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.functions.invoke("send-login-verification", {
            body: { action: "logout" },
          });
          await supabase.auth.signOut();
          window.location.href = "/auth";
        }
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousedown", "keydown", "touchstart", "scroll", "mousemove"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    // Start keepalive interval
    sendKeepalive();
    keepaliveRef.current = setInterval(sendKeepalive, KEEPALIVE_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (keepaliveRef.current) clearInterval(keepaliveRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, []);
};
