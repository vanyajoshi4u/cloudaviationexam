import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { rtrPart2Papers, RtrScenario } from "@/data/rtrPart2Scenarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Mic, Timer, AlertTriangle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXAM_DURATION = 30 * 60; // 30 minutes in seconds

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const FlightInfoPanel = ({ scenario }: { scenario: RtrScenario }) => (
  <div className="glass-card p-4 border-l-4 border-l-primary">
    <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
      Flight Information
    </h3>
    <div className="space-y-1.5 text-xs sm:text-sm">
      <div><span className="text-muted-foreground">Aircraft ID:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.aircraftId}</span></div>
      <div><span className="text-muted-foreground">Type of A/C:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.aircraftType}</span></div>
      <div><span className="text-muted-foreground">Departure:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.departure}</span></div>
      <div><span className="text-muted-foreground">Route:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.route}</span></div>
      <div><span className="text-muted-foreground">Destination:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.destination}</span></div>
      <div><span className="text-muted-foreground">Other Info:</span> <span className="font-semibold text-foreground">{scenario.flightInfo.otherInfo}</span></div>
    </div>
  </div>
);

const FrequenciesPanel = ({ scenario }: { scenario: RtrScenario }) => (
  <div className="glass-card p-4 border-l-4 border-l-accent">
    <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
      Frequencies & Squawk
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="text-left py-1.5 text-muted-foreground font-medium">Description</th>
            <th className="text-right py-1.5 text-muted-foreground font-medium">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {scenario.frequencies.map((f, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="py-1.5 text-foreground">{f.description}</td>
              <td className="py-1.5 text-right font-mono font-semibold text-primary">{f.frequency}</td>
            </tr>
          ))}
          <tr className="bg-destructive/10">
            <td className="py-1.5 font-bold text-foreground">SQUAWK</td>
            <td className="py-1.5 text-right font-mono font-bold text-destructive text-base">{scenario.squawk}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const QuestionsPanel = ({ scenario }: { scenario: RtrScenario }) => (
  <div className="glass-card p-4 border-l-4 border-l-green-500">
    <h3 className="text-xs font-bold uppercase tracking-wider text-green-500 mb-3">
      Questions / Scenarios
    </h3>
    <div className="space-y-3">
      {scenario.questions.map((q, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-xs font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-foreground leading-relaxed">{q}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-3 border-t border-border/30">
      <p className="text-xs text-muted-foreground italic">
        Write your RT phraseology response for each question above.
      </p>
    </div>
  </div>
);

const PttButton = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`
        w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest
        transition-all duration-150 select-none
        flex items-center justify-center gap-2
        ${pressed
          ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-95"
          : "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/30"
        }
      `}
    >
      <Mic className={`w-5 h-5 ${pressed ? "animate-pulse" : ""}`} />
      {pressed ? "TRANSMITTING..." : "PUSH TO TALK"}
    </button>
  );
};

const RtrPart2Exam = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const paper = rtrPart2Papers.find((p) => p.id === paperId);

  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [examEnded, setExamEnded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
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

  const scenarios = paper.scenarios;
  const scenario = scenarios[currentScenario];
  const isTimeLow = timeLeft < 300; // less than 5 min

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
                <Mic className="w-4 h-4 text-red-500" />
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

  // Live exam screen
  return (
    <div className="min-h-screen bg-gradient-aviation">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Top bar: timer + end test */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`glass-panel px-4 py-2 rounded-xl flex items-center gap-2 ${isTimeLow ? "border-destructive/50 animate-pulse" : ""}`}>
              <Timer className={`w-4 h-4 ${isTimeLow ? "text-destructive" : "text-primary"}`} />
              <span className={`font-mono text-lg font-bold ${isTimeLow ? "text-destructive" : "text-foreground"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Scenario {currentScenario + 1} of {scenarios.length}
            </span>
          </div>
          <Button variant="destructive" size="sm" onClick={endExam}>
            End Test
          </Button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="font-display text-base sm:text-lg font-bold">{paper.title}</h1>
          <p className="text-xs text-muted-foreground">RTR Part 2 (DGCA) — Live Examination</p>
        </div>

        {/* Scenario content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <div className="glass-card p-3 sm:p-4 mb-4 text-center">
              <h2 className="font-display text-sm sm:text-base font-bold text-primary">
                Scenario {currentScenario + 1}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <FlightInfoPanel scenario={scenario} />
              <FrequenciesPanel scenario={scenario} />
            </div>

            <QuestionsPanel scenario={scenario} />
          </motion.div>
        </AnimatePresence>

        {/* PTT Button */}
        <div className="mt-4">
          <PttButton />
        </div>

        {/* Scenario navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentScenario((i) => i - 1)}
            disabled={currentScenario === 0}
          >
            Previous Scenario
          </Button>

          {currentScenario < scenarios.length - 1 ? (
            <Button size="sm" onClick={() => setCurrentScenario((i) => i + 1)}>
              Next Scenario <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" variant="destructive" onClick={endExam}>
              Finish & End Test
            </Button>
          )}
        </div>

        {/* Scenario dots */}
        <div className="flex justify-center gap-2 mt-4">
          {scenarios.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentScenario(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-medium border transition-all ${
                idx === currentScenario
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/40 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RtrPart2Exam;
