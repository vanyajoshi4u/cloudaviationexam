import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Mail, Phone, User, Lock, ArrowRight, Loader2, ArrowLeft, CheckCircle, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthMode = "signup" | "login" | "forgot" | "forgot-sent";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signup");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  // Listen for auth events (password recovery clears active sessions)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY" && session) {
          // Clear all active sessions so user isn't blocked by "already logged in"
          try {
            await supabase.functions.invoke("send-login-verification", {
              body: { action: "logout" },
            });
          } catch (e) {
            console.error("Failed to clear sessions on password recovery:", e);
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("active_sessions")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);
        
        if (data && data.length > 0) {
          navigate("/subscribe", { replace: true });
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email.trim(),
        { redirectTo: `${window.location.origin}/reset-password` }
      );
      if (error) throw error;
      setMode("forgot-sent");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") return handleForgotPassword(e);
    setLoading(true);

    try {
      if (mode === "login") {
        const { data: loginData, error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });
        if (error) throw error;

        // Check if user already has an active session on another device
        const { data: sessionCheck, error: sessionError } = await supabase.functions.invoke(
          "send-login-verification",
          { body: { action: "check-session" } }
        );

        if (sessionError) throw new Error("Session check failed");

        if (sessionCheck?.hasActiveSession) {
          await supabase.auth.signOut();
          toast.error("You are already logged in on another device. Please log out from the other device first.");
          setLoading(false);
          return;
        }

        // Create active session directly (email verification temporarily disabled)
        await supabase.functions.invoke("send-login-verification", {
          body: { action: "create-session" },
        });

        toast.success("Login successful!");
        navigate("/subscribe", { replace: true });
      } else {
        if (!formData.fullName.trim() || !formData.phone.trim()) {
          toast.error("Please fill in all fields.");
          setLoading(false);
          return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
          toast.error("Please enter a valid 10-digit mobile number.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/email-confirmed`,
            data: {
              full_name: formData.fullName.trim(),
              phone: formData.phone.trim(),
            },
          },
        });

        if (error) throw error;

        // Profile will be created after email verification on first login
        // User metadata (full_name, phone) is stored in auth.users metadata

        toast.success("Check your email for a verification link!");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const headings: Record<AuthMode, { title: string; subtitle: string }> = {
    signup: { title: "Create Account", subtitle: "Join India's #1 DGCA Question Bank" },
    login: { title: "Welcome Back", subtitle: "Sign in to continue your preparation" },
    forgot: { title: "Reset Password", subtitle: "Enter your email to receive a reset link" },
    "forgot-sent": { title: "Check Your Email", subtitle: "We've sent you a password reset link" },
  };

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

        {/* Form Card */}
        <div className="glass-card p-8">
          <h2 className="font-display text-2xl font-bold text-center mb-2 text-foreground">
            {headings[mode].title}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {headings[mode].subtitle}
          </p>

          {mode === "forgot-sent" ? (
            <div className="text-center space-y-5 py-4">
              <div className="relative mx-auto w-fit">
                <MailCheck className="w-14 h-14 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  A password reset link has been sent to
                </p>
                <p className="text-sm text-primary font-semibold break-all">
                  {formData.email}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <p className="text-xs text-muted-foreground">
                  • Open your email and click on <span className="text-foreground font-medium">"Reset Password"</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  • You'll be redirected to create a new password
                </p>
                <p className="text-xs text-muted-foreground">
                  • Didn't receive it? Check your spam folder
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setMode("login")}
                className="w-full font-display text-sm tracking-wider py-5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
              </Button>
            </div>
          ) : (
          <>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="fullName" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="pl-10" required maxLength={100} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-foreground">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="phone" name="phone" type="tel" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} className="pl-10" required maxLength={10} />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="pl-10" required maxLength={255} />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} className="pl-10" required minLength={6} />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <button type="button" onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full glow-blue font-display text-sm tracking-wider py-5" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              {mode === "signup" ? "Create Account" : mode === "login" ? "Sign In" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === "forgot" ? (
              <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </button>
            ) : (
              <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            )}
          </div>
          </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
