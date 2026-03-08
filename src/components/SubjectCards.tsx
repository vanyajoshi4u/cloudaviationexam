import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronRight, Library, Lock } from "lucide-react";
import { icJoshiTopics } from "@/data/icJoshiQuestions";
import { oxfordMetTopics } from "@/data/oxfordMetQuestions";
import { rtrTopics } from "@/data/rtrQuestions";
import { rtrQuestionBank1Topic } from "@/data/rtrQuestionBank1";
import { rtrQuestionBank2Topic } from "@/data/rtrQuestionBank2";
import { rtrQuestionBank3Topic } from "@/data/rtrQuestionBank3";
import { rtrQuestionBank4Topic } from "@/data/rtrQuestionBank4";
import { rkBaliRegTopics } from "@/data/rkBaliRegQuestions";
import { rkBaliSamplePapers } from "@/data/rkBaliSamplePapers";
import { skMetTopics } from "@/data/skMetQuestions";
import { rkBaliGenNavTopics } from "@/data/rkBaliGenNavQuestions";
import { rkBaliInstrumentTopics } from "@/data/rkBaliInstrumentQuestions";
import { rkBaliRadioNavTopics } from "@/data/rkBaliRadioNavQuestions";
import { oxfordGenNavTopics } from "@/data/oxfordGenNavQuestions";
import { keithWilliamGenNavTopics } from "@/data/keithWilliamGenNavQuestions";
import { redbirdTechGeneralTopic } from "@/data/redbirdTechGeneralQuestions";
import { redbirdGenNavTopics } from "@/data/redbirdGenNavQuestions";
import { redbirdRadioNavTopics } from "@/data/redbirdRadioNavQuestions";
import { redbirdInstTopics } from "@/data/redbirdInstQuestions";
import { oxfordRadioNavTopics } from "@/data/oxfordRadioNavQuestions";
import { oxfordInstNavTopics } from "@/data/oxfordInstNavQuestions";
import { skTechQB2Topic } from "@/data/skTechQB2Questions";
import { skTechQB3Topic } from "@/data/skTechQB3Questions";
import { skTechQB4Topic } from "@/data/skTechQB4Questions";
import { skTechQB5Topic } from "@/data/skTechQB5Questions";
import { redbirdAirRegTopic } from "@/data/redbirdAirRegQuestions";
import { skRegAdditionalTopic } from "@/data/skRegQuestions";
import { cessna172RTopic } from "@/data/cessna172RQuestions";
import { cessna152Topic } from "@/data/cessna152Questions";
import { piperArcherTopic } from "@/data/piperArcherQuestions";
import { da42Topic } from "@/data/da42Questions";
import { da40Topic } from "@/data/da40Questions";
import { pa34220tTopic } from "@/data/pa34220tQuestions";
import { tecnamP2006tTopic } from "@/data/tecnamP2006tQuestions";
import { tecnamP2008jcTopic } from "@/data/tecnamP2008jcQuestions";
import { da42AustroTopic } from "@/data/da42AustroQuestions";
import { supabase } from "@/integrations/supabase/client";
import RtrUpgradeDialog from "@/components/RtrUpgradeDialog";
import LiveAtcUpgradeDialog from "@/components/LiveAtcUpgradeDialog";

interface ChapterWithSubs {
  name: string;
  subChapters: string[];
  hasQuiz?: boolean;
  quizSource?: SubTopic["quizSource"];
}

