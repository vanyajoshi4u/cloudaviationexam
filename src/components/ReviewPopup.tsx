import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ReviewPopup = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("login_count, review_submitted")
        .eq("user_id", session.user.id)
        .single();

      if (profile && profile.login_count >= 3 && !profile.review_submitted) {
        // Small delay so the page loads first
        setTimeout(() => setOpen(true), 2000);
      }
    };
    checkEligibility();
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = session?.user?.email || "Unknown";

      await supabase.functions.invoke("send-review-email", {
        body: { rating, review, userEmail },
      });

      // Mark review as submitted
      if (session) {
        await supabase
          .from("profiles")
          .update({ review_submitted: true })
          .eq("user_id", session.user.id);
      }

      toast.success("Thank you for your feedback! 🎉");
      setOpen(false);
    } catch (e) {
      console.error("Review submit error:", e);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">How's your experience? ✈️</DialogTitle>
          <DialogDescription className="text-center">
            We'd love to hear your feedback about CloudAviation Exams
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-4">
          {/* Star Rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <span className="text-sm text-muted-foreground">
              {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
            </span>
          )}

          {/* Review Text */}
          <Textarea
            placeholder="Write your review (optional)..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            maxLength={500}
            className="min-h-[100px] resize-none"
          />

          <Button
            onClick={handleSubmit}
            disabled={sending || rating === 0}
            className="w-full gap-2"
          >
            {sending ? (
              <span className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPopup;
