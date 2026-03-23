import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  BarChart3,
  Bookmark,
  Search,
  Smartphone,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Practice",
    description: "AI-powered question selection adapts to your weak areas for focused improvement.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed insights across subjects and topics.",
  },
  {
    icon: Target,
    title: "Mock Tests",
    description: "Simulate real DGCA exams with timed tests and instant scoring.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    description: "Quickly find questions by subject, topic, difficulty, or keyword.",
  },
  {
    icon: Bookmark,
    title: "Bookmark & Review",
    description: "Save important questions and review them before your exam day.",
  },
  {
    icon: Zap,
    title: "Instant Explanations",
    description: "Every question comes with detailed explanations and references.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Study anytime, anywhere with our fully responsive mobile experience.",
  },
  {
    icon: Shield,
    title: "Updated Content",
    description: "Question bank regularly updated to match latest DGCA syllabus changes.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 sm:py-32 relative" ref={ref}>
      {/* Subtle bg accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-accent">Pass</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Built by pilots, for aspiring pilots. Every feature designed to maximize your exam readiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-6 group hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
