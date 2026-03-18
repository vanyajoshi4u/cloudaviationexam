import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Mail, Plane, Target, Compass, Rocket, Globe } from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    { icon: Target, title: "Precision Crafted", desc: "Every question reflects real-world aviation scenarios" },
    { icon: Compass, title: "Student-First", desc: "Structured to inspire confidence, not fear" },
    { icon: Rocket, title: "Beyond Memorization", desc: "Understand, apply, and soar with concepts" },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden" id="about">
      {/* Static layered background — no JS animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-card/80 to-accent/10" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 20% 20%, hsl(var(--primary) / 0.15), transparent), radial-gradient(ellipse 50% 60% at 80% 80%, hsl(var(--accent) / 0.12), transparent), radial-gradient(ellipse 40% 40% at 50% 50%, hsl(var(--primary) / 0.08), transparent)"
        }} />
        {/* CSS-animated orbs instead of framer-motion */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-lg relative z-10">
        {/* Logo — simplified, no infinite JS animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* CSS rotating rings */}
            <div className="absolute -inset-6 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-10 rounded-full border border-accent/10 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute -inset-14 rounded-full border border-primary/5 animate-[spin_25s_linear_infinite]" />

            {/* 3D depth layers — static, GPU-composited */}
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              {[...Array(7)].map((_, i) => (
                <img
                  key={i}
                  src="/academyFevicon.png"
                  alt=""
                  className="absolute inset-0 w-24 h-24 rounded-2xl will-change-transform"
                  style={{
                    transform: `translateZ(${-(i + 1) * 3}px)`,
                    opacity: 0.15 - i * 0.02,
                    filter: `blur(${i * 0.5}px) brightness(${1 - i * 0.1})`,
                  }}
                />
              ))}
              <img
                src="/academyFevicon.png"
                alt="CloudAviation Logo"
                className="w-24 h-24 rounded-2xl shadow-2xl relative z-10 animate-pulse-glow"
                style={{ transform: "translateZ(10px)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2 font-display">
            About{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
              CloudAviation
            </span>{" "}
            Exams
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "6rem" } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </motion.div>

        {/* Plane divider */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "200%" } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center mb-8"
        >
          <Plane className="w-5 h-5 text-primary" />
        </motion.div>

        {/* Content — simple fade-up stagger, no sideways slides */}
        <div className="space-y-4">
          {[
            "At CloudAviation, exams are not just tests — they are launchpads for future aviators.",
            "Designed with precision and purpose, CloudAviation Exams go beyond traditional assessments. They are crafted to challenge curiosity, sharpen critical thinking, and prepare students for the dynamic world of aviation.",
            "Every question is built to reflect real-world scenarios, ensuring that learners don't just memorize concepts — they understand, apply, and soar with them.",
            "What makes CloudAviation truly unique is its student-first approach. The exams are structured to inspire confidence, not fear. With a balanced mix of conceptual depth and practical application, students experience a journey where learning feels exciting, engaging, and meaningful.",
            "From aspiring pilots to aviation enthusiasts, CloudAviation Exams act as a compass — guiding students toward excellence, clarity, and success in one of the most thrilling industries in the world.",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <p
                className={`text-sm leading-relaxed ${
                  i === 0
                    ? "text-primary font-semibold text-base glass-card p-4 border-l-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature cards — no infinite rotateY on icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="grid grid-cols-3 gap-3 mt-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="glass-card p-3 text-center group cursor-default"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground mb-1">{f.title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-8 text-center"
        >
          <div className="glass-card p-6 border-t-2 border-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <p className="text-sm font-medium text-foreground relative z-10 italic">
              "Step into the future of aviation learning."
            </p>
            <p className="text-xs text-accent mt-2 relative z-10 font-semibold">
              Because at CloudAviation, we don't just test knowledge — we elevate it.
            </p>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <a
            href="https://www.instagram.com/cloudaviation.4u/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 glass-card px-4 py-2.5 group hover:border-destructive/30 hover:scale-105 transition-all duration-200"
          >
            <Instagram className="w-4 h-4 text-destructive/70 group-hover:text-destructive transition-colors" />
            <span className="text-xs font-medium text-foreground">@cloudaviation.4u</span>
          </a>

          <a
            href="mailto:cloudaviation4u@gmail.com"
            className="flex items-center gap-2 glass-card px-4 py-2.5 group hover:border-primary/40 hover:scale-105 transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
            <span className="text-xs font-medium text-foreground">Email Us</span>
          </a>

          <a
            href="https://cloudavaiation.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 glass-card px-4 py-2.5 group hover:border-accent/40 hover:scale-105 transition-all duration-200"
          >
            <Globe className="w-4 h-4 text-accent group-hover:text-accent/80 transition-colors" />
            <span className="text-xs font-medium text-foreground">cloudaviation.in</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
