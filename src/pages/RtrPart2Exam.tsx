import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { rtrPart2Papers } from "@/data/rtrPart2Scenarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Timer, AlertTriangle, Trophy, ChevronRight, Lock, X, FileText, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import RtrUpgradeDialog from "@/components/RtrUpgradeDialog";
import VidpAirportLayout from "@/components/VidpAirportLayout";
import airwayChartPaper1 from "@/assets/airway-chart-paper1.png";
import atsRouteDelhiLucknow from "@/assets/ats-route-delhi-lucknow.png";
import atsRouteJabalpurIndore from "@/assets/ats-route-jabalpur-indore.png";
import atsRouteAmritsarDelhi from "@/assets/ats-route-amritsar-delhi.png";
import atsRouteMumbaiGoa from "@/assets/ats-route-mumbai-goa.png";
import atsRouteRanchiRaipur from "@/assets/ats-route-ranchi-raipur.png";
import atsRouteBhubaneswarNagpur from "@/assets/ats-route-bhubaneswar-nagpur.png";
import atsRouteJaipurAhmedabad from "@/assets/ats-route-jaipur-ahmedabad.png";
import atsRouteHyderabadChennai from "@/assets/ats-route-hyderabad-chennai.png";
import paper1SolutionPage1 from "@/assets/paper1-solution-page1.jpg";
import paper1SolutionPage2 from "@/assets/paper1-solution-page2.jpg";
import paper1SolutionPage3 from "@/assets/paper1-solution-page3.jpg";
import paper1SolutionPage4 from "@/assets/paper1-solution-page4.jpg";
import paper1SolutionPage5 from "@/assets/paper1-solution-page5.jpg";
import paper2SolutionPage1 from "@/assets/paper2-solution-page1.jpg";
import paper2SolutionPage2 from "@/assets/paper2-solution-page2.jpg";
import paper2SolutionPage3 from "@/assets/paper2-solution-page3.jpg";

const solutionImagesMap: Record<string, { images: string[]; label: string }> = {
  "rtr2-paper-1": {
    images: [paper1SolutionPage1, paper1SolutionPage2, paper1SolutionPage3, paper1SolutionPage4, paper1SolutionPage5],
    label: "Paper 1",
  },
  "rtr2-paper-2": {
    images: [paper2SolutionPage1, paper2SolutionPage2, paper2SolutionPage3],
    label: "Paper 2",
  },
};

const chartImageMap: Record<string, string> = {
  "rtr2-paper-1": atsRouteDelhiLucknow,
  "rtr2-paper-2": atsRouteJabalpurIndore,
  "rtr2-paper-3": atsRouteAmritsarDelhi,
  "rtr2-paper-4": atsRouteMumbaiGoa,
  "rtr2-paper-5": atsRouteRanchiRaipur,
  "rtr2-paper-6": atsRouteBhubaneswarNagpur,
  "rtr2-paper-7": atsRouteJaipurAhmedabad,
  "rtr2-paper-8": atsRouteHyderabadChennai,
};


