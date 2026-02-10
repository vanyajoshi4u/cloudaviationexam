import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Navigation, Cloud, Scale, Wrench, Radio, BookOpen } from "lucide-react";

const subjects = [
  {
    icon: Navigation,
    title: "Air Navigation",
    description: "Charts, plotting, instruments, and navigation procedures for DGCA exams.",
    questions: "2,500+",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Cloud,
    title: "Air Meteorology",
    description: "Weather patterns, atmospheric science, and aviation weather services.",
    questions: "2,000+",
    color: "from-sky-500/20 to-indigo-500/10",
    iconColor: "text-sky-400",
  },
  {
    icon: Scale,
    title: "Air Regulations",
    description: "DGCA rules, ICAO standards, airspace classifications, and compliance.",
    questions: "1,800+",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Wrench,
    title: "Technical General",
    description: "Aircraft systems, engines, aerodynamics, and general technical knowledge.",
    questions: "2,200+",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Wrench,
    title: "Technical Specific",
    description: "Aircraft-type specific systems, performance, and flight planning.",
    questions: "1,500+",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Radio,
    title: "RTR",
    description: "Radio telephony, communication procedures, and phraseology.",
    questions: "800+",
    color: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-400",
  },
];

const SubjectCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="subjects" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground tracking-wide">
              DGCA Question Bank
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Master Every{" "}
            <span className="text-gradient-sky">Subject</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Comprehensive coverage of all DGCA exam subjects with detailed explanations and topic-wise practice.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`glass-card p-6 sm:p-8 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 bg-gradient-to-br ${subject.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-card/60 border border-border/30 ${subject.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <subject.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-muted-foreground font-display tracking-wider">
                    {subject.questions} Q's
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {subject.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {subject.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border/20 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Start Practicing</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectCards;
