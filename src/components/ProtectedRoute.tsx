import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireSubscription?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAuth, requireSubscription, requireAdmin }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessResult, setAccessResult] = useState<{
    checked: boolean;
    valid: boolean;
    reason?: string;
    role?: string;
  }>({ checked: false, valid: false });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Track whether we've already validated successfully to avoid re-validating on token refresh
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    const validateAccess = async () => {
      if (!session?.access_token) {
        setAccessResult({ checked: true, valid: false, reason: "no_auth" });
        setHasValidated(false);
        return;
      }

      // If already validated successfully, skip re-validation on token refresh
      if (hasValidated && accessResult.valid) {
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("validate-subscription", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (error) {
          console.error("Server validation error:", error);
          // Fallback to client-side check on edge function failure
          await fallbackClientCheck(session);
          return;
        }

        setAccessResult({
          checked: true,
          valid: data?.valid ?? false,
          reason: data?.reason,
          role: data?.role,
        });
        if (data?.valid) setHasValidated(true);
      } catch (e) {
        console.error("Validation fetch error:", e);
        await fallbackClientCheck(session);
      }
    };

    const fallbackClientCheck = async (session: Session) => {
      // Check active session
      const { data: sessions } = await supabase
        .from("active_sessions")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

      if (!sessions || sessions.length === 0) {
        setAccessResult({ checked: true, valid: false, reason: "no_session" });
        return;
      }

      // Check admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (roles && roles.length > 0) {
        setAccessResult({ checked: true, valid: true, role: "admin" });
        setHasValidated(true);
        return;
      }

      // Check subscription
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (subs && subs.length > 0 && subs[0].status === "approved") {
        setAccessResult({ checked: true, valid: true });
        setHasValidated(true);
      } else {
        setAccessResult({ checked: true, valid: false, reason: subs?.[0]?.status || "no_subscription" });
      }
    };

    if (!loading && session) {
      validateAccess();
    } else if (!loading && !session) {
      setAccessResult({ checked: true, valid: false, reason: "no_auth" });
      setHasValidated(false);
    }
  }, [session, loading]);

  if (loading || !accessResult.checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (requireAuth && !session) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAuth && session && accessResult.reason === "no_session") {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && accessResult.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (requireSubscription && session && accessResult.role !== "admin") {
    if (!accessResult.valid) {
      return <Navigate to="/subscribe" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
