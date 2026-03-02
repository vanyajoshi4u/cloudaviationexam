import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { rtrPart2Papers } from "@/data/rtrPart2Scenarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Timer, AlertTriangle, Trophy, ChevronRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import RtrUpgradeDialog from "@/components/RtrUpgradeDialog";
import VidpAirportLayout from "@/components/VidpAirportLayout";

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

  const [hasRtr2Access, setHasRtr2Access] = useState<boolean | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setHasRtr2Access(false); return; }

      // Check admin
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (roles && roles.length > 0) { setHasRtr2Access(true); return; }

      // Check for active 3_months subscription
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("plan, status, expires_at")
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
            The RTR Part-2 (DGCA) Practice Simulator requires a separate ₹350 plan for 3 months access. Your current subscription does not include this module.
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
      <div className="min-h-screen bg-gradient-aviation">
        <div className="container mx-auto px-4 py-8 max-w-lg">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 sm:p-8 text-center"
          >
            <Timer className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-display text-xl sm:text-2xl font-bold mb-2">{paper.title}</h1>
            <p className="text-sm text-muted-foreground mb-1">RTR Part 2 (DGCA) Practice</p>
            <div className="glass-panel px-4 py-3 rounded-xl my-6 text-sm space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary" />
                <span>Duration: <strong>30 minutes</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" />
                <span>Total Scenarios: <strong>6</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-destructive" />
                <span>PTT button available for practice</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-6 text-left">
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-xs text-destructive">
                Once started, the timer cannot be paused. You can only end the test by clicking "End Test".
              </p>
            </div>
            <Button size="lg" onClick={startExam} className="w-full">
              Start Examination
            </Button>
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
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Home
              </Button>
              <Button onClick={() => { setExamStarted(false); setTimeLeft(EXAM_DURATION); setCurrentScenario(0); setExamEnded(false); }}>
                Retry
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── LIVE EXAM SCREEN (single-screen layout matching reference) ───
  return (
    <div className="h-screen bg-[hsl(var(--background))] flex flex-col overflow-hidden">
      {/* ── Title Bar ── */}
      <div className="bg-[hsl(var(--card))] border-b border-border/40 px-3 py-2 flex items-center justify-between flex-shrink-0">
        <h1 className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-foreground">
          RTR Part 2 — {paper.title} — Scenario {currentScenario + 1} of {scenarios.length}
        </h1>
        <div className="flex items-center gap-2">
          {/* Scenario dots */}
          <div className="hidden sm:flex gap-1">
            {scenarios.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentScenario(idx)}
                className={`w-6 h-6 rounded text-[10px] font-bold border transition-all ${
                  idx === currentScenario
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <Button variant="destructive" size="sm" onClick={endExam} className="text-xs h-7 px-3">
            End Test
          </Button>
        </div>
      </div>

      {/* ── Main Content: 2-column layout ── */}
      <div className="flex-1 flex min-h-0">
        {/* ── LEFT COLUMN: Chart + Questions ── */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border/30">
          {/* Airway / Aerodrome Chart Section */}
          <div className="flex-1 relative min-h-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="bg-accent/10 border-b border-border/30 px-3 py-1.5 flex-shrink-0">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-accent text-center">
                  Airway / Aerodrome Charts Section
                </h2>
              </div>
              <div className="flex-1 flex items-center justify-center bg-[hsl(var(--muted))] relative overflow-hidden p-4">
                {paperId === "rtr2-paper-1" ? (
                  <VidpAirportLayout />
                ) : (
                  <div className="text-center text-muted-foreground/50 p-4">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-xs font-medium">Airway Chart</p>
                    <p className="text-[10px]">Map will be added here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Questions Section (bottom of left column) */}
          <div className="flex-shrink-0 border-t border-border/30 max-h-[40%] overflow-y-auto">
            <div className="bg-green-500/10 border-b border-green-500/20 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-green-500 text-center">
                Questions
              </h2>
            </div>
            <div className="p-3 space-y-2">
              {scenario.scenarioContext && (
                <p className="text-xs sm:text-sm text-accent font-semibold italic pb-2 border-b border-border/20">
                  {scenario.scenarioContext}
                </p>
              )}
              {scenario.questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {String.fromCharCode(97 + i)}
                  </span>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">{q}</p>
                </div>
              ))}
              <p className="text-[10px] text-muted-foreground italic pt-1 border-t border-border/20">
                Write your RT phraseology response for each question.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Flight Info + Timer + Frequencies + PTT ── */}
        <div className="w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col min-h-0 overflow-y-auto">
          {/* Flight Information */}
          <div className="border-b border-border/30">
            <div className="bg-primary/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary text-center">
                Flight Information
              </h2>
            </div>
            <div className="p-3 space-y-1.5 text-xs">
              {[
                ["Aircraft Identification", scenario.flightInfo.aircraftId],
                ["Type of Aircraft", scenario.flightInfo.aircraftType],
                ["RT Call Sign", scenario.flightInfo.rtCallSign],
                ["Registration", scenario.flightInfo.registration],
                ["Departure Aerodrome", scenario.flightInfo.departure],
                ["Destination Aerodrome", scenario.flightInfo.destination],
                ["ATS Route", scenario.flightInfo.atsRoute],
                ["Stand No", scenario.flightInfo.standNo],
                ["Runway in Use", scenario.flightInfo.runwayInUse],
                ["Taxiway", scenario.flightInfo.taxiway],
                ["Flight Level", scenario.flightInfo.flightLevel],
                ["Alternate Airdrome", scenario.flightInfo.alternateAirdrome],
                ["POB - Persons on Board", scenario.flightInfo.pob],
                ["Endurance", scenario.flightInfo.endurance],
                ["Exercise Start Time", scenario.flightInfo.exerciseStartTime],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-1">
                  <span className="text-muted-foreground whitespace-nowrap">{label} —</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="border-b border-border/30">
            <div className="bg-accent/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-accent text-center">
                Timer
              </h2>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className={`font-mono text-4xl sm:text-5xl font-black tracking-wider ${isTimeLow ? "text-destructive animate-pulse" : "text-foreground"}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Frequencies & Squawk */}
          <div className="border-b border-border/30">
            <div className="bg-accent/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-accent text-center">
                Frequencies & Squawk
              </h2>
            </div>
            <div className="p-2">
              <table className="w-full text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left py-1 px-2 font-bold text-foreground">Description</th>
                    <th className="text-right py-1 px-2 font-bold text-foreground">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.frequencies.map((f, i) => (
                    <tr key={i} className="border-b border-border/15">
                      <td className="py-1 px-2 text-foreground">{f.description}</td>
                      <td className="py-1 px-2 text-right font-mono font-semibold text-primary">{f.frequency}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/20">
                    <td className="py-1.5 px-2 font-bold text-foreground">SQUAWK</td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-destructive text-sm">{scenario.squawk}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PTT Button */}
          <div className="p-3 border-b border-border/30">
            <button
              onMouseDown={() => setPttPressed(true)}
              onMouseUp={() => setPttPressed(false)}
              onMouseLeave={() => setPttPressed(false)}
              onTouchStart={() => setPttPressed(true)}
              onTouchEnd={() => setPttPressed(false)}
              className={`
                w-full py-3 rounded-lg font-bold text-xs uppercase tracking-widest
                transition-all duration-100 select-none
                flex items-center justify-center gap-2
                ${pttPressed
                  ? "bg-destructive text-destructive-foreground shadow-[0_0_20px_hsl(var(--destructive)/0.5)] scale-95"
                  : "bg-destructive/90 text-destructive-foreground hover:bg-destructive shadow-lg"
                }
              `}
            >
              <Mic className={`w-4 h-4 ${pttPressed ? "animate-pulse" : ""}`} />
              {pttPressed ? "TRANSMITTING..." : "PUSH TO TALK"}
            </button>
          </div>

          {/* Scenario Navigation */}
          <div className="p-3 mt-auto flex-shrink-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={() => setCurrentScenario((i) => i - 1)}
                disabled={currentScenario === 0}
              >
                ← Previous
              </Button>
              {currentScenario < scenarios.length - 1 ? (
                <Button
                  size="sm"
                  className="flex-1 text-xs h-8"
                  onClick={() => setCurrentScenario((i) => i + 1)}
                >
                  Next Scenario →
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs h-8"
                  onClick={endExam}
                >
                  Finish Test
                </Button>
              )}
            </div>
            {/* Mobile scenario dots */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-2">
              {scenarios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentScenario(idx)}
                  className={`w-6 h-6 rounded text-[10px] font-bold border transition-all ${
                    idx === currentScenario
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/50 text-muted-foreground"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RtrPart2Exam;