interface SubTopic {
  title: string;
  chapters: (string | ChapterWithSubs)[];
  books?: string[];
  hasQuiz?: boolean;
  quizSource?: "joshi" | "oxford" | "rtr" | "rkbali-reg" | "rkbali-samples" | "sk-met" | "rkbali-gennav" | "rkbali-inst" | "rkbali-radnav" | "redbird-tech" | "oxford-gennav" | "kw-gennav" | "redbird-gennav" | "redbird-radnav" | "redbird-inst" | "oxford-radnav" | "oxford-inst" | "redbird-airreg" | "cessna-172r" | "cessna-152" | "piper-archer" | "da-42" | "da-40" | "pa-34-220t" | "tecnam-p2006t" | "tecnam-p2008jc" | "da-42-austro" | "sk-reg-additional";
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
        chapters: [
          {
            name: "R K Bali",
            hasQuiz: true,
            quizSource: "rkbali-gennav",
            subChapters: [
              "Ch 1 – The Solar System",
              "Ch 2 – The Earth",
              "Ch 3 – Projections",
              "Ch 4 – Convergency",
              "Ch 5 – Time",
              "Ch 6 – Compass and Directions",
              "Ch 7 – Distances on Earth Surface",
              "Ch 8 – Magnetism and Compasses",
              "Ch 9 – Dead Reckoning Navigation (DR)",
              "Ch 10 – Measurement of DR Elements Pressure",
              "Ch 11 – Measurement / Determination of Temperature",
              "Ch 12 – Measurement of Elements",
              "Ch 13 – In-flight Navigation",
              "Ch 14 – Mass and Balance - Aero Planes",
              "Ch 15 – Performance",
              "Ch 16 – Flight Planning and Monitoring – Aero Planes",
            ],
          },
          {
            name: "Oxford",
            hasQuiz: true,
            quizSource: "oxford-gennav" as const,
            subChapters: [
              "Ch 1 – Direction, Latitude and Longitude",
              "Ch 2 – Great Circles, Rhumb Lines and Directions on the Earth",
              "Ch 3 – Earth Magnetism",
              "Ch 10 – The 1 in 60 Rule",
              "Ch 11 – Navigation Using the 1 in 60 Rule",
              "Ch 12 – Other Applications of the 1 in 60 Rule",
              "Ch 13 – Topographical Maps and Map Reading",
              "Ch 14 – Convergency and Conversion Angle",
              "Ch 15 – Departure",
              "Ch 16 – Scale",
              "Ch 17 – General Chart Properties",
              "Ch 18 – Mercator Charts - Properties",
              "Ch 19 – Mercator Charts - Scale",
              "Ch 20 – Mercator Charts - Plotting",
              "Ch 21 – Lambert's Conformal Chart",
              "Ch 22 – Lambert's Conformal Chart - 2",
              "Ch 23 – Mid Course Test",
              "Ch 24 – The Polar Stereographic Chart",
              "Ch 25 – Transverse and Oblique Mercator Charts",
              "Ch 26 – Time (1)",
              "Ch 27 – Time (2)",
              "Ch 28 – Time (3)",
              "Ch 29 – Critical Point (CP) and Point of No Return (PNR)",
              "Ch 30 – Gridded Charts",
              "Ch 31 – Plotting",
              "Ch 32 – The Direct Indicating Compass",
              "Ch 33 – Remote Indicating Magnetic Compass",
              "Ch 34 – Aircraft Magnetism",
              "Ch 35 – Inertial Navigation System",
              "Revision Questions",
            ],
          },
          {
            name: "Keith William",
            hasQuiz: true,
            quizSource: "kw-gennav" as const,
            subChapters: [
              "CRPS",
              "Chart Theory",
              "Circles",
              "Magnetic Compasses",
              "Descents",
              "INS/IRS/FMS",
              "Plotting",
              "PSR/PET",
              "Scale",
              "Solar System & Time",
            ],
          },
          {
            name: "Redbird",
            hasQuiz: true,
            quizSource: "redbird-gennav" as const,
            subChapters: [
              "Earth Basics & Magnetism",
              "The 1 in 60 Rule",
              "Convergency & Departure",
              "Charts & Scale",
              "Time & Twilight",
              "CP-PNR",
              "Payload & Mass Balance",
              "Performance",
              "Flight Plan",
              "Dead Reckoning Navigation",
            ],
          },
        ],
      },
      {
        title: "Radio Navigation",
        chapters: [
          {
            name: "R K Bali",
            hasQuiz: true,
            quizSource: "rkbali-radnav" as const,
            subChapters: [
              "Ch 1 – Basic Radio Theory",
              "Ch 2 – ADF / NDB",
              "Ch 3 – Track and Drift Questions",
              "Ch 4 – Very High Frequency Omni Direction Radio Range (VOR)",
              "Ch 5 – VOR/RMI/ADF Related Questions",
              "Ch 6 – Holding, Radial Intercept, Bearing to Plot",
              "Ch 7 – ILS (Instrument Landing System)",
              "Ch 8 – Radar",
              "Ch 9 – Global Navigation Satellite Systems (GNSS)",
            ],
          },
          {
            name: "Oxford",
            hasQuiz: true,
            quizSource: "oxford-radnav" as const,
            subChapters: [
              "Ch 1 – Properties of Radio Waves",
              "Ch 2 – Radio Propagation Theory",
              "Ch 3 – Modulation",
              "Ch 4 – Antennae",
              "Ch 5 – Doppler Radar Systems",
              "Ch 6 – VHF Direction Finder (VDF)",
              "Ch 7 – NDB and ADF",
              "Ch 8 – VOR",
              "Ch 9 – Instrument Landing System (ILS)",
              "Ch 10 – MLS & Radar Principles",
              "Ch 11 – Ground Radar & AWR",
              "Ch 12 – Secondary Surveillance Radar (SSR)",
              "Ch 13 – Distance Measuring Equipment (DME)",
              "Ch 14 – Area Navigation (RNAV) & FMS",
              "Ch 15 – Electronic Flight Information System (EFIS)",
              "Ch 16 – GNSS / GPS (Part 1)",
              "Ch 17 – GNSS / GPS (Part 2)",
              "Ch 18 – Revision: VDF, ADF & VOR",
              "Ch 19 – Revision: ILS & Mixed Topics",
              "Specimen Examination Paper",
            ],
          },
          "Keith William",
          {
            name: "Redbird",
            hasQuiz: true,
            quizSource: "redbird-radnav" as const,
            subChapters: [
              "Basic Radio & VDF",
              "NDB & ADF",
              "VOR",
              "Radar Basics",
              "DME & SSR",
              "Airborne Weather Radar (AWR)",
              "Instrument Landing System (ILS)",
            ],
          },
        ],
      },
      {
        title: "Instrument Navigation",
        chapters: [
          {
            name: "R K Bali",
            hasQuiz: true,
            quizSource: "rkbali-inst" as const,
            subChapters: [
              "Ch 1 – Air Data Systems (Pressure Instruments)",
              "Ch 2 – Altimeter",
              "Ch 3 – Air Speed Indicator (ASI)",
              "Ch 4 – Vertical Speed Indicator (VSI)",
              "Ch 5 – Gyroscope",
              "Ch 6 – Inertial Navigation",
              "Ch 7 – Altitude Alert Systems",
              "Ch 8 – Power Plant and System Monitoring Instruments",
              "Ch 9 – Basics of Electronic Displays",
            ],
          },
          {
            name: "Redbird",
            hasQuiz: true,
            quizSource: "redbird-inst" as const,
            subChapters: [
              "Pressure Instruments",
              "Gyro Instruments",
              "Magnetic Instruments",
            ],
          },
          {
            name: "Oxford",
            hasQuiz: true,
            quizSource: "oxford-inst" as const,
            subChapters: [
              "Ch 1 – Pressure Heads",
              "Ch 2 – Air Temperature Measurement",
              "Ch 3 – Gyroscopes",
              "Ch 4 – Directional Gyro Indicator (DGI)",
              "Ch 5 – Artificial Horizon",
              "Ch 6 – EFIS",
              "Ch 7 – AFCS Revision Paper 1",
              "Ch 8 – AFCS Revision Paper 2",
              "Ch 9 – EICAS & ECAM",
            ],
          },
          "Keith William",
        ],
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
      {
        title: "Question Bank",
        chapters: ["Question Bank-1"],
        hasQuiz: true,
        quizSource: "sk-met" as const,
      },
    ],
  },
  {
    title: "Air Regulations",
    subtopics: [
      {
      title: "R K Bali",
        hasQuiz: true,
        quizSource: "rkbali-reg" as const,
        chapters: [
          "Ch 1 – Definitions And Abbreviations",
          "Ch 2 – International Organisations and Conventions",
          "Ch 3 – Aircraft Nationality and Registration Marks",
          "Ch 4 – Rules of the Air",
          "Ch 5 – Air Traffic Services",
          "Ch 6 – Separation Methods and Minima",
          "Ch 7 – Separation in the Vicinity of Aerodromes",
          "Ch 8 – Procedures for Aerodrome Control Service",
          "Ch 9 – Use of Air Traffic Services Surveillance System",
          "Ch 10 – Aeronautical Information Services",
          "Ch 11 – Search and Rescue",
          "Ch 12 – Visual Aids for Navigation",
          "Ch 13 – Procedures for Air Navigation Services Aircraft Operations",
          "Ch 14 – National Law",
          "Ch 15 – Personnel Licensing",
          "Ch 16 – Airworthiness of Aircraft",
          "Ch 17 – Operational Procedures",
          "Ch 18 – Special Operational Procedures and Hazards (General Aspects)",
          "Ch 19 – Communications",
          "Ch 20 – Aircraft Accident and Incident",
          "Ch 21 – Facilitation",
          "Ch 22 – Security - Safeguarding International Civil Aviation against Acts of Unlawful Interference",
          "Ch 23 – Human Performance and Limitations",
          "Ch 24 – CRM, TEM and LOFT",
          "Ch 25 – Aviation Psychology and Human Factors",
          "Ch 26 – Aviation Physiology and Human Factors",
          "Ch 27 – Additional Practice Questions: Human Factors",
        ],
      },
      {
        title: "Sample Question Papers",
        hasQuiz: true,
        quizSource: "rkbali-samples" as const,
        chapters: [
          "Sample Paper 1", "Sample Paper 2", "Sample Paper 3", "Sample Paper 4", 
          "Sample Paper 5", "Sample Paper 6", "Sample Paper 7", "Sample Paper 8", 
          "Sample Paper 9", "Sample Paper 10", "Sample Paper 11", "Sample Paper 12", 
          "Sample Paper 13", "Sample Paper 14", "Sample Paper 15", "Sample Paper 16"
        ],
      },
      {
        title: "Redbird Question Bank",
        hasQuiz: true,
        quizSource: "redbird-airreg" as const,
        chapters: [
          "Redbird Question Bank",
        ],
      },
      {
        title: "Additional Questions",
        hasQuiz: true,
        quizSource: "sk-reg-additional" as const,
        chapters: [
          "Additional Questions",
        ],
      },
    ],
  },
  {
    title: "Technical General",
    subtopics: [
      {
        title: "Question Bank",
        chapters: [
          "Question Bank-1",
          "Question Bank-2",
          "Question Bank-3",
          "Question Bank-4",
          "Question Bank-5",
        ],
        hasQuiz: true,
        quizSource: "redbird-tech",
      },
    ],
  },
  {
    title: "Technical Specific",
    subtopics: [
      {
        title: "Cessna 172R",
        chapters: [
          "Cessna 172R",
        ],
        hasQuiz: true,
        quizSource: "cessna-172r",
      },
      {
        title: "Cessna 152",
        chapters: [
          "Cessna 152",
        ],
        hasQuiz: true,
        quizSource: "cessna-152",
      },
      {
        title: "Piper Archer III DX",
        chapters: [
          "Piper Archer III DX",
        ],
        hasQuiz: true,
        quizSource: "piper-archer",
      },
      {
        title: "DA 40 (Thielert)",
        chapters: [
          "DA 40 (Thielert)",
        ],
        hasQuiz: true,
        quizSource: "da-40",
      },
      {
        title: "DA 42 (Thielert)",
        chapters: [
          "DA 42 (Thielert)",
        ],
        hasQuiz: true,
        quizSource: "da-42",
      },
      {
        title: "PA-34-220T",
        chapters: [
          "PA-34-220T",
        ],
        hasQuiz: true,
        quizSource: "pa-34-220t",
      },
      {
        title: "TECHNAM P2006T",
        chapters: [
          "TECHNAM P2006T",
        ],
        hasQuiz: true,
        quizSource: "tecnam-p2006t",
      },
      {
        title: "TECHNAM P2008JC",
        chapters: [
          "TECHNAM P2008JC",
        ],
        hasQuiz: true,
        quizSource: "tecnam-p2008jc",
      },
      {
        title: "DA42 Austro",
        chapters: [
          "DA42 Austro",
        ],
        hasQuiz: true,
        quizSource: "da-42-austro",
      },
    ],
  },
  {
    title: "RTR",
    subtopics: [
      {
        title: "RTR Part 1 Question Bank",
        chapters: ["Question Bank-1", "Question Bank-2", "Question Bank-3", "Question Bank-4"],
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
      {
        title: "Radio Telephony Paper 6",
        chapters: ["Paper 6 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 7",
        chapters: ["Paper 7 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 8",
        chapters: ["Paper 8 – Full Practice Set"],
      },
    ],
  },
  {
    title: "RTR Part 2 (DGCA) Practice with Live ATC",
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
      {
        title: "Radio Telephony Paper 6",
        chapters: ["Paper 6 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 7",
        chapters: ["Paper 7 – Full Practice Set"],
      },
      {
        title: "Radio Telephony Paper 8",
        chapters: ["Paper 8 – Full Practice Set"],
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
  const [openBook, setOpenBook] = useState<string | null>(null);
  const [hasRtr2Access, setHasRtr2Access] = useState<boolean | null>(null);
  const [hasLiveAtcAccess, setHasLiveAtcAccess] = useState<boolean | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showLiveAtcUpgrade, setShowLiveAtcUpgrade] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setHasRtr2Access(false); setHasLiveAtcAccess(false); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (roles && roles.length > 0) { setHasRtr2Access(true); setHasLiveAtcAccess(true); return; }
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("plan, status, expires_at, amount")
        .eq("user_id", user.id)
        .eq("status", "approved");
      const activeSubs = subs?.filter(s => s.expires_at && new Date(s.expires_at) > new Date()) ?? [];
      const hasRtr2 = activeSubs.some(s => s.plan === "3_months");
      const hasLiveAtc = activeSubs.some(s => s.plan === "live_atc_3_months");
      setHasRtr2Access(hasRtr2);
      setHasLiveAtcAccess(hasLiveAtc);
    };
    checkAccess();
  }, []);

  const toggleSubject = (title: string, e: React.MouseEvent) => {
    const scrollY = window.scrollY;
    setOpenSubject(openSubject === title ? null : title);
    setOpenSubtopic(null);
    setOpenBook(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
    });
  };

  const toggleSubtopic = (title: string, e: React.MouseEvent) => {
    const scrollY = window.scrollY;
    setOpenSubtopic(openSubtopic === title ? null : title);
    setOpenBook(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
    });
  };

  const normalizeChapterLabel = (value: string) =>
    value
      .replace(/\([^)]*\)/g, "")
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const getNestedTopicSource = (quizSource?: SubTopic["quizSource"]) => {
    if (quizSource === "rkbali-gennav") return rkBaliGenNavTopics;
    if (quizSource === "rkbali-inst") return rkBaliInstrumentTopics;
    if (quizSource === "rkbali-radnav") return rkBaliRadioNavTopics;
    if (quizSource === "oxford-gennav") return oxfordGenNavTopics;
    if (quizSource === "kw-gennav") return keithWilliamGenNavTopics;
    if (quizSource === "redbird-gennav") return redbirdGenNavTopics;
    if (quizSource === "redbird-radnav") return redbirdRadioNavTopics;
    if (quizSource === "redbird-inst") return redbirdInstTopics;
    if (quizSource === "oxford-radnav") return oxfordRadioNavTopics;
    if (quizSource === "oxford-inst") return oxfordInstNavTopics;
    if (quizSource === "redbird-tech") return [redbirdTechGeneralTopic, skTechQB2Topic, skTechQB3Topic, skTechQB4Topic, skTechQB5Topic];
    if (quizSource === "cessna-172r") return [cessna172RTopic];
    if (quizSource === "cessna-152") return [cessna152Topic];
    if (quizSource === "piper-archer") return [piperArcherTopic];
    if (quizSource === "da-40") return [da40Topic];
    if (quizSource === "da-42") return [da42Topic];
    if (quizSource === "pa-34-220t") return [pa34220tTopic];
    if (quizSource === "tecnam-p2006t") return [tecnamP2006tTopic];
    if (quizSource === "tecnam-p2008jc") return [tecnamP2008jcTopic];
    if (quizSource === "da-42-austro") return [da42AustroTopic];
    if (quizSource === "sk-reg-additional") return [skRegAdditionalTopic];
    return [];
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
          {subjectsData.filter((subject) => {
            // Live ATC is an add-on only for ₹999 (3_months) users or those who already have it
            if (subject.title === "RTR Part 2 (DGCA) Practice with Live ATC") {
              return hasRtr2Access || hasLiveAtcAccess;
            }
            return true;
          }).map((subject) => {
            const isSubjectOpen = openSubject === subject.title;

            return (
              <div key={subject.title} className="glass-card overflow-hidden">
                {/* Subject Header */}
                <button
                  onClick={(e) => toggleSubject(subject.title, e)}
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
                            onClick={(e) => toggleSubtopic(subtopic.title, e)}
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
                                // Handle expandable book chapters
                                if (typeof chapter === "object" && "subChapters" in chapter) {
                                  const bookChapter = chapter as ChapterWithSubs;
                                  const bookKey = `${subject.title}::${subtopic.title}::${bookChapter.name}`;
                                  const isBookOpen = openBook === bookKey;
                                  return (
                                    <div key={bookKey}>
                                      <button
                                        onClick={() => {
                                          const sy = window.scrollY;
                                          setOpenBook(isBookOpen ? null : bookKey);
                                          requestAnimationFrame(() => window.scrollTo({ top: sy }));
                                        }}
                                        className="w-full flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary py-1.5 px-3 rounded-md hover:bg-primary/5 transition-colors duration-200 text-left"
                                      >
                                        <ChevronRight
                                          className={`w-3 h-3 text-primary/60 transition-transform duration-300 flex-shrink-0 ${
                                            isBookOpen ? "rotate-90 text-primary" : ""
                                          }`}
                                        />
                                        {bookChapter.name}
                                      </button>
                                      <motion.div
                                        initial={false}
                                        animate={{
                                          height: isBookOpen ? "auto" : 0,
                                          opacity: isBookOpen ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <div className="pl-8 flex flex-col gap-0.5">
                                          {bookChapter.subChapters.map((sub) => {
                                            const subTopicSource = getNestedTopicSource(bookChapter.quizSource);
                                            const normalizedSub = normalizeChapterLabel(sub);
                                            const subQuizTopic = bookChapter.hasQuiz
                                              ? subTopicSource.find((t) => normalizeChapterLabel(t.title) === normalizedSub)
                                              : null;
                                            return (
                                              <button
                                                key={sub}
                                                onClick={() => {
                                                  if (subQuizTopic) navigate(`/topics/${subQuizTopic.id}`);
                                                }}
                                                className={`text-xs sm:text-sm text-muted-foreground hover:text-primary py-1.5 px-3 rounded-md hover:bg-primary/5 transition-colors duration-200 block text-left ${subQuizTopic ? "cursor-pointer" : "cursor-default"}`}
                                              >
                                                {sub}
                                                {subQuizTopic && (
                                                  <span className="ml-2 text-[10px] text-primary/60">({subQuizTopic.questions.length} MCQs)</span>
                                                )}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    </div>
                                  );
                                }

                                const chapterName = chapter as string;
                                const topicSource = subtopic.quizSource === "oxford" ? oxfordMetTopics : subtopic.quizSource === "rtr" ? [...rtrTopics, rtrQuestionBank1Topic, rtrQuestionBank2Topic, rtrQuestionBank3Topic, rtrQuestionBank4Topic] : subtopic.quizSource === "rkbali-reg" ? rkBaliRegTopics : subtopic.quizSource === "rkbali-samples" ? rkBaliSamplePapers : subtopic.quizSource === "sk-met" ? skMetTopics : subtopic.quizSource === "rkbali-gennav" ? rkBaliGenNavTopics : subtopic.quizSource === "rkbali-radnav" ? rkBaliRadioNavTopics : subtopic.quizSource === "rkbali-inst" ? rkBaliInstrumentTopics : subtopic.quizSource === "oxford-radnav" ? oxfordRadioNavTopics : subtopic.quizSource === "oxford-inst" ? oxfordInstNavTopics : subtopic.quizSource === "redbird-radnav" ? redbirdRadioNavTopics : subtopic.quizSource === "redbird-inst" ? redbirdInstTopics : subtopic.quizSource === "redbird-tech" ? [redbirdTechGeneralTopic, skTechQB2Topic, skTechQB3Topic, skTechQB4Topic, skTechQB5Topic] : subtopic.quizSource === "redbird-gennav" ? redbirdGenNavTopics : subtopic.quizSource === "redbird-airreg" ? [redbirdAirRegTopic] : subtopic.quizSource === "sk-reg-additional" ? [skRegAdditionalTopic] : subtopic.quizSource === "cessna-172r" ? [cessna172RTopic] : subtopic.quizSource === "cessna-152" ? [cessna152Topic] : subtopic.quizSource === "piper-archer" ? [piperArcherTopic] : subtopic.quizSource === "da-40" ? [da40Topic] : subtopic.quizSource === "da-42" ? [da42Topic] : subtopic.quizSource === "pa-34-220t" ? [pa34220tTopic] : subtopic.quizSource === "tecnam-p2006t" ? [tecnamP2006tTopic] : subtopic.quizSource === "tecnam-p2008jc" ? [tecnamP2008jcTopic] : subtopic.quizSource === "da-42-austro" ? [da42AustroTopic] : icJoshiTopics;
                                const quizTopic = subtopic.hasQuiz
                                  ? topicSource.find((t) => t.title === chapterName)
                                  : null;
                                
                                // Check for content pages (non-quiz chapters)
const contentPageMap: Record<string, string> = {
                                  "Ch 1 – Broad Guidelines, Syllabus, Radio Telephone Restricted Licence Examination": "/rtr-chapter/rtr-ch1",
                                  "Ch 2 – Definitions Related with Annex-10": "/rtr-chapter/rtr-ch2",
                                   "Ch 3 – Definitions Related with DOC 4444, DOC 9432, AIP": "/rtr-chapter/rtr-ch3",
                                 "Ch 18 – INS – Inertial Navigation System": "/rtr-chapter/rtr-ch18",
                                   "Ch 22 – Squelch, Microphones & Headphones": "/rtr-chapter/rtr-ch22",
                                   "Met Instruments": "/rtr-chapter/icj-met-instruments",
                                  "Paper 1 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-1" : "/rtr2-exam/rtr2-paper-1",
                                   "Paper 2 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-2" : "/rtr2-exam/rtr2-paper-2",
                                   "Paper 3 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-3" : "/rtr2-exam/rtr2-paper-3",
                                   "Paper 4 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-4" : "/rtr2-exam/rtr2-paper-4",
                                   "Paper 5 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-5" : "/rtr2-exam/rtr2-paper-5",
                                   "Paper 6 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-6" : "/rtr2-exam/rtr2-paper-6",
                                    "Paper 7 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-7" : "/rtr2-exam/rtr2-paper-7",
                                    "Paper 8 – Full Practice Set": subject.title.includes("Live ATC") ? "/live-atc-exam/rtr2-paper-8" : "/rtr2-exam/rtr2-paper-8",
                                 };
                                const contentLink = contentPageMap[chapterName];
                                const isClickable = !!quizTopic || !!contentLink;

                                return (
                                  <button
                                    key={chapterName}
                                    onClick={() => {
                                      if (contentLink) {
                                    if (contentLink.startsWith("/live-atc-exam/") && !hasLiveAtcAccess) {
                                          setShowLiveAtcUpgrade(true);
                                          return;
                                        }
                                        if (contentLink.startsWith("/rtr2-exam/") && !hasRtr2Access) {
                                          setShowUpgrade(true);
                                          return;
                                        }
                                        navigate(contentLink);
                                      } else if (quizTopic) navigate(`/topics/${quizTopic.id}`);
                                    }}
                                    className={`text-xs sm:text-sm text-muted-foreground hover:text-primary py-1.5 px-3 rounded-md hover:bg-primary/5 transition-colors duration-200 block text-left ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                                  >
                                    {chapterName}
                                    {contentLink?.startsWith("/live-atc-exam/") && !hasLiveAtcAccess && (
                                      <Lock className="inline w-3 h-3 ml-1.5 text-muted-foreground" />
                                    )}
                                    {contentLink?.startsWith("/rtr2-exam/") && !hasRtr2Access && (
                                      <Lock className="inline w-3 h-3 ml-1.5 text-muted-foreground" />
                                    )}
                                    {contentLink && !contentLink.startsWith("/rtr2-exam/") && (
                                      <span className="ml-2 text-[10px] text-primary/60">(Notes)</span>
                                    )}
                                    {quizTopic && !contentLink && (
                                      <span className="ml-2 text-[10px] text-primary/60">({quizTopic.questions.length} MCQs)</span>
                                    )}
                                    {!quizTopic && !contentLink && subtopic.hasQuiz && (
                                      <span className="ml-2 text-[10px] text-muted-foreground/70">(No MCQs yet)</span>
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
      <RtrUpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} onSuccess={() => setHasRtr2Access(true)} />
      <LiveAtcUpgradeDialog open={showLiveAtcUpgrade} onOpenChange={setShowLiveAtcUpgrade} onSuccess={() => setHasLiveAtcAccess(true)} />
    </section>
  );
};

export default SubjectCards;
