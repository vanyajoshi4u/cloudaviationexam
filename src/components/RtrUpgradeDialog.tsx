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

const paymentQR = "/payment-qr.png";

interface RtrUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const RtrUpgradeDialog = ({ open, onOpenChange, onSuccess }: RtrUpgradeDialogProps) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) { toast.error("Please upload your payment screenshot"); return; }
    if (!referralCode.trim()) { toast.error("Please enter your UTR code"); return; }

    setLoading(true);
    let filePath = "";
    try {
      if (!navigator.onLine) throw new Error("You appear to be offline. Please check your internet connection and try again.");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1) Upload first to avoid large verification payload issues
      toast.info("Uploading payment screenshot...");
      const fileExt = screenshot.name.split(".").pop();
      filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("payment-screenshots").upload(filePath, screenshot);
      if (uploadError) throw new Error("Failed to upload screenshot. Please check your internet connection and try again.");

      // 2) Verify with retry/backoff using storage path
      toast.info("Verifying payment details...");
      const invokeWithRetry = async (attempts = 3): Promise<any> => {
        for (let i = 0; i < attempts; i++) {
          try {
            const { data, error } = await supabase.functions.invoke("verify-referral-code", {
              body: { storagePath: filePath, referralCode: referralCode.trim(), expectedAmount: 999 },
            });
            if (error) {
              if (i === attempts - 1) throw error;
              await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
              continue;
            }
            return data;
          } catch (err) {
            if (i === attempts - 1) throw err;
            await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
          }
        }
      };

      const verifyData = await invokeWithRetry();

      if (!verifyData || !verifyData.match) {
        await supabase.storage.from("payment-screenshots").remove([filePath]).catch(() => null);
        toast.error(verifyData?.message || "Verification failed. Please check your details and try again.");
        setLoading(false);
        return;
      }

      const screenshotHash = verifyData.screenshotHash || null;
      toast.success("Payment verified!");

      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        plan: "3_months" as const,
        amount: 999,
        referral_code: referralCode.trim(),
        payment_screenshot_url: filePath,
        screenshot_hash: screenshotHash,
        status: "pending",
      });
      if (insertError) throw insertError;

      toast.success("Payment successful! RTR Part-2 access activated.");

      supabase.functions.invoke("send-payment-confirmation", {
        body: { plan: "3_months", amount: 999 },
      }).catch((err) => console.error("Email sending failed:", err));

      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Upgrade to RTR Part-2</DialogTitle>
          <DialogDescription>
            Upgrade to RTR Part-2 (DGCA) Practice Simulator for ₹999 (3 months access). Pay below to unlock it.
          </DialogDescription>
        </DialogHeader>

        {/* QR Code */}
        <div className="text-center my-2">
          <div className="inline-block bg-white p-3 rounded-xl">
            <img src={paymentQR} alt="Payment QR Code" className="w-40 h-40 object-contain" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Pay <span className="text-primary font-semibold">₹999</span> via PhonePe / UPI
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
                <button type="button" onClick={() => setScreenshot(null)} className="text-xs text-destructive hover:underline flex-shrink-0">
                  Remove
                </button>
                <input id="upgrade-screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <label htmlFor="upgrade-screenshot" className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-border/50 hover:border-border cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Upload payment screenshot</span>
                <input id="upgrade-screenshot" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <Label htmlFor="upgrade-referral" className="text-sm text-foreground">UTR Code *</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="upgrade-referral"
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

export default RtrUpgradeDialog;
