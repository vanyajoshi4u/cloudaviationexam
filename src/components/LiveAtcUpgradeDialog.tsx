import { useState } from "react";
import { Upload, CheckCircle, Loader2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import UpiQrCode from "@/components/UpiQrCode";

interface LiveAtcUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const LiveAtcUpgradeDialog = ({ open, onOpenChange, onSuccess }: LiveAtcUpgradeDialogProps) => {
  const [referralCode, setReferralCode] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) { toast.error("Please upload your payment screenshot"); return; }
    if (!referralCode.trim()) { toast.error("Please enter your UTR code"); return; }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      toast.info("Verifying referral code from screenshot...");
      const imageBase64 = await fileToBase64(screenshot);

      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        "verify-referral-code",
        { body: { imageBase64, referralCode: referralCode.trim(), expectedAmount: 499 } }
      );
      if (verifyError) throw new Error("Verification failed. Please try again.");
      if (!verifyData.match) {
        toast.error(verifyData.message || "Referral code does not match the screenshot.");
        setLoading(false);
        return;
      }

      toast.success("Referral code verified!");

      const fileExt = screenshot.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("payment-screenshots").upload(filePath, screenshot);
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        plan: "live_atc_3_months" as const,
        amount: 499,
        referral_code: referralCode.trim(),
        payment_screenshot_url: filePath,
        status: "pending",
      });
      if (insertError) throw insertError;

      toast.success("Payment successful! Live ATC access activated.");

      supabase.functions.invoke("send-payment-confirmation", {
        body: { plan: "live_atc_3_months", amount: 499 },
      }).catch((err) => console.error("Email sending failed:", err));

      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Upgrade to Live ATC Practice</DialogTitle>
          <DialogDescription>
            Upgrade to RTR Part-2 Practice with Live ATC Simulator for ₹499 (3 months access). Pay below to unlock it.
          </DialogDescription>
        </DialogHeader>

        {/* QR Code */}
        <div className="my-2">
          <UpiQrCode amount={499} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Screenshot Upload */}
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Payment Screenshot *</Label>
            {screenshot ? (
              <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground truncate flex-1">{screenshot.name}</span>
                <button type="button" onClick={() => setScreenshot(null)} className="text-xs text-destructive hover:underline flex-shrink-0">
                  Remove
                </button>
                <input id="live-atc-screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <label htmlFor="live-atc-screenshot" className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-border/50 hover:border-border cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Upload payment screenshot</span>
                <input id="live-atc-screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {/* UTR Code */}
          <div className="space-y-2">
            <Label htmlFor="live-atc-referral" className="text-sm text-foreground">UTR Code *</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="live-atc-referral"
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

          <Button type="submit" className="w-full font-display text-sm tracking-wider py-5" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Submit Payment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LiveAtcUpgradeDialog;
