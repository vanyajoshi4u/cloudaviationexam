import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "PASSWORD_RECOVERY") {
          setIsRecovery(true);
        }
      }
    );

    // Also check URL hash for recovery token
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      // Clear active sessions so user isn't blocked
      try {
        await supabase.functions.invoke("send-login-verification", {
          body: { action: "logout" },
        });
      } catch (e) {
        console.error("Failed to clear sessions:", e);
      }

      await supabase.auth.signOut();
      setSuccess(true);
      toast.success("Password updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  if (!isRecovery && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <p className="text-muted-foreground mb-4">Invalid or expired reset link.</p>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="relative">
            <Plane className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 blur-lg bg-primary/30 rounded-full" />
          </div>
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
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-primary mx-auto" />
              <h2 className="font-display text-2xl font-bold text-foreground">Password Updated!</h2>
              <p className="text-sm text-muted-foreground">
                Your password has been changed and all sessions have been cleared. Please log in with your new password.
              </p>
              <p className="text-xs text-muted-foreground">
                You can now close this page and log in with your new password.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-center mb-2 text-foreground">
                Create New Password
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-foreground">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-foreground">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full glow-blue font-display text-sm tracking-wider py-5" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                  Update Password
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
