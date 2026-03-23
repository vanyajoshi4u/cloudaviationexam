import { useState, useEffect } from "react";
import { Copy, Check, Share2, Users, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ReferralPanel = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      // TODO: Re-enable subscription check after preview
      // const { data: hasSub } = await supabase.rpc("has_active_subscription", { _user_id: user.id });
      // if (!hasSub) { setLoading(false); return; }

      // Get or create referral code
      let { data: codeRow } = await (supabase
        .from("referral_codes" as any)
        .select("code")
        .eq("user_id", user.id)
        .maybeSingle() as any);

      if (!codeRow) {
        const { data: newCode } = await supabase.rpc("generate_referral_code" as any);
        if (newCode) {
          const { data: inserted } = await (supabase
            .from("referral_codes" as any)
            .insert({ user_id: user.id, code: newCode as string })
            .select("code")
            .single() as any);
          codeRow = inserted;
        }
      }

      if (codeRow) setReferralCode(codeRow.code);

      // Get referral count (purchased only)
      const { count } = await (supabase
        .from("referral_tracking" as any)
        .select("*", { count: "exact", head: true })
        .eq("referrer_user_id", user.id)
        .eq("purchased", true) as any);

      setReferralCount(count || 0);
      setLoading(false);
    };
    init();
  }, []);

  const BASE_URL = "https://cloudaviationexams.com";

  const handleCopy = async () => {
    if (!referralCode) return;
    const link = `${BASE_URL}/auth?ref=${referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!referralCode) return;
    const link = `${BASE_URL}/auth?ref=${referralCode}`;
    if (navigator.share) {
      await navigator.share({
        title: "CloudAviation Exams",
        text: "Join CloudAviation Exams - India's #1 DGCA Question Bank!",
        url: link,
      });
    } else {
      handleCopy();
    }
  };

  if (loading || !referralCode) return null;

  const progress = Math.min(referralCount, 5);
  const rewardEarned = referralCount >= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border/40 p-5 sm:p-6"
      style={{
        background: "linear-gradient(135deg, hsla(217, 91%, 60%, 0.08) 0%, hsla(38, 92%, 55%, 0.06) 50%, hsla(217, 91%, 60%, 0.04) 100%)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)), transparent)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Header */}
      <motion.div
        className="flex items-center gap-2.5 mb-3 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="p-2 rounded-xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gift className="w-4 h-4 text-primary-foreground" />
        </motion.div>
        <h3 className="font-display text-lg font-bold text-foreground">
          Refer & Earn ₹200
        </h3>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground mb-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Share your link with friends. When 5 people sign up and purchase a plan, you earn ₹200!
      </motion.p>

      {/* Referral Link */}
      <motion.div
        className="flex items-center gap-2 mb-5 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="flex-1 bg-muted/60 border border-border/50 rounded-xl px-3 py-2.5 text-xs font-mono text-foreground truncate">
          {BASE_URL}/auth?ref={referralCode}
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex-shrink-0 rounded-xl h-10 w-10 p-0">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex-shrink-0 rounded-xl h-10 w-10 p-0">
            <Share2 className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="space-y-2.5 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {progress}/5 successful referrals
          </span>
          {rewardEarned && (
            <motion.span
              className="text-accent font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉 Reward earned!
            </motion.span>
          )}
        </div>
        <div className="w-full bg-muted/60 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="rounded-full h-2.5 relative"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(progress / 5) * 100}%` }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.3), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </motion.div>
        </div>
        {/* Step dots */}
        <div className="flex justify-between px-0.5">
          {[1, 2, 3, 4, 5].map((step) => (
            <motion.div
              key={step}
              className={`w-1.5 h-1.5 rounded-full ${step <= progress ? "bg-primary" : "bg-muted-foreground/30"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + step * 0.08 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReferralPanel;
