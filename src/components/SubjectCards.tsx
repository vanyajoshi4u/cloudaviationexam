import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronRight, Library } from "lucide-react";
import { icJoshiTopics } from "@/data/icJoshiQuestions";
import { oxfordMetTopics } from "@/data/oxfordMetQuestions";
import { rtrTopics } from "@/data/rtrQuestions";
import { rtrQuestionBank1Topic } from "@/data/rtrQuestionBank1";

interface SubTopic {
  title: string;
  chapters: string[];
  books?: string[];
  hasQuiz?: boolean;
  quizSource?: "joshi" | "oxford" | "rtr";
}

interface Subject {
  title: string;
  subtopics: SubTopic[];
}

const subjectsData: Subject[] = [
  {
    title: "Air Navigation",
    subtopics: [
      {
        title: "General Navigation",
        chapters: ["R K Bali", "Oxford", "Keith William Blue Book", "Redbird"],
      },
      {
        title: "Radio Navigation",
        chapters: ["R K Bali", "Oxford", "Keith William Blue Book", "Redbird"],
      },
      {
        title: "Instrument Navigation",
        chapters: ["R K Bali", "Oxford", "Keith William Blue Book", "Redbird"],
      },
    ],
  },
  {
    title: "Air Meteorology",
    subtopics: [
      {
        title: "I C Joshi",
        chapters: icJoshiTopics.map((t) => t.title),
        hasQuiz: true,
      },
      {
        title: "Oxford",
        chapters: oxfordMetTopics.map((t) => t.title),
        hasQuiz: true,
        quizSource: "oxford",
      },
    ],
  },
  {
    title: "Air Regulations",
    subtopics: [
      {
        title: "ICAO Standards",
        chapters: [
          "Annexes Overview",
          "Airspace Classification",
          "Flight Rules (VFR/IFR)",
          "SARPS & PANS",
        ],
        books: ["R K Bali", "Oxford"],
      },
      {
        title: "Indian Aviation Rules",
        chapters: [
          "Aircraft Act 1934",
          "Aircraft Rules 1937",
          "DGCA CAR Series",
          "Licensing Requirements",
          "Operations Specifications",
        ],
        books: ["R K Bali", "Oxford"],
      },
      {
        title: "Air Traffic Services",
        chapters: [
          "ATC Procedures",
          "Separation Standards",
          "Aerodrome Operations",
          "Emergency Procedures",
        ],
        books: ["R K Bali", "Oxford"],
      },
    ],
  },
  {
    title: "Technical General",
    subtopics: [
      {
        title: "Aerodynamics",
        chapters: [
          "Principles of Flight",
          "Lift, Drag & Thrust",
          "Stability & Control",
          "High Speed Aerodynamics",
          "Stall & Spin",
        ],
      },
      {
        title: "Aircraft Systems",
        chapters: [
          "Hydraulic Systems",
          "Pneumatic Systems",
          "Electrical Systems",
          "Fuel Systems",
          "Landing Gear & Brakes",
        ],
      },
      {
        title: "Powerplant",
        chapters: [
          "Piston Engines",
          "Gas Turbine Engines",
          "Propellers",
          "Engine Instruments",
          "Fire Protection",
        ],
      },
    ],
  },
  {
    title: "Technical Specific",
    subtopics: [
      {
        title: "Aircraft Performance",
        chapters: [
          "Takeoff Performance",
          "Climb & Cruise Performance",
          "Landing Performance",
          "Weight & Balance",
          "Flight Planning",
        ],
      },
      {
        title: "Type-Specific Systems",
        chapters: [
          "Airframe & Structures",
          "Avionics Suite",
          "Flight Controls",
          "Pressurization & Air Conditioning",
        ],
      },
    ],
  },
  {
    title: "RTR",
    subtopics: [
      {
        title: "RTR Part 1 Question Bank",
        chapters: ["Question Bank-1"],
        hasQuiz: true,
        quizSource: "rtr" as const,
      },
      {
        title: "RTR Part 1 (DGCA)",
        hasQuiz: true,
        quizSource: "rtr" as const,
        chapters: [
          "Ch 1 – Broad Guidelines, Syllabus, Radio Telephone Restricted Licence Examination",
          "Ch 2 – Definitions Related with Annex-10",
          "Ch 3 – Definitions Related with DOC 4444, DOC 9432, AIP",
          "Ch 4 – Common ATC Abbreviations",
          "Ch 5 – Civil Aviation Set Up in India – Ministry of Civil Aviation (MOCA) & DGCA",
          "Ch 6 – ITU Convention & Radio Regulations",
          "Ch 7 – ICAO Bodies",
          "Ch 8 – Q-Codes",
          "Ch 9 – Aeronautical Telecommunication Services",
          "Ch 10 – Radio Equipment & Communication Systems",
          "Ch 11 – Met Information & Pre-Flight Briefing",
          "Ch 12 – AIP & Aeronautical Information",
          "Ch 13 – Location Indicators",
          "Ch 14 – NOTAM, FIR & AIC",
          "Ch 15 – GPS – Global Positioning System",
          "Ch 16 – GAGAN",
          "Ch 17 – RADAR – Radio Detection & Ranging",
          "Ch 18 – INS – Inertial Navigation System",
          "Ch 19 – Radio Propagation",
          "Ch 20 – Electrical Units",
          "Ch 21 – SELCAL",
          "Ch 22 – Squelch, Microphones & Headphones",
          "Ch 23 – Operation of Microphones, Headphones, Squelch, AVC, Volume Control & Simplex/Duplex",
          "Ch 24 – RT Communication Limitations",
          "Ch 25 – Instrument Landing System (ILS)",
          "Ch 26 – NDB & ADF",
          "Ch 27 – VOR",
          "Ch 28 – DME",
          "Ch 29–31 – Phraseology & Call Signs",
          "Ch 32 – Clearance, Read-back & Test Transmissions",
          "Ch 33 – Distress & Urgency Procedures",
          "Ch 34 – Voice – Aircraft Communications Failure",
          "Ch 35 – Model MCQ Practice for DGCA RTR Exam Part-I",
          "Ch 36 – Sample Paper 1",
          "Ch 37 – Sample Paper 2",
          "Ch 38 – Sample Paper 3",
          "Ch 39 – Sample Paper 4",
          "Ch 40 – Sample Paper 5",
          "Ch 41 – Sample Paper 6",
          "Ch 42 – Sample Paper 7",
          "Ch 43 – Sample Paper 8",
          "Ch 44 – Sample Paper 9",
        ],
      },
    ],
  },
  {
    title: "RTR Part 2 (DGCA) Practice",
    subtopics: [
      {
        title: "Radio Telephony Paper 1",
        chapters: ["Paper 1 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 2",
        chapters: ["Paper 2 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 3",
        chapters: ["Paper 3 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 4",
        chapters: ["Paper 4 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 5",
        chapters: ["Paper 5 – Full Practice Set"],
      },
    ],
  },
];

const SubjectCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openSubtopic, setOpenSubtopic] = useState<string | null>(null);

  const toggleSubject = (title: string) => {
    setOpenSubject(openSubject === title ? null : title);
    setOpenSubtopic(null);
  };

  const toggleSubtopic = (title: string) => {
    setOpenSubtopic(openSubtopic === title ? null : title);
  };

  return (
    <section id="subjects" className="py-20 sm:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
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
            Click on any subject to explore its topics and chapters.
          </p>
        </motion.div>

        {/* Accordion Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          {subjectsData.map((subject) => {
            const isSubjectOpen = openSubject === subject.title;

            return (
              <div key={subject.title} className="glass-card overflow-hidden">
                {/* Subject Header */}
                <button
                  onClick={() => toggleSubject(subject.title)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-primary/5 transition-colors duration-200"
                >
                  <span className="font-display text-sm sm:text-base font-semibold text-foreground">
                    {subject.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      isSubjectOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {/* Subtopics */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isSubjectOpen ? "auto" : 0,
                    opacity: isSubjectOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border/30 px-4 sm:px-5 pb-3">
                    {subject.subtopics.map((subtopic) => {
                      const isSubtopicOpen = openSubtopic === subtopic.title;

                      return (
                        <div key={subtopic.title} className="mt-1">
                          {/* Subtopic Header */}
                          <button
                            onClick={() => toggleSubtopic(subtopic.title)}
                            className="w-full flex items-center gap-2 py-3 px-3 text-left rounded-lg hover:bg-primary/5 transition-colors duration-200"
                          >
                            <ChevronRight
                              className={`w-4 h-4 text-primary/60 transition-transform duration-300 flex-shrink-0 ${
                                isSubtopicOpen ? "rotate-90 text-primary" : ""
                              }`}
                            />
                            <span className="text-sm text-muted-foreground font-medium">
                              {subtopic.title}
                            </span>
                          </button>

                          {/* Chapters */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isSubtopicOpen ? "auto" : 0,
                              opacity: isSubtopicOpen ? 1 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-9 pb-2 flex flex-col gap-1">
                              {subtopic.chapters.map((chapter) => {
                                const topicSource = subtopic.quizSource === "oxford" ? oxfordMetTopics : subtopic.quizSource === "rtr" ? [...rtrTopics, rtrQuestionBank1Topic] : icJoshiTopics;
                                const quizTopic = subtopic.hasQuiz
                                  ? topicSource.find((t) => t.title === chapter)
                                  : null;
                                
                                // Check for content pages (non-quiz chapters)
const contentPageMap: Record<string, string> = {
                                  "Ch 1 – Broad Guidelines, Syllabus, Radio Telephone Restricted Licence Examination": "/rtr-chapter/rtr-ch1",
                                  "Ch 2 – Definitions Related with Annex-10": "/rtr-chapter/rtr-ch2",
                                   "Ch 3 – Definitions Related with DOC 4444, DOC 9432, AIP": "/rtr-chapter/rtr-ch3",
                                   "Ch 18 – INS – Inertial Navigation System": "/rtr-chapter/rtr-ch18",
                                   "Ch 22 – Squelch, Microphones & Headphones": "/rtr-chapter/rtr-ch22",
                                   "Met Instruments": "/rtr-chapter/icj-met-instruments",
                                };
                                const contentLink = contentPageMap[chapter];
                                const isClickable = !!quizTopic || !!contentLink;

                                return (
                                  <button
                                    key={chapter}
                                    onClick={() => {
                                      if (contentLink) navigate(contentLink);
                                      else if (quizTopic) navigate(`/topics/${quizTopic.id}`);
                                    }}
                                    className={`text-xs sm:text-sm text-muted-foreground hover:text-primary py-1.5 px-3 rounded-md hover:bg-primary/5 transition-colors duration-200 block text-left ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                                  >
                                    {chapter}
                                    {contentLink && (
                                      <span className="ml-2 text-[10px] text-primary/60">(Notes)</span>
                                    )}
                                    {quizTopic && !contentLink && (
                                      <span className="ml-2 text-[10px] text-primary/60">({quizTopic.questions.length} MCQs)</span>
                                    )}
                                  </button>
                                );
                              })}
                              {subtopic.books && subtopic.books.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-border/20">
                                  <div className="flex items-center gap-1.5 mb-1 px-3">
                                    <Library className="w-3.5 h-3.5 text-primary/60" />
                                    <span className="text-xs text-muted-foreground/70 font-medium">Reference Books</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 px-3">
                                    {subtopic.books.map((book) => (
                                      <span
                                        key={book}
                                        className="text-xs bg-primary/8 text-primary/80 px-2.5 py-1 rounded-full border border-primary/10"
                                      >
                                        {book}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectCards;