const EXAM_DURATION = 30 * 60;

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const RtrPart2Exam = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const paper = rtrPart2Papers.find((p) => p.id === paperId);

  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [examEnded, setExamEnded] = useState(false);
  const [pttPressed, setPttPressed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showAirportLayout, setShowAirportLayout] = useState(false);
  const [visitedScenarios, setVisitedScenarios] = useState<Set<number>>(new Set([0]));
  const [showSolution, setShowSolution] = useState(false);
  const [showQrPopup, setShowQrPopup] = useState(false);

  const [hasRtr2Access, setHasRtr2Access] = useState<boolean | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setHasRtr2Access(false); return; }

      // Check admin
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (roles && roles.length > 0) { setHasRtr2Access(true); return; }

      // Check for active 3_months/999 subscription (RTR Part-2 access)
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("plan, amount, status, expires_at")
        .eq("user_id", user.id)
        .eq("plan", "3_months")
        .eq("status", "approved");

      const hasAccess = subs?.some(s => s.expires_at && new Date(s.expires_at) > new Date()) ?? false;
      setHasRtr2Access(hasAccess);
    };
    checkAccess();
  }, []);

  const startExam = useCallback(() => {
    setExamStarted(true);
    setTimeLeft(EXAM_DURATION);
    setCurrentScenario(0);
    setExamEnded(false);
    setVisitedScenarios(new Set([0]));
    setShowSolution(false);
  }, []);

  const endExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamEnded(true);
  }, []);

  useEffect(() => {
    if (!examStarted || examEnded) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setExamEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examEnded]);

  // Track visited scenarios
  useEffect(() => {
    if (examStarted && !examEnded) {
      setVisitedScenarios(prev => new Set([...prev, currentScenario]));
    }
  }, [currentScenario, examStarted, examEnded]);

  if (!paper) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Paper not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Access gate: loading or no access
  if (hasRtr2Access === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasRtr2Access) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">RTR Part-2 Access Required</h2>
          <p className="text-muted-foreground text-sm mb-4">
            The RTR Part-2 (DGCA) Practice Simulator requires a separate ₹999 plan for 3 months access. Your current subscription does not include this module.
          </p>
          <Button onClick={() => setShowUpgrade(true)} className="font-display">
            Upgrade Now – ₹350
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => navigate("/")}>
            Go Back
          </Button>
          <RtrUpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} onSuccess={() => setHasRtr2Access(true)} />
        </motion.div>
      </div>
    );
  }

  const scenarios = paper.scenarios;
  const scenario = scenarios[currentScenario];
  const isTimeLow = timeLeft < 300;

  // Pre-exam start screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex flex-col">
        <div className="container mx-auto px-4 pt-6 max-w-lg">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card p-8 sm:p-10 text-center max-w-lg w-full"
          >
            {/* Stopwatch icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5"
            >
              <Timer className="w-8 h-8 text-primary" />
            </motion.div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1.5">{paper.title}</h1>
            <p className="text-sm text-muted-foreground mb-8">RTR Part 2 (DGCA) Practice</p>

            {/* Info block */}
            <div className="glass-panel px-5 py-4 rounded-xl mb-6 text-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <Timer className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Duration: <strong className="text-foreground">30 minutes</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Total Scenarios: <strong className="text-foreground">{scenarios.length}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-foreground">PTT button available for practice</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="glass-panel px-5 py-4 rounded-xl mb-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">📋 Instructions</h3>
              <ol className="text-xs sm:text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>This exam is <strong className="text-foreground">Artificial Intelligence powered</strong> — AI can make mistakes. Use your own judgement.</li>
                <li>Start your answer by stating the transmitting number, e.g. <strong className="text-foreground">"Transmitting One Alpha…"</strong>, then proceed with your transmission.</li>
                <li>Use standard <strong className="text-foreground">ICAO radiotelephony phraseology</strong> throughout.</li>
              </ol>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/8 border border-destructive/15 mb-8 text-left">
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-destructive leading-relaxed">
                Once started, the timer cannot be paused. You can only end the test by clicking "End Test".
              </p>
            </div>

            {/* Start button */}
            <Button
              size="lg"
              onClick={() => {
                if (paperId && solutionImagesMap[paperId]) {
                  setShowQrPopup(true);
                } else {
                  startExam();
                }
              }}
              className="w-full h-12 text-base font-semibold tracking-wide glow-blue"
            >
              Start Examination
            </Button>

            {/* QR Code Popup */}
            <AnimatePresence>
              {showQrPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={() => { setShowQrPopup(false); startExam(); }}
                >
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-border/50 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-foreground mb-1">ATC Examiner Answer Sheet</h2>
                    <p className="text-xs text-muted-foreground mb-4">
                      Scan this QR code on the ATC examiner's phone to view the answer key
                    </p>
                    <div className="inline-block bg-white p-3 rounded-xl shadow-sm mb-4">
                      <QRCodeSVG
                        value={`https://cloudaviationexam.lovable.app/atc-answer/${paperId}`}
                        size={160}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-5">
                      For the person acting as ATC examiner only
                    </p>
                    <Button
                      size="lg"
                      onClick={() => { setShowQrPopup(false); startExam(); }}
                      className="w-full h-11 text-sm font-semibold glow-blue"
                    >
                      Continue & Start Exam
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // Exam ended screen
  if (examEnded) {
    const timeTaken = EXAM_DURATION - timeLeft;
    return (
      <div className="min-h-screen bg-gradient-aviation">
        <div className="container mx-auto px-4 py-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 sm:p-8 text-center"
          >
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold mb-2">Examination Complete</h1>
            <p className="text-muted-foreground mb-6">{paper.title}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{currentScenario + 1}/6</div>
                <div className="text-xs text-muted-foreground">Scenarios Viewed</div>
              </div>
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{formatTime(timeTaken)}</div>
                <div className="text-xs text-muted-foreground">Time Taken</div>
              </div>
            </div>

            {paperId && solutionImagesMap[paperId] && (
              <div className="mb-4">
                {visitedScenarios.size >= scenarios.length ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      <FileText className="w-4 h-4" /> {showSolution ? "Hide Solution" : `View Solution — ${solutionImagesMap[paperId].label}`}
                    </Button>
                    <AnimatePresence>
                      {showSolution && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3 overflow-hidden"
                        >
                          {solutionImagesMap[paperId].images.map((img, idx) => (
                            <img key={idx} src={img} alt={`${solutionImagesMap[paperId].label} Solution — Page ${idx + 1}`} className="w-full rounded-lg border border-border/50 shadow-md" />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Solution not visible because you haven't attempted paper properly. Please go through all {scenarios.length} scenarios to unlock the solution.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Home
              </Button>
              <Button onClick={() => { setExamStarted(false); setTimeLeft(EXAM_DURATION); setCurrentScenario(0); setExamEnded(false); setVisitedScenarios(new Set([0])); setShowSolution(false); }}>
                Retry
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── LIVE EXAM SCREEN ───
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
  const fadeUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Title Bar ── */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-card border-b border-border/40 px-3 py-2 flex items-center justify-between flex-shrink-0"
      >
        <h1 className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-foreground">
          RTR Part 2 — {paper.title} — Scenario {currentScenario + 1} of {scenarios.length}
        </h1>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-1">
            {scenarios.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentScenario(idx)}
                className={`w-7 h-7 rounded-md text-[10px] font-bold border transition-all duration-200 ${
                  idx === currentScenario
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)]"
                    : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {idx + 1}
              </motion.button>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="destructive" size="sm" onClick={endExam} className="text-xs h-7 px-3">
              End Test
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Main Content: 2-column layout ── */}
      <div className="flex-1 flex min-h-0">
        {/* ── LEFT COLUMN: Chart + Questions ── */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border/30">
          {/* Airway / Aerodrome Chart Section */}
          <div className="flex-1 relative min-h-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="bg-accent/10 border-b border-border/30 px-3 py-1.5 flex-shrink-0">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground text-center">
                  Airway / Aerodrome Charts Section
                </h2>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 bg-muted relative overflow-auto"
              >
                <img src={chartImageMap[paperId || ""] || airwayChartPaper1} alt="Airway Chart" className={`w-full h-full object-contain ${paperId === "rtr2-paper-7" ? "object-top" : "object-center"}`} />
                <motion.button
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onClick={() => setShowAirportLayout(true)}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                  whileTap={{ scale: 0.97 }}
                  className="absolute bottom-2 left-2 w-32 h-28 sm:w-40 sm:h-32 border-2 border-border/50 rounded-lg bg-card cursor-grab active:cursor-grabbing transition-shadow hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] overflow-hidden z-10"
                  title="Drag to move · Click to enlarge"
                >
                  <div className="w-full h-full p-1 pointer-events-none">
                    <VidpAirportLayout {...(paperId === "rtr2-paper-6" ? { runwayLeft: "32", runwayRight: "04", title: "VEBS BHUBANESWAR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-7" ? { standLeft: "12", standRight: "11", taxiwayLeft: "A", holdingPointLabel: "A", title: "VIJP JAIPUR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-8" ? { standLeft: "4", standRight: "3", title: "VOHS HYDERABAD AIRPORT / AERODROME LAYOUT" } : {})} />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="flex-shrink-0 border-t border-border/30 max-h-[40%] overflow-y-auto">
            <div className="bg-primary/8 border-b border-primary/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary text-center">
                Questions
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-3 space-y-2"
              >
                {scenario.scenarioContext && (
                  <p className="text-xs sm:text-sm text-foreground font-semibold italic pb-2 border-b border-border/20">
                    {scenario.scenarioContext}
                  </p>
                )}
                <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                  {scenario.questions.map((q, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {String.fromCharCode(97 + i)}
                      </span>
                      <p className="text-xs sm:text-sm text-foreground leading-relaxed">{q}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-[10px] text-muted-foreground italic pt-1 border-t border-border/20">
                  Write your RT phraseology response for each question.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col min-h-0"
        >
          {/* Scrollable: Flight Info + ATIS */}
          <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Flight Information */}
          <div className="border-b border-border/30">
            <div className="bg-primary/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary text-center">
                Flight Information
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="p-3 space-y-1 text-xs"
              >
                {[
                  ["Aircraft Identification", scenario.flightInfo.aircraftId],
                  ["Type of Aircraft", scenario.flightInfo.aircraftType],
                  ["RT Call Sign", scenario.flightInfo.rtCallSign],
                  ["Registration", scenario.flightInfo.registration],
                  ["Departure Aerodrome", scenario.flightInfo.departure],
                  ["Destination Aerodrome", scenario.flightInfo.destination],
                  ["ATS Route", scenario.flightInfo.atsRoute],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-1">
                    <span className="text-muted-foreground whitespace-nowrap">{label} —</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex gap-1"><span className="text-muted-foreground">Stand —</span><span className="font-semibold text-foreground">{scenario.flightInfo.standNo}</span></div>
                  <div className="flex gap-1"><span className="text-muted-foreground">RWY —</span><span className="font-semibold text-foreground">{scenario.flightInfo.runwayInUse}</span></div>
                  <div className="flex gap-1"><span className="text-muted-foreground">TWY —</span><span className="font-semibold text-foreground">{scenario.flightInfo.taxiway}</span></div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <div className="flex gap-1"><span className="text-muted-foreground">FL —</span><span className="font-semibold text-foreground">{scenario.flightInfo.flightLevel}</span></div>
                  <div className="flex gap-1"><span className="text-muted-foreground">POB —</span><span className="font-semibold text-foreground">{scenario.flightInfo.pob}</span></div>
                </div>
                {[
                  ["Alternate Airdrome", scenario.flightInfo.alternateAirdrome],
                  ["Endurance", scenario.flightInfo.endurance],
                  ["Exercise Start Time", scenario.flightInfo.exerciseStartTime],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-1">
                    <span className="text-muted-foreground whitespace-nowrap">{label} —</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ATIS/METAR Information */}
          <div className="border-b border-border/30">
            <div className="bg-amber-500/10 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 text-center">
                ATIS/METAR Information "{scenario.atisInfo.designator}"
              </h2>
            </div>
            <div className="p-2 space-y-0.5 text-[11px]">
              {[
                ["Time of Observation", scenario.atisInfo.timeOfObservation],
                ["Runway in Use", scenario.atisInfo.runwayInUse],
                ["Wind", scenario.atisInfo.wind],
                ["Visibility", scenario.atisInfo.visibility],
                ["Clouds", scenario.atisInfo.clouds],
                ["Temperature", scenario.atisInfo.temperature],
                ["Dewpoint", scenario.atisInfo.dewpoint],
                ["QNH", scenario.atisInfo.qnh],
                ...(scenario.atisInfo.remarks ? [["Remarks", scenario.atisInfo.remarks]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex gap-1">
                  <span className="text-muted-foreground whitespace-nowrap">{label} —</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>

          </div>

          </div>


          {/* Fixed bottom: Timer + Frequencies + PTT + Nav */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="border-y border-accent/30 bg-accent/5 p-3 flex justify-center"
          >
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
              className={`font-mono text-3xl sm:text-4xl font-black tracking-wider ${isTimeLow ? "text-destructive" : "text-foreground"}`}
              style={isTimeLow ? { animation: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" } : undefined}
            >
              {formatTime(timeLeft)}
            </motion.div>
          </motion.div>

          {/* Frequencies & Squawk */}
          <div className="border-b border-border/30 p-2">
            <table className="w-full text-[11px] sm:text-xs">
              <thead>
                <tr className="bg-primary/10">
                  <th className="text-left py-1 px-2 font-bold text-foreground">Description</th>
                  <th className="text-right py-1 px-2 font-bold text-foreground">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {scenario.frequencies.map((f, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.04, duration: 0.25 }}
                    className="border-b border-border/15"
                  >
                    <td className="py-1 px-2 text-foreground">{f.description}</td>
                    <td className="py-1 px-2 text-right font-mono font-semibold text-primary">{f.frequency}</td>
                  </motion.tr>
                ))}
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="bg-accent/20"
                >
                  <td className="py-1.5 px-2 font-bold text-foreground">SQUAWK</td>
                  <td className="py-1.5 px-2 text-right font-mono font-black text-destructive text-sm">{scenario.squawk}</td>
                </motion.tr>
              </tbody>
            </table>
          </div>

          {/* PTT Button */}
          <div className="p-3 border-b border-border/30">
            <motion.button
              onMouseDown={() => setPttPressed(true)}
              onMouseUp={() => setPttPressed(false)}
              onMouseLeave={() => setPttPressed(false)}
              onTouchStart={() => setPttPressed(true)}
              onTouchEnd={() => setPttPressed(false)}
              whileTap={{ scale: 0.95 }}
              animate={pttPressed ? {
                boxShadow: "0 0 30px hsl(var(--destructive) / 0.6), 0 0 60px hsl(var(--destructive) / 0.2)",
              } : {
                boxShadow: "0 4px 14px hsl(var(--destructive) / 0.3)",
              }}
              transition={{ duration: 0.1 }}
              className={`
                w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest
                select-none flex items-center justify-center gap-2
                transition-colors duration-100
                ${pttPressed
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-destructive/90 text-destructive-foreground hover:bg-destructive"
                }
              `}
            >
              <Mic className={`w-4 h-4 ${pttPressed ? "animate-pulse" : ""}`} />
              {pttPressed ? "TRANSMITTING..." : "PUSH TO TALK"}
            </motion.button>
          </div>

          {/* Scenario Navigation */}
          <div className="p-3 mt-auto flex-shrink-0">
            <div className="flex gap-2">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs h-9"
                  onClick={() => setCurrentScenario((i) => i - 1)}
                  disabled={currentScenario === 0}
                >
                  ← Previous
                </Button>
              </motion.div>
              {currentScenario < scenarios.length - 1 ? (
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    className="w-full text-xs h-9"
                    onClick={() => setCurrentScenario((i) => i + 1)}
                  >
                    Next Scenario →
                  </Button>
                </motion.div>
              ) : (
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-xs h-9"
                    onClick={endExam}
                  >
                    Finish Test
                  </Button>
                </motion.div>
              )}
            </div>
            {/* Mobile scenario dots */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-2">
              {scenarios.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setCurrentScenario(idx)}
                  className={`w-6 h-6 rounded text-[10px] font-bold border transition-all duration-200 ${
                    idx === currentScenario
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                      : "border-border/50 text-muted-foreground"
                  }`}
                >
                  {idx + 1}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Airport Layout Fullscreen Modal */}
      <AnimatePresence>
        {showAirportLayout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAirportLayout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-4 border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAirportLayout(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center transition-colors hover:bg-destructive/80"
              >
                <X className="w-4 h-4" />
              </motion.button>
              <VidpAirportLayout {...(paperId === "rtr2-paper-6" ? { runwayLeft: "32", runwayRight: "04", title: "VEBS BHUBANESWAR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-7" ? { standLeft: "12", standRight: "11", taxiwayLeft: "A", holdingPointLabel: "A", title: "VIJP JAIPUR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-8" ? { standLeft: "4", standRight: "3", title: "VOHS HYDERABAD AIRPORT / AERODROME LAYOUT" } : {})} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RtrPart2Exam;
