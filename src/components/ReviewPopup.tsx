import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ReviewPopup = () => {
  const [open, setOpen] = useState(true); // TEMP: force open for preview
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

      if (session) {
        await supabase
          .from("profiles")
          .update({ review_submitted: true })
          .eq("user_id", session.user.id);
      }

      setSubmitted(true);
      setTimeout(() => setOpen(false), 2500);
    } catch (e) {
      console.error("Review submit error:", e);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const starLabels = ["Terrible", "Poor", "Good", "Great", "Excellent!"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ perspective: "1200px" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* 3D Card */}
          <motion.div
            initial={{ opacity: 0, rotateX: -25, rotateY: 15, scale: 0.7, y: 80 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: 15, rotateY: -10, scale: 0.8, y: 60 }}
            transition={{ type: "spring", damping: 20, stiffness: 180, mass: 0.8 }}
            className="relative w-full max-w-md z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow behind card */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/40 via-sky-400/20 to-primary/30 blur-2xl opacity-60 animate-pulse" />

            <div
              className="relative rounded-2xl border border-primary/20 overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
                boxShadow: "0 25px 60px -15px hsl(var(--primary) / 0.3), 0 0 40px -10px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(var(--primary) / 0.1)",
              }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Floating plane icon */}
              <div className="flex justify-center pt-6 pb-2">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" />
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center border border-primary/30"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05))",
                      boxShadow: "0 0 30px hsl(var(--primary) / 0.2), inset 0 0 20px hsl(var(--primary) / 0.05)",
                    }}
                  >
                    <Plane className="w-7 h-7 text-primary" />
                  </div>
                </motion.div>
              </div>

              <div className="px-6 pb-6">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-center text-foreground mb-1"
                      >
                        Rate Your Experience
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-center text-muted-foreground mb-5"
                      >
                        How's CloudAviation Exams working for you?
                      </motion.p>

                      {/* 3D Star Rating */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-center gap-2 mb-2"
                        style={{ perspective: "600px" }}
                      >
                        {[1, 2, 3, 4, 5].map((star, i) => {
                          const active = star <= (hoveredStar || rating);
                          return (
                            <motion.button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              initial={{ opacity: 0, y: 20, rotateY: -90 }}
                              animate={{ opacity: 1, y: 0, rotateY: 0 }}
                              transition={{ delay: 0.45 + i * 0.08, type: "spring", stiffness: 200 }}
                              whileHover={{ scale: 1.3, rotateY: 15, z: 20 }}
                              whileTap={{ scale: 0.9 }}
                              className="relative"
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              {active && (
                                <motion.div
                                  layoutId={`glow-${star}`}
                                  className="absolute inset-0 rounded-full blur-lg"
                                  style={{ background: "hsl(45, 100%, 55%)", opacity: 0.5 }}
                                />
                              )}
                              <Star
                                className={`w-10 h-10 relative z-10 transition-all duration-200 drop-shadow-lg ${
                                  active
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/40"
                                }`}
                                style={active ? { filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))" } : {}}
                              />
                            </motion.button>
                          );
                        })}
                      </motion.div>

                      {/* Rating label */}
                      <div className="h-6 flex justify-center mb-4">
                        <AnimatePresence mode="wait">
                          {(hoveredStar || rating) > 0 && (
                            <motion.span
                              key={hoveredStar || rating}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-sm font-medium text-primary"
                            >
                              {starLabels[(hoveredStar || rating) - 1]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Review textarea */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Textarea
                          placeholder="Tell us more about your experience (optional)..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          maxLength={500}
                          className="min-h-[90px] resize-none bg-muted/30 border-primary/10 focus:border-primary/30 backdrop-blur-sm rounded-xl"
                        />
                        <p className="text-xs text-muted-foreground text-right mt-1">{review.length}/500</p>
                      </motion.div>

                      {/* Submit button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-3"
                      >
                        <Button
                          onClick={handleSubmit}
                          disabled={sending || rating === 0}
                          className="w-full h-11 gap-2 rounded-xl font-semibold text-sm relative overflow-hidden group"
                          style={{
                            background: rating > 0
                              ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))"
                              : undefined,
                            boxShadow: rating > 0
                              ? "0 8px 25px -5px hsl(var(--primary) / 0.4)"
                              : undefined,
                          }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          {sending ? (
                            <span className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Submit Review
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    /* Thank you state */
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="flex flex-col items-center py-6 gap-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl"
                      >
                        🎉
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Your feedback means the world to us ✈️
                      </p>
                      {/* Animated stars recap */}
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <motion.div
                            key={s}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2 + s * 0.1, type: "spring" }}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewPopup;
