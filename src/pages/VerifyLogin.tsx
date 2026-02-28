import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const VerifyLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      const uid = searchParams.get("uid");

      if (!token || !uid) {
        setStatus("error");
        setMessage("Invalid verification link. Please try logging in again.");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-login-token", {
          body: { token, uid },
        });

        if (error || !data?.valid) {
          setStatus("error");
          setMessage(data?.error || "Verification failed. The link may have expired.");
          return;
        }

        setStatus("success");
        setMessage("Login verified! Redirecting...");

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Something went wrong");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Plane className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              Cloud<span className="text-gradient-sky">Aviation</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase -mt-1">
              Exam's
            </span>
          </div>
        </div>

        <div className="glass-card p-8">
          {status === "verifying" && (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Verifying Login...</h2>
              <p className="text-sm text-muted-foreground">Please wait while we verify your login.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Login Verified!</h2>
              <p className="text-sm text-muted-foreground">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Verification Failed</h2>
              <p className="text-sm text-muted-foreground mb-4">{message}</p>
              <Button onClick={() => navigate("/auth", { replace: true })} className="glow-blue">
                Back to Login
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyLogin;
