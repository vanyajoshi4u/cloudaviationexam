import { useEffect } from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EmailConfirmed = () => {
  // Sign out immediately to prevent any auth-based redirects
  useEffect(() => {
    supabase.auth.signOut({ scope: "local" }).catch(() => {});
    // Clear hash tokens from URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
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
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Email Verified!</h2>
          <p className="text-sm text-muted-foreground">
            Your email has been verified successfully. You can now close this tab and log in to your account.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmed;
