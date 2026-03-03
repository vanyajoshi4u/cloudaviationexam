import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { rtrPart2Papers } from "@/data/rtrPart2Scenarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Timer, AlertTriangle, Trophy, ChevronRight, Lock, X, User, UserRound, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import RtrUpgradeDialog from "@/components/RtrUpgradeDialog";
import VidpAirportLayout from "@/components/VidpAirportLayout";
import airwayChartPaper1 from "@/assets/airway-chart-paper1.png";
import { toast } from "@/hooks/use-toast";

const EXAM_DURATION = 30 * 60;

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

interface ChatMessage {
  role: "pilot" | "atc";
  text: string;
  timestamp: string;
}

const LiveAtcExam = () => {
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

  const [hasRtr2Access, setHasRtr2Access] = useState<boolean | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Live ATC specific state
  const [voiceGender, setVoiceGender] = useState<"male" | "female" | null>(null);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isAtcSpeaking, setIsAtcSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setHasRtr2Access(false); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (roles && roles.length > 0) { setHasRtr2Access(true); return; }
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

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, currentTranscript]);

  const startExam = useCallback(() => {
    setExamStarted(true);
    setTimeLeft(EXAM_DURATION);
    setCurrentScenario(0);
    setExamEnded(false);
    setChatLog([]);
  }, []);

  const endExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    window.speechSynthesis.cancel();
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

  // Speech Recognition setup
  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Speech Recognition not supported", description: "Please use Chrome or Edge browser.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "aborted") {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, []);

  const stopListeningAndProcess = useCallback(async () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);

    const transcript = currentTranscript.trim();
    setCurrentTranscript("");

    if (!transcript) return;

    const scenario = paper!.scenarios[currentScenario];
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Add pilot message
    setChatLog(prev => [...prev, { role: "pilot", text: transcript, timestamp: now }]);

    // Get ATC response
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("atc-response", {
        body: {
          pilotMessage: transcript,
          scenarioId: scenario.id,
          scenarioContext: scenario.scenarioContext,
          flightInfo: scenario.flightInfo,
          frequencies: scenario.frequencies,
          squawk: scenario.squawk,
          currentQuestion: scenario.questions[0] || "General RT communication",
        },
      });

      if (error) throw error;
      const atcText = data?.response || "Say again.";

      setChatLog(prev => [...prev, { role: "atc", text: atcText, timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }]);

      // Speak ATC response
      speakAtcResponse(atcText);
    } catch (err) {
      console.error("ATC response error:", err);
      const fallback = "Station calling, say again.";
      setChatLog(prev => [...prev, { role: "atc", text: fallback, timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }]);
      speakAtcResponse(fallback);
    } finally {
      setIsProcessing(false);
    }
  }, [currentTranscript, currentScenario, paper]);

  const speakAtcResponse = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = voiceGender === "female" ? 1.2 : 0.85;

    // Try to find matching voice
    const voices = window.speechSynthesis.getVoices();
    const targetGender = voiceGender || "male";
    const enVoices = voices.filter(v => v.lang.startsWith("en"));

    // Heuristic: female voices often contain "female", "Samantha", "Victoria", "Karen", "Moira", "Fiona"
    // Male voices: "Daniel", "Alex", "David", "James", "Google UK English Male"
    const femaleNames = ["female", "samantha", "victoria", "karen", "moira", "fiona", "zira", "hazel", "susan"];
    const maleNames = ["male", "daniel", "alex", "david", "james", "google uk english male", "george", "rishi"];

    let selectedVoice = null;
    if (targetGender === "female") {
      selectedVoice = enVoices.find(v => femaleNames.some(n => v.name.toLowerCase().includes(n)));
    } else {
      selectedVoice = enVoices.find(v => maleNames.some(n => v.name.toLowerCase().includes(n)));
    }
    if (!selectedVoice && enVoices.length > 0) {
      selectedVoice = targetGender === "female" ? enVoices[enVoices.length - 1] : enVoices[0];
    }
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onstart = () => setIsAtcSpeaking(true);
    utterance.onend = () => setIsAtcSpeaking(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceGender]);

  // PTT handlers
  const handlePttDown = useCallback(() => {
    if (isProcessing || isAtcSpeaking) return;
    setPttPressed(true);
    startListening();
  }, [isProcessing, isAtcSpeaking, startListening]);

  const handlePttUp = useCallback(() => {
    setPttPressed(false);
    stopListeningAndProcess();
  }, [stopListeningAndProcess]);

  // Load voices
  useEffect(() => {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }, []);

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
            The Live ATC Simulator requires a separate ₹999 plan for 3 months access.
          </p>
          <Button onClick={() => setShowUpgrade(true)} className="font-display">Upgrade Now – ₹350</Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => navigate("/")}>Go Back</Button>
          <RtrUpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} onSuccess={() => setHasRtr2Access(true)} />
        </motion.div>
      </div>
    );
  }

  const scenarios = paper.scenarios;
  const scenario = scenarios[currentScenario];
  const isTimeLow = timeLeft < 300;

  // Voice selection screen
  if (!voiceGender) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex flex-col">
        <div className="container mx-auto px-4 pt-6 max-w-lg">
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 sm:p-10 text-center max-w-lg w-full"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5"
            >
              <Volume2 className="w-8 h-8 text-primary" />
            </motion.div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Live ATC Simulator</h1>
            <p className="text-sm text-muted-foreground mb-2">{paper.title}</p>
            <p className="text-xs text-muted-foreground mb-8">Choose your ATC Examiner voice before starting</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVoiceGender("male")}
                className="glass-panel p-6 rounded-xl border-2 border-transparent hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/25 transition-colors">
                  <User className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm">Male Examiner</h3>
                <p className="text-xs text-muted-foreground mt-1">Deep, authoritative voice</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVoiceGender("female")}
                className="glass-panel p-6 rounded-xl border-2 border-transparent hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-pink-500/15 flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-500/25 transition-colors">
                  <UserRound className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm">Female Examiner</h3>
                <p className="text-xs text-muted-foreground mt-1">Clear, professional voice</p>
              </motion.button>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4 text-left">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <p className="font-bold">Requirements:</p>
                <p>• Use Chrome or Edge browser for best speech recognition</p>
                <p>• Allow microphone access when prompted</p>
                <p>• Press & hold the PTT button while speaking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Pre-exam start screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex flex-col">
        <div className="container mx-auto px-4 pt-6 max-w-lg">
          <button onClick={() => setVoiceGender(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Change Voice
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 sm:p-10 text-center max-w-lg w-full"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5"
            >
              <Mic className="w-8 h-8 text-primary" />
            </motion.div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1.5">{paper.title}</h1>
            <p className="text-sm text-muted-foreground mb-2">Live ATC Simulator</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              {voiceGender === "male" ? <User className="w-3.5 h-3.5" /> : <UserRound className="w-3.5 h-3.5" />}
              {voiceGender === "male" ? "Male" : "Female"} Examiner Selected
            </div>

            <div className="glass-panel px-5 py-4 rounded-xl mb-6 text-sm space-y-3 text-left">
              <div className="flex items-center gap-3">
                <Timer className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Duration: <strong>30 minutes</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Total Scenarios: <strong>{scenarios.length}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-foreground">Voice-activated with Push to Talk</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-foreground">AI ATC will respond with voice</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/8 border border-destructive/15 mb-8 text-left">
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-destructive leading-relaxed">
                Once started, the timer cannot be paused. Speak clearly using proper RT phraseology. The AI ATC will respond based on your transmissions.
              </p>
            </div>

            <Button size="lg" onClick={startExam} className="w-full h-12 text-base font-semibold tracking-wide glow-blue">
              Start Live ATC Exam
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Exam ended
  if (examEnded) {
    const timeTaken = EXAM_DURATION - timeLeft;
    return (
      <div className="min-h-screen bg-gradient-aviation">
        <div className="container mx-auto px-4 py-8 max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 sm:p-8 text-center">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold mb-2">Live ATC Exam Complete</h1>
            <p className="text-muted-foreground mb-6">{paper.title}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{chatLog.filter(m => m.role === "pilot").length}</div>
                <div className="text-xs text-muted-foreground">Transmissions</div>
              </div>
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{formatTime(timeTaken)}</div>
                <div className="text-xs text-muted-foreground">Time Taken</div>
              </div>
            </div>

            {/* Chat transcript */}
            {chatLog.length > 0 && (
              <div className="mb-6 text-left">
                <h3 className="text-sm font-bold text-foreground mb-2">Communication Log</h3>
                <div className="glass-panel rounded-xl p-3 max-h-60 overflow-y-auto space-y-2">
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`text-xs p-2 rounded-lg ${msg.role === "pilot" ? "bg-blue-500/10 text-blue-700 dark:text-blue-300" : "bg-green-500/10 text-green-700 dark:text-green-300"}`}>
                      <span className="font-bold">{msg.role === "pilot" ? "TX (You)" : "RX (ATC)"}:</span> {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Home
              </Button>
              <Button onClick={() => { setVoiceGender(null); setExamStarted(false); setTimeLeft(EXAM_DURATION); setCurrentScenario(0); setExamEnded(false); setChatLog([]); }}>
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
      {/* Title Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-card border-b border-border/40 px-3 py-2 flex items-center justify-between flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            LIVE
          </div>
          <h1 className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-foreground">
            RTR Part 2 — {paper.title} — Scenario {currentScenario + 1}/{scenarios.length}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-1">
            {scenarios.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setCurrentScenario(idx); setChatLog([]); }}
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
          <Button variant="destructive" size="sm" onClick={endExam} className="text-xs h-7 px-3">End Test</Button>
        </div>
      </motion.div>

      {/* Main Content: 2 columns */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT: Chart + Questions */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border/30">
          <div className="flex-1 relative min-h-0">
            <div className="absolute inset-0 flex flex-col">
              <div className="bg-accent/10 border-b border-border/30 px-3 py-1.5 flex-shrink-0">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground text-center">
                  Airway / Aerodrome Charts Section
                </h2>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex-1 bg-muted relative overflow-auto">
                <img src={airwayChartPaper1} alt="Airway Chart" className="w-full h-full object-contain" />
                <motion.button
                  onClick={() => setShowAirportLayout(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="absolute bottom-2 left-2 w-32 h-28 sm:w-40 sm:h-32 border-2 border-border/50 rounded-lg bg-card cursor-pointer transition-shadow hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] overflow-hidden"
                  title="Click to enlarge Airport Layout"
                >
                  <div className="w-full h-full p-1">
                    <VidpAirportLayout />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Questions */}
          <div className="flex-shrink-0 border-t border-border/30 max-h-[35%] overflow-y-auto">
            <div className="bg-primary/8 border-b border-primary/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary text-center">Questions</h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-[320px] lg:w-[380px] flex-shrink-0 flex flex-col min-h-0"
        >
          {/* Flight Info (compact) */}
          <div className="border-b border-border/30 overflow-y-auto max-h-[30%]">
            <div className="bg-primary/15 px-3 py-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary text-center">Flight Information</h2>
            </div>
            <div className="p-2 space-y-0.5 text-[11px]">
              {[
                ["Aircraft", scenario.flightInfo.aircraftId],
                ["Call Sign", scenario.flightInfo.rtCallSign],
                ["Route", scenario.flightInfo.departure + " → " + scenario.flightInfo.destination],
              ].map(([l, v]) => (
                <div key={l} className="flex gap-1">
                  <span className="text-muted-foreground">{l}:</span>
                  <span className="font-semibold text-foreground truncate">{v}</span>
                </div>
              ))}
              <div className="flex gap-2 flex-wrap">
                <span className="text-muted-foreground">RWY: <strong className="text-foreground">{scenario.flightInfo.runwayInUse}</strong></span>
                <span className="text-muted-foreground">FL: <strong className="text-foreground">{scenario.flightInfo.flightLevel}</strong></span>
                <span className="text-muted-foreground">SQK: <strong className="text-destructive">{scenario.squawk}</strong></span>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="border-b border-accent/30 bg-accent/5 py-2 flex justify-center flex-shrink-0">
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className={`font-mono text-2xl font-black tracking-wider ${isTimeLow ? "text-destructive" : "text-foreground"}`}
              style={isTimeLow ? { animation: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" } : undefined}
            >
              {formatTime(timeLeft)}
            </motion.div>
          </div>

          {/* Frequencies */}
          <div className="border-b border-border/30 p-1.5 flex-shrink-0">
            <table className="w-full text-[10px]">
              <tbody>
                {scenario.frequencies.map((f, i) => (
                  <tr key={i} className="border-b border-border/10">
                    <td className="py-0.5 px-1 text-muted-foreground">{f.description}</td>
                    <td className="py-0.5 px-1 text-right font-mono font-semibold text-primary">{f.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chat Log */}
          <div className="flex-1 min-h-0 overflow-y-auto border-b border-border/30 bg-muted/30">
            <div className="bg-green-500/10 border-b border-green-500/20 px-3 py-1">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-1.5">
                <Volume2 className="w-3 h-3" /> Communication Log
              </h2>
            </div>
            <div className="p-2 space-y-1.5">
              {chatLog.length === 0 && !currentTranscript && (
                <p className="text-[10px] text-muted-foreground text-center py-4 italic">
                  Press & hold PTT to transmit. ATC will respond.
                </p>
              )}
              {chatLog.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-[11px] p-2 rounded-lg ${
                    msg.role === "pilot"
                      ? "bg-blue-500/10 border border-blue-500/20 ml-4"
                      : "bg-green-500/10 border border-green-500/20 mr-4"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {msg.role === "pilot" ? (
                      <Mic className="w-3 h-3 text-blue-500" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-green-500" />
                    )}
                    <span className={`font-bold text-[10px] ${msg.role === "pilot" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}>
                      {msg.role === "pilot" ? "TX (Pilot)" : "RX (ATC)"}
                    </span>
                    <span className="text-[9px] text-muted-foreground ml-auto">{msg.timestamp}</span>
                  </div>
                  <p className={`${msg.role === "pilot" ? "text-blue-700 dark:text-blue-300" : "text-green-700 dark:text-green-300"}`}>
                    {msg.text}
                  </p>
                </motion.div>
              ))}
              {currentTranscript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 border-dashed ml-4"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Mic className="w-3 h-3 text-blue-500 animate-pulse" />
                    <span className="font-bold text-[10px] text-blue-500">Listening...</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-300 italic">{currentTranscript}</p>
                </motion.div>
              )}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] p-2 rounded-lg bg-green-500/5 border border-green-500/10 mr-4 flex items-center gap-2"
                >
                  <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-green-600 dark:text-green-400 text-[10px]">ATC processing...</span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* PTT Button */}
          <div className="p-3 flex-shrink-0">
            <motion.button
              onMouseDown={handlePttDown}
              onMouseUp={handlePttUp}
              onMouseLeave={() => { if (pttPressed) handlePttUp(); }}
              onTouchStart={handlePttDown}
              onTouchEnd={handlePttUp}
              disabled={isProcessing || isAtcSpeaking}
              whileTap={{ scale: 0.95 }}
              animate={pttPressed ? {
                boxShadow: "0 0 30px hsl(var(--destructive) / 0.6), 0 0 60px hsl(var(--destructive) / 0.2)",
              } : {
                boxShadow: "0 4px 14px hsl(var(--destructive) / 0.3)",
              }}
              transition={{ duration: 0.1 }}
              className={`
                w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest
                select-none flex items-center justify-center gap-2
                transition-colors duration-100
                ${isProcessing || isAtcSpeaking
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : pttPressed
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-destructive/90 text-destructive-foreground hover:bg-destructive"
                }
              `}
            >
              <Mic className={`w-4 h-4 ${pttPressed ? "animate-pulse" : ""}`} />
              {isAtcSpeaking ? "ATC SPEAKING..." : isProcessing ? "PROCESSING..." : pttPressed ? "TRANSMITTING..." : "PUSH TO TALK"}
            </motion.button>

            {/* Navigation */}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={() => { setCurrentScenario(i => i - 1); setChatLog([]); }} disabled={currentScenario === 0}>
                ← Prev
              </Button>
              {currentScenario < scenarios.length - 1 ? (
                <Button size="sm" className="flex-1 text-xs h-8" onClick={() => { setCurrentScenario(i => i + 1); setChatLog([]); }}>
                  Next →
                </Button>
              ) : (
                <Button variant="destructive" size="sm" className="flex-1 text-xs h-8" onClick={endExam}>
                  Finish
                </Button>
              )}
            </div>

            {/* Mobile scenario dots */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-2">
              {scenarios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentScenario(idx); setChatLog([]); }}
                  className={`w-6 h-6 rounded text-[10px] font-bold border ${
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
        </motion.div>
      </div>

      {/* Airport Layout Modal */}
      <AnimatePresence>
        {showAirportLayout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAirportLayout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-4 border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAirportLayout(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <VidpAirportLayout />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveAtcExam;
