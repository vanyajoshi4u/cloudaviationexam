import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="glass-panel p-8 sm:p-16 text-center relative overflow-hidden max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 blur-[100px] rounded-full" />

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4 relative z-10">
            Ready for{" "}
            <span className="text-gradient-sky">Takeoff</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base mb-8 relative z-10">
            Join CloudAviationExam's today and start your journey towards clearing the DGCA exams with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button
              size="lg"
              className="glow-blue font-display text-xs sm:text-sm tracking-wider px-8 py-6 w-full sm:w-auto"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border/60 hover:border-primary/50 px-8 py-6 w-full sm:w-auto"
            >
              View Question Bank
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
