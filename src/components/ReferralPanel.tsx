import { useState, useEffect } from "react";
import { Copy, Check, Share2, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const handleCopy = async () => {
    if (!referralCode) return;
    const link = `${window.location.origin}/auth?ref=${referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!referralCode) return;
    const link = `${window.location.origin}/auth?ref=${referralCode}`;
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
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-5 h-5 text-primary" />
        <h3 className="font-display text-base font-bold text-foreground">Refer & Earn ₹200</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Share your link with friends. When 5 people sign up and purchase a plan, you earn ₹200!
      </p>

      {/* Referral Link */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground truncate">
          {window.location.origin}/auth?ref={referralCode}
        </div>
        <Button variant="outline" size="sm" onClick={handleCopy} className="flex-shrink-0">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="flex-shrink-0">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="w-3 h-3" /> {progress}/5 successful referrals
          </span>
          {rewardEarned && (
            <span className="text-primary font-semibold">🎉 Reward earned!</span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${(progress / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralPanel;
