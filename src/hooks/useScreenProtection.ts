import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// TEMP: disabled exemption for testing — revert after test
const ADMIN_EMAIL = "nobody@test.com";

export const useScreenProtection = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        return;
      }
      // Also check admin role
      if (user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin");
        if (roles && roles.length > 0) {
          setIsAdmin(true);
          return;
        }
      }
      setIsAdmin(false);
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) return;

    // 1. Prevent screenshots via keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("").catch(() => {});
        showWarning();
      }
      // Cmd+Shift+3/4/5 (Mac screenshots)
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        showWarning();
      }
      // Ctrl+Shift+S (various screenshot tools)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        showWarning();
      }
      // Windows+Shift+S (Snipping Tool)
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        showWarning();
      }
    };

    // 2. Prevent right-click context menu (save image, etc.)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showWarning();
    };

    // 3. Detect visibility change (screen recording tools often trigger this)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page went to background — could be screen recording preview
      }
    };

    // 4. CSS-based protection
    document.body.style.setProperty("-webkit-user-select", "none");
    document.body.style.setProperty("user-select", "none");

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.body.style.removeProperty("-webkit-user-select");
      document.body.style.removeProperty("user-select");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAdmin]);

  return { isAdmin };
};

let warningTimeout: ReturnType<typeof setTimeout> | null = null;
let warningEl: HTMLDivElement | null = null;

function showWarning() {
  if (warningEl) {
    document.body.removeChild(warningEl);
    warningEl = null;
  }
  if (warningTimeout) clearTimeout(warningTimeout);

  const el = document.createElement("div");
  el.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95); z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 16px;
    color: #ef4444; font-family: Arial, sans-serif;
    animation: fadeIn 0.2s ease;
  `;
  el.innerHTML = `
    <div style="font-size: 48px;">🚫</div>
    <div style="font-size: 22px; font-weight: 700;">Screenshots & Recording Not Allowed</div>
    <div style="font-size: 14px; color: #94a3b8;">This content is protected. Violations may result in account suspension.</div>
  `;
  document.body.appendChild(el);
  warningEl = el;

  warningTimeout = setTimeout(() => {
    if (warningEl && document.body.contains(warningEl)) {
      document.body.removeChild(warningEl);
      warningEl = null;
    }
  }, 3000);
}
