import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Upload, CheckCircle, Loader2, Tag, ArrowLeft, Ticket, PartyPopper, Mail } from "lucide-react";
import UpiQrCode from "@/components/UpiQrCode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Plan = "3_months" | "6_months" | "12_months";

const plans = [
  { id: "3_months" as Plan, label: "3 Months", price: 999, badge: "RTR Part-2 Simulator", highlight: "Includes RTR Part-2 (DGCA) Practice Simulator access for 3 months" },
  { id: "6_months" as Plan, label: "6 Months", price: 299, badge: "", highlight: "" },
  { id: "12_months" as Plan, label: "12 Months", price: 499, badge: "Best Value", highlight: "" },
];

const Subscribe = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("6_months");
  const [referralCode, setReferralCode] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const checkExisting = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        if (data[0].status === "approved") {
          setAlreadySubscribed(true);
        } else if (data[0].status === "pending") {
          setSubmitted(true);
        }
      }
    };
    checkExisting();
  }, []);

  // Redirect already-subscribed users to homepage
  useEffect(() => {
    if (alreadySubscribed) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [alreadySubscribed]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setScreenshot(file);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }
    setApplyingDiscount(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.rpc("apply_discount_code", {
        _code: discountCode.trim().toUpperCase(),
        _user_id: user.id,
      });

      if (error) throw error;

      const result = data as unknown as { success: boolean; discount?: number; message: string };
      if (result.success) {
        setDiscountApplied(true);
        setDiscountAmount(result.discount || 69);
        setShowCelebration(true);
        toast.success(result.message);
        setTimeout(() => setShowCelebration(false), 3000);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to apply discount code");
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      toast.error("Please upload your payment screenshot");
      return;
    }
    if (!referralCode.trim()) {
      toast.error("Please enter your UTR code");
      return;
    }

    setLoading(true);
    let filePath = "";
    try {
      // Check network connectivity early
      if (!navigator.onLine) throw new Error("You appear to be offline. Please check your internet connection and try again.");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const plan = plans.find((p) => p.id === selectedPlan)!;
      const finalAmount = discountApplied ? plan.price - discountAmount : plan.price;

      // Step 1: Upload screenshot to storage FIRST (small reliable request)
      toast.info("Uploading payment screenshot...");
      const fileExt = screenshot.name.split(".").pop();
      filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, screenshot);
      if (uploadError) throw new Error("Failed to upload screenshot. Please check your internet connection and try again.");

      // Step 2: Verify using storage path (lightweight request — no base64 payload)
      toast.info("Verifying payment details...");

      const invokeWithRetry = async (attempts = 3): Promise<any> => {
        for (let i = 0; i < attempts; i++) {
          try {
            const { data, error } = await supabase.functions.invoke(
              "verify-referral-code",
              { body: { storagePath: filePath, referralCode: referralCode.trim(), expectedAmount: finalAmount } }
            );
            if (error) {
              if (i === attempts - 1) throw error;
              await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
              continue;
            }
            return data;
          } catch (err) {
            if (i === attempts - 1) throw err;
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
          }
        }
      };

      const verifyData = await invokeWithRetry();

      if (!verifyData || !verifyData.match) {
        // Clean up uploaded file on verification failure
        await supabase.storage.from("payment-screenshots").remove([filePath]).catch(() => null);
        toast.error(verifyData?.message || "Verification failed. Please check your details and try again.");
        setLoading(false);
        return;
      }

      const screenshotHash = verifyData.screenshotHash || null;
      toast.success("Payment verified!");

      // Step 3: Create subscription
      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        plan: selectedPlan,
        amount: finalAmount,
        referral_code: referralCode.trim(),
        payment_screenshot_url: filePath,
        screenshot_hash: screenshotHash,
        status: "pending",
      } as any);
      if (insertError) throw insertError;

      toast.success("Payment successful! Your subscription is now active.");

      // Send confirmation email (fire and forget)
      supabase.functions.invoke("send-payment-confirmation", {
        body: { plan: selectedPlan, amount: finalAmount },
      }).catch((err) => console.error("Email sending failed:", err));

      // Redirect to homepage after a short delay
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error: any) {
      // Clean up uploaded file on any error
      if (filePath) {
        await supabase.storage.from("payment-screenshots").remove([filePath]).catch(() => null);
      }
      const msg = error.message || "Something went wrong";
      if (msg.includes("Load failed") || msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        toast.error("Network error. Please check your internet connection and try again.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (alreadySubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Subscription Active!</h2>
          <p className="text-muted-foreground">Your subscription is active. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground text-sm">
            Your subscription has been activated. A confirmation email has been sent to your registered email. You can now access all quiz content.
          </p>
          <Button className="mt-4" onClick={() => navigate("/", { replace: true })}>
            Start Learning
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Plane className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-wider text-foreground">
              Cloud<span className="text-gradient-sky">Aviation</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase -mt-1">Exam's</span>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <div className="flex items-center mb-4">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">Choose Your Plan</h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">Select a plan and complete payment to access all questions</p>

          {/* Plan Selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-border"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-2 right-2 text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-semibold">
                    {plan.badge}
                  </span>
                )}
                <p className="font-display text-sm font-semibold text-foreground">{plan.label}</p>
                <p className="font-display text-2xl font-bold text-primary mt-1">₹{plan.price}</p>
                {plan.highlight && (
                  <p className="text-[10px] text-primary/80 mt-1 leading-tight">{plan.highlight}</p>
                )}
              </button>
            ))}
          </div>

          {/* Dynamic UPI QR Code */}
          <div className="mb-6">
            <UpiQrCode amount={discountApplied ? (plans.find((p) => p.id === selectedPlan)?.price || 0) - discountAmount : (plans.find((p) => p.id === selectedPlan)?.price || 0)} />
            {discountApplied && (
              <p className="text-center text-xs text-primary mt-2 font-semibold">
                ₹{discountAmount} discount applied! Pay ₹{(plans.find((p) => p.id === selectedPlan)?.price || 0) - discountAmount} instead of <span className="line-through text-muted-foreground">₹{plans.find((p) => p.id === selectedPlan)?.price}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Screenshot Upload */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Payment Screenshot *</Label>
              {screenshot ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground truncate flex-1">{screenshot.name}</span>
                  <label htmlFor="screenshot" className="text-xs text-primary cursor-pointer hover:underline flex-shrink-0">
                    Re-upload
                  </label>
                  <button
                    type="button"
                    onClick={() => setScreenshot(null)}
                    className="text-xs text-destructive hover:underline flex-shrink-0"
                  >
                    Remove
                  </button>
                  <input id="screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              ) : (
                <label
                  htmlFor="screenshot"
                  className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-border/50 hover:border-border cursor-pointer transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Upload payment screenshot</span>
                  <input id="screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <Label htmlFor="referral" className="text-sm text-foreground">UTR Code *</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter your UTR code"
                  className="pl-10"
                  required
                  maxLength={50}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Add transaction number / UTR number / Reference number for which payment has been done.
              </p>
            </div>

            {/* Discount Code */}
            <div className="space-y-2 relative">
              <Label htmlFor="discount" className="text-sm text-foreground">Discount Code <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <p className="text-xs text-muted-foreground -mt-1">Have a discount code? Apply it before payment. No code? Just scan the QR and pay directly.</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="discount"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    className="pl-10"
                    maxLength={20}
                    disabled={discountApplied}
                  />
                </div>
                <Button
                  type="button"
                  variant={discountApplied ? "secondary" : "outline"}
                  onClick={handleApplyDiscount}
                  disabled={applyingDiscount || discountApplied}
                  className="flex-shrink-0"
                >
                  {applyingDiscount ? <Loader2 className="w-4 h-4 animate-spin" /> : discountApplied ? "Applied ✓" : "Apply"}
                </Button>
              </div>
              {discountApplied && (
                <p className="text-xs text-primary font-medium">🎉 ₹{discountAmount} discount applied!</p>
              )}

              {/* Celebration overlay */}
              <AnimatePresence>
                {showCelebration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                  >
                    <div className="text-4xl flex gap-2">
                      <motion.span animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 0.6 }}>🎉</motion.span>
                      <motion.span animate={{ y: [0, -25, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 0.6, delay: 0.1 }}>🎊</motion.span>
                      <motion.span animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 0.6, delay: 0.2 }}>🥳</motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button type="submit" className="w-full glow-blue font-display text-sm tracking-wider py-5" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Submit Payment
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4">
            <span>For payment related issues, mail</span>
            <a href="mailto:cloudaviation4u@gmail.com" className="inline-flex items-center gap-1 text-primary hover:underline font-medium">
              <Mail className="w-3.5 h-3.5" />
              cloudaviation4u@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscribe;
