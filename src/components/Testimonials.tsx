import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Capt. Arjun Mehta",
    role: "Commercial Pilot, IndiGo",
    text: "CloudAviationExam's question bank was instrumental in clearing my ATPL exams on the first attempt. The explanations are top-notch.",
  },
  {
    name: "Priya Sharma",
    role: "CPL Student",
    text: "The mock tests simulate the real exam perfectly. My confidence went up significantly after practicing here for just 2 months.",
  },
  {
    name: "Rahul Kapoor",
    role: "Flight Instructor, IGRUA",
    text: "I recommend CloudAviationExam's to all my students. The subject-wise breakdown and performance tracking is exactly what aspirants need.",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="text-gradient-sky">Aviators</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of pilots who cleared their DGCA exams with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card p-6 sm:p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="border-t border-border/20 pt-4">
                <div className="font-display text-sm font-semibold text-foreground">
                  {t.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
