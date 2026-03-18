import { useState, useEffect, useRef, useCallback } from "react";
import DemoVideoSection from "@/components/DemoVideoSection";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Mail, Phone, User, Lock, ArrowRight, Loader2, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import rtrSimPreview from "@/assets/rtr-part2-sim-preview.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { getFingerprint, getDeviceLabel } from "@/lib/fingerprint";

type AuthMode = "signup" | "login" | "forgot" | "awaiting-verification";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("mode") === "login" ? "login" : "signup";
  });
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingUid, setPendingUid] = useState<string | null>(null);
  const [pendingCredentials, setPendingCredentials] = useState<{ email: string; password: string } | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const oauthProcessingRef = useRef(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referralRef, setReferralRef] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Capture referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralRef(ref);
  }, []);

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

  // Handle OAuth callback and redirect if already logged in
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      if (oauthProcessingRef.current) return;

      // Check if current session was created via OAuth (check amr method, not primary provider)
      const amr = (session as any).amr || [];
      const isOAuthSession = amr.some((a: any) => a.method === "oauth");
      // Also check providers array for Google/Apple
      const providers = session.user.app_metadata?.providers || [];
      const hasOAuthProvider = providers.includes("google") || providers.includes("apple");
      const isOAuth = isOAuthSession || (hasOAuthProvider && session.user.app_metadata?.provider !== "email");

      if (isOAuth) {
        oauthProcessingRef.current = true;
        // OAuth users bypass email verification - create profile & session directly
        try {
          // Ensure profile exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", session.user.id)
            .limit(1);

          if (!existingProfile || existingProfile.length === 0) {
            await supabase.from("profiles").insert({
              user_id: session.user.id,
              full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
              phone: session.user.user_metadata?.phone || "",
              email: session.user.email || "",
            });
          }

          // Create active session (clear old ones first)
          await supabase.functions.invoke("send-login-verification", {
            body: { action: "logout" },
          });
          await supabase.functions.invoke("send-login-verification", {
            body: { action: "create-session" },
          });

          // Register device fingerprint
          try {
            const fp = await getFingerprint();
            const label = getDeviceLabel();
            if (fp) {
              const { data: existingDevice } = await supabase
                .from("device_fingerprints")
                .select("id")
                .eq("user_id", session.user.id)
                .eq("fingerprint", fp)
                .limit(1);

              if (!existingDevice || existingDevice.length === 0) {
                await supabase.from("device_fingerprints").insert({
                  user_id: session.user.id,
                  fingerprint: fp,
                  device_label: label || null,
                });
              } else {
                await supabase
                  .from("device_fingerprints")
                  .update({ last_seen_at: new Date().toISOString(), device_label: label || null })
                  .eq("user_id", session.user.id)
                  .eq("fingerprint", fp);
              }
            }
          } catch (fpErr) {
            console.error("Fingerprint registration failed for OAuth user:", fpErr);
          }

          toast.success("Signed in successfully!");
          navigate("/subscribe", { replace: true });
        } catch (err: any) {
          console.error("OAuth session setup error:", err);
          toast.error("Sign in failed. Please try again.");
        }
        return;
      }

      // Regular email user - check for active session
      const { data } = await supabase
        .from("active_sessions")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

      if (data && data.length > 0) {
        navigate("/subscribe", { replace: true });
      }
    };
    handleOAuthCallback();
  }, [navigate]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Start polling when in awaiting-verification mode
  const startPolling = useCallback((uid: string, credentials: { email: string; password: string }) => {
    setPendingUid(uid);
    setPendingCredentials(credentials);
    setMode("awaiting-verification");

    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const { data } = await supabase.functions.invoke("verify-login-token", {
          body: { action: "check-status", uid },
        });

        if (data?.verified) {
          if (pollingRef.current) clearInterval(pollingRef.current);
          pollingRef.current = null;

          // Auto sign-in with stored credentials
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (loginError || !loginData.session) {
            toast.error("Verification confirmed but auto sign-in failed. Please sign in manually.");
            setMode("login");
            return;
          }

          // Device fingerprint is now enforced server-side in verify-login-token
          // No need for client-side check here

          // Increment login count for review popup tracking
          try {
            await supabase.rpc('increment_login_count' as any, { _user_id: loginData.session.user.id });
          } catch (e) {
            console.error("Failed to increment login count:", e);
          }

          toast.success("Login verified! Signing you in...");
          navigate("/subscribe", { replace: true });
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 3000);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("reset-password-direct", {
        body: { email: formData.email.trim(), password: formData.newPassword },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResetSuccess(true);
      toast.success("Password updated! You can now sign in.");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password.");
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

        const accessToken = loginData.session?.access_token;
        if (!accessToken) throw new Error("Login failed - no session");

        // Get device fingerprint before server call (required)
        let fp = "";
        let label = "";
        try {
          fp = await getFingerprint();
          label = getDeviceLabel();
        } catch (fpErr) {
          await supabase.auth.signOut({ scope: "local" });
          throw new Error("Device verification failed. Please disable private mode/content blockers and try again.");
        }

        if (!fp) {
          await supabase.auth.signOut({ scope: "local" });
          throw new Error("Device verification failed. Please try again from your trusted browser.");
        }

        // Check session and send verification in one call (with fingerprint)
        const { data: verifyResult, error: verifyError } = await supabase.functions.invoke(
          "send-login-verification",
          {
            body: { action: "check-and-verify", origin: window.location.origin, fingerprint: fp, device_label: label },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        // Handle device-limit and other server errors, including non-2xx function responses
        if (verifyResult?.deviceBlocked || verifyResult?.error?.toLowerCase?.().includes?.("device limit")) {
          await supabase.auth.signOut({ scope: "local" });
          toast.error("You are up to the device limit. You have already set up 2 devices. For more info contact cloudaviation4u@gmail.com");
          setLoading(false);
          return;
        }

        if (verifyError) {
          let serverErrorMessage = verifyResult?.error as string | undefined;
          let serverDeviceBlocked = Boolean(verifyResult?.deviceBlocked);

          const errorContext = (verifyError as any)?.context;
          if (errorContext) {
            try {
              const parsed = await errorContext.json();
              if (!serverErrorMessage && typeof parsed?.error === "string") serverErrorMessage = parsed.error;
              if (parsed?.deviceBlocked === true) serverDeviceBlocked = true;
            } catch {
              // ignore parse failures and fall back to other sources
            }
          }

          if (!serverErrorMessage && typeof (verifyError as any)?.message === "string") {
            const rawMessage = (verifyError as any).message as string;
            const jsonMatch = rawMessage.match(/\{.*\}$/);
            if (jsonMatch) {
              try {
                const parsed = JSON.parse(jsonMatch[0]);
                if (typeof parsed?.error === "string") serverErrorMessage = parsed.error;
                if (parsed?.deviceBlocked === true) serverDeviceBlocked = true;
                if (parsed?.retryAfterSeconds && typeof parsed.retryAfterSeconds === "number") {
                  const mins = Math.floor(parsed.retryAfterSeconds / 60);
                  const secs = parsed.retryAfterSeconds % 60;
                  serverErrorMessage = `${parsed.error} Retry in ${mins}m ${secs}s.`;
                }
              } catch {
                // ignore JSON parse errors
              }
            }
          }

          if (serverDeviceBlocked || serverErrorMessage?.toLowerCase?.().includes?.("device limit")) {
            await supabase.auth.signOut({ scope: "local" });
            toast.error("You are up to the device limit. You have already set up 2 devices. For more info contact cloudaviation4u@gmail.com");
            setLoading(false);
            return;
          }

          throw new Error(serverErrorMessage || "Verification failed");
        }

        if (verifyResult?.hasActiveSession) {
          // Keep the session temporarily for force-logout capability
          setPendingCredentials({ email: formData.email.trim(), password: formData.password });
          setShowSessionWarning(true);
          toast.error("You are already logged in on another device.");
          setLoading(false);
          return;
        }

        // Sign out locally and start polling for verification
        const userId = loginData.user?.id;
        await supabase.auth.signOut({ scope: "local" });
        if (userId) {
          startPolling(userId, { email: formData.email.trim(), password: formData.password });
        }
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

        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            emailRedirectTo: `https://cloudaviationexams.com/email-confirmed`,
            data: {
              full_name: formData.fullName.trim(),
              phone: formData.phone.trim(),
              referral_code: referralRef || undefined,
            },
          },
        });

        if (error) throw error;

        // Detect repeated signup (user already exists)
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          toast.error("An account with this email already exists. Please sign in instead.");
          setMode("login");
          return;
        }

        // Track referral if referral code exists and signup succeeded
        if (referralRef && data.user?.id) {
          // Look up referrer by code
          const { data: referrerData } = await (supabase
            .from("referral_codes" as any)
            .select("user_id")
            .eq("code", referralRef)
            .maybeSingle() as any);

          if (referrerData) {
            await (supabase.from("referral_tracking" as any).insert({
              referrer_user_id: referrerData.user_id,
              referred_user_id: data.user.id,
              referral_code: referralRef,
            }) as any); // Ignore if already tracked
          }
        }

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
    forgot: { title: "Reset Password", subtitle: "Enter your email and create a new password" },
    "awaiting-verification": { title: "Check Your Email", subtitle: "We sent a verification link to your inbox" },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
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

          {mode === "awaiting-verification" ? (
            <div className="text-center space-y-5 py-4">
              <div className="relative mx-auto w-fit">
                <Mail className="w-14 h-14 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Verification Email Sent!</h3>
              <p className="text-sm text-muted-foreground">
                We sent a verification link to <span className="text-foreground font-medium">{pendingCredentials?.email}</span>. Click the link in your email to complete login.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Waiting for verification...</span>
              </div>
              <p className="text-xs text-muted-foreground">
                You'll be signed in automatically once verified.
              </p>
              <div className="bg-amber-500/15 border-2 border-amber-500/50 rounded-lg p-3 text-left">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">⏳ Important: A separate verification email will be sent to you. Please wait 100–120 seconds to receive it, then click the link to verify.</p>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-3 text-left space-y-2">
                <p className="text-xs font-medium text-foreground">⚠️ Can't find the verify link?</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li><span className="font-medium text-foreground">Mobile:</span> In your mailbox, the email may appear as plain text. Tap <span className="font-medium text-foreground">"Show quoted text"</span> to reveal the verify link.</li>
                  <li><span className="font-medium text-foreground">PC/Mac:</span> The email may show a <span className="font-medium text-foreground">three dots (⋯)</span> link — click on it to reveal the verify link.</li>
                </ul>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={resending || resendCooldown > 0}
                onClick={async () => {
                  if (!pendingCredentials || !pendingUid) return;
                  setResending(true);
                  try {
                    const { data: loginData, error } = await supabase.auth.signInWithPassword({
                      email: pendingCredentials.email,
                      password: pendingCredentials.password,
                    });
                    if (error) throw error;
                    const accessToken = loginData.session?.access_token;
                    if (!accessToken) throw new Error("No session");

                    let resendFingerprint = "";
                    let resendDeviceLabel = "";
                    try {
                      resendFingerprint = await getFingerprint();
                      resendDeviceLabel = getDeviceLabel();
                    } catch {
                      await supabase.auth.signOut({ scope: "local" });
                      throw new Error("Device verification failed while resending. Please try again.");
                    }

                    await supabase.functions.invoke("send-login-verification", {
                      body: {
                        action: "send-verification",
                        origin: window.location.origin,
                        fingerprint: resendFingerprint,
                        device_label: resendDeviceLabel,
                      },
                      headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    await supabase.auth.signOut({ scope: "local" });
                    toast.success("New verification email sent!");
                    setResendCooldown(30);
                    const timer = setInterval(() => {
                      setResendCooldown((prev) => {
                        if (prev <= 1) { clearInterval(timer); return 0; }
                        return prev - 1;
                      });
                    }, 1000);
                  } catch (e: any) {
                    toast.error(e.message || "Failed to resend");
                  } finally {
                    setResending(false);
                  }
                }}
                className="w-full font-display text-sm tracking-wider py-5"
              >
                {resending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Verification Email"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  if (pollingRef.current) clearInterval(pollingRef.current);
                  setMode("login");
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </button>
            </div>
          ) : mode === "forgot" && resetSuccess ? (
            <div className="text-center space-y-5 py-4">
              <div className="relative mx-auto w-fit">
                <CheckCircle className="w-14 h-14 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Password Updated!</h3>
              <p className="text-sm text-muted-foreground">
                Your password has been changed. You can now sign in with your new password.
              </p>
              <Button
                onClick={() => { setMode("login"); setResetSuccess(false); }}
                className="w-full glow-blue font-display text-sm tracking-wider py-5"
              >
                <ArrowRight className="w-4 h-4 mr-2" /> Sign In Now
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

            {mode === "forgot" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-foreground">New Password</Label>
                   <div className="relative">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input id="newPassword" name="newPassword" type={showNewPassword ? "text" : "password"} placeholder="Min. 6 characters" value={formData.newPassword} onChange={handleChange} className="pl-10 pr-10" required minLength={6} />
                     <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                       {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword" className="text-sm text-foreground">Confirm New Password</Label>
                  <div className="relative">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input id="confirmNewPassword" name="confirmNewPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter password" value={formData.confirmNewPassword} onChange={handleChange} className="pl-10 pr-10" required minLength={6} />
                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                   </div>
                </div>
              </>
            )}

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} className="pl-10 pr-10" required minLength={6} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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

            <Button type="submit" className="w-full glow-blue font-display text-sm tracking-wider py-5" disabled={loading || oauthLoading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              {mode === "signup" ? "Create Account" : mode === "login" ? "Sign In" : "Update Password"}
            </Button>
          </form>

          {mode !== "forgot" && (
            <>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">or continue with</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-5"
                  disabled={loading || oauthLoading}
                  onClick={async () => {
                    setOauthLoading(true);
                    try {
                      const { error } = await lovable.auth.signInWithOAuth("google", {
                        redirect_uri: window.location.origin + "/auth",
                      });
                      if (error) throw error;
                    } catch (err: any) {
                      toast.error(err.message || "Google sign-in failed");
                      setOauthLoading(false);
                    }
                  }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-5"
                  disabled={loading || oauthLoading}
                  onClick={async () => {
                    setOauthLoading(true);
                    try {
                      const { error } = await lovable.auth.signInWithOAuth("apple", {
                        redirect_uri: window.location.origin + "/auth",
                      });
                      if (error) throw error;
                    } catch (err: any) {
                      toast.error(err.message || "Apple sign-in failed");
                      setOauthLoading(false);
                    }
                  }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 text-center space-y-2">
            {mode === "login" && showSessionWarning && (
              <div className="bg-muted/50 rounded-md p-3 space-y-2">
                <p className="text-xs text-muted-foreground">
                  ⚠️ You are already logged in on another device.
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="w-full text-xs"
                  disabled={loading}
                  onClick={async () => {
                    if (!pendingCredentials) {
                      toast.error("Please enter your credentials and try signing in first.");
                      return;
                    }
                    setLoading(true);
                    try {
                      // Sign in to get a token
                      const { data: loginData, error } = await supabase.auth.signInWithPassword({
                        email: pendingCredentials.email,
                        password: pendingCredentials.password,
                      });
                      if (error) throw error;
                      const accessToken = loginData.session?.access_token;
                      if (!accessToken) throw new Error("No session");

                      // Get fingerprint for server-side device verification (required)
                      let fp = "";
                      let label = "";
                      try {
                        fp = await getFingerprint();
                        label = getDeviceLabel();
                      } catch {
                        await supabase.auth.signOut({ scope: "local" });
                        throw new Error("Device verification failed. Force logout is allowed only from your trusted device.");
                      }

                      // Force logout all other sessions (server validates trusted device)
                      const { data: flResult, error: fnError } = await supabase.functions.invoke("send-login-verification", {
                        body: { action: "force-logout", fingerprint: fp, device_label: label },
                        headers: { Authorization: `Bearer ${accessToken}` },
                      });
                      if (fnError) throw fnError;
                      if (flResult?.blocked) {
                        await supabase.auth.signOut({ scope: "local" });
                        toast.error(flResult.error || "Force logout blocked. Contact support.");
                        setLoading(false);
                        return;
                      }

                      await supabase.auth.signOut({ scope: "local" });
                      setShowSessionWarning(false);
                      toast.success("All other sessions cleared! Please sign in again.");
                    } catch (e: any) {
                      toast.error(e.message || "Failed to force logout");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                  Force Logout All Other Devices
                </Button>
              </div>
            )}
            {mode === "forgot" ? (
              <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </button>
            ) : (
              <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            )}
            <p className="text-xs text-muted-foreground text-center mt-3">
              If you face any problem signing in, contact{" "}
              <a href="mailto:cloudaviation4u@gmail.com" className="text-primary hover:underline">
                cloudaviation4u@gmail.com
              </a>
            </p>
          </div>
          </>
          )}
        </div>
      </motion.div>

      <DemoVideoSection />

      {/* RTR Part 2 Simulator Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto px-4 pb-10"
      >
        <h3 className="font-display text-lg font-bold text-center mb-3 text-foreground">
          RTR Part 2 Simulator
        </h3>
        <div className="rounded-xl overflow-hidden border border-border shadow-lg">
          <img
            src={rtrSimPreview}
            alt="RTR Part 2 Simulator - Radio Telephony Practice Interface"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
