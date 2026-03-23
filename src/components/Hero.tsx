import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import heroImage from "@/assets/hero-runway.jpg";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Aircraft on runway at dawn"
          className={`w-full h-full object-cover ${theme === 'light' ? 'opacity-40' : 'opacity-30'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + i * 12}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 sm:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground tracking-wide">
              CloudAviationExam's
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-3xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 sm:mb-6"
          >
            India's #1{" "}
            <span className="text-gradient-sky">DGCA</span>{" "}
            <br className="hidden sm:block" />
            Question{" "}
            <span className="text-accent font-bold">Bank</span>
            <br />
            <span className="inline-flex items-center gap-2 mt-3 text-base sm:text-xl md:text-2xl font-semibold">
              <span className="text-muted-foreground">with</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                RTR Part-2 DGCA Simulator
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
          >
            Master Air Navigation, Meteorology, Regulations & Technical subjects
            with our comprehensive question bank, mock tests, and performance analytics.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-8 max-w-xl mx-auto"
          >
            {[
              { value: "10,000+", label: "Questions", color: "text-gradient-sky" },
              { value: "5,000+", label: "Students", color: "text-gradient-sky" },
              { value: "95%", label: "Pass Rate", color: "text-accent" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`font-display text-xl sm:text-2xl md:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
