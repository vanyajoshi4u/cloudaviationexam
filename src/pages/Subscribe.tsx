import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Upload, CheckCircle, Loader2, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
// QR code image - place your PhonePe QR at public/payment-qr.png
const paymentQR = "/payment-qr.png";

type Plan = "6_months" | "12_months";

const plans = [
  { id: "6_months" as Plan, label: "6 Months", price: 119, badge: "" },
  { id: "12_months" as Plan, label: "12 Months", price: 250, badge: "Best Value" },
];

const Subscribe = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("6_months");
  const [referralCode, setReferralCode] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

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
        window.location.href = "/";
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]); // Remove data:image/...;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      toast.error("Please upload your payment screenshot");
      return;
    }
    if (!referralCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Step 1: Verify referral code matches screenshot using AI
      toast.info("Verifying referral code from screenshot...");
      const imageBase64 = await fileToBase64(screenshot);

      const plan = plans.find((p) => p.id === selectedPlan)!;
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        "verify-referral-code",
        { body: { imageBase64, referralCode: referralCode.trim(), expectedAmount: plan.price } }
      );

      if (verifyError) throw new Error("Verification failed. Please try again.");

      if (!verifyData.match) {
        toast.error(verifyData.message || "Referral code does not match the screenshot.");
        setLoading(false);
        return;
      }

      toast.success("Referral code verified!");

      // Step 2: Upload screenshot
      const fileExt = screenshot.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, screenshot);
      if (uploadError) throw uploadError;

      // Step 3: Create subscription
      
      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        plan: selectedPlan,
        amount: plan.price,
        referral_code: referralCode.trim(),
        payment_screenshot_url: filePath,
        status: "pending",
      });
      if (insertError) throw insertError;

      toast.success("Payment successful! Your subscription is now active.");

      // Send confirmation email (fire and forget)
      supabase.functions.invoke("send-payment-confirmation", {
        body: { plan: selectedPlan, amount: plan.price },
      }).catch((err) => console.error("Email sending failed:", err));

      // Redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
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
          <Button className="mt-4" onClick={() => window.location.href = "/topics"}>
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
          <div className="grid grid-cols-2 gap-3 mb-6">
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
              </button>
            ))}
          </div>

          {/* QR Code */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Scan QR Code to Pay</p>
            <div className="inline-block bg-white p-3 rounded-xl">
              <img src={paymentQR} alt="PhonePe Payment QR Code" className="w-48 h-48 object-contain" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Pay <span className="text-primary font-semibold">₹{plans.find((p) => p.id === selectedPlan)?.price}</span> via PhonePe / UPI
            </p>
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
              <Label htmlFor="referral" className="text-sm text-foreground">Referral Code *</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter your referral code"
                  className="pl-10"
                  required
                  maxLength={50}
                />
              </div>
            </div>

            <Button type="submit" className="w-full glow-blue font-display text-sm tracking-wider py-5" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Submit Payment
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscribe;
