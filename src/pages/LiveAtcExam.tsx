import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { rtrPart2Papers } from "@/data/rtrPart2Scenarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Timer, AlertTriangle, Trophy, ChevronRight, Lock, X, User, UserRound, Volume2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import LiveAtcUpgradeDialog from "@/components/LiveAtcUpgradeDialog";
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
import paper3SolutionPage1 from "@/assets/paper3-solution-page1.jpg";
import paper3SolutionPage2 from "@/assets/paper3-solution-page2.jpg";
import paper3SolutionPage3 from "@/assets/paper3-solution-page3.jpg";

const solutionImagesMap: Record<string, { images: string[]; label: string }> = {
  "rtr2-paper-1": {
    images: [paper1SolutionPage1, paper1SolutionPage2, paper1SolutionPage3, paper1SolutionPage4, paper1SolutionPage5],
    label: "Paper 1",
  },
  "rtr2-paper-2": {
    images: [paper2SolutionPage1, paper2SolutionPage2, paper2SolutionPage3],
    label: "Paper 2",
  },
  "rtr2-paper-3": {
    images: [paper3SolutionPage1, paper3SolutionPage2, paper3SolutionPage3],
    label: "Paper 3",
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
  const [visitedScenarios, setVisitedScenarios] = useState<Set<number>>(new Set([0]));
  const [showSolution, setShowSolution] = useState(false);

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
        .eq("status", "approved");
      const hasAccess = subs?.some(s => 
        s.expires_at && new Date(s.expires_at) > new Date() && 
        s.plan === "live_atc_3_months"
      ) ?? false;
      setHasRtr2Access(hasAccess);
    };
    checkAccess();
  }, []);

  // Scroll not needed during exam - log shown only at end

  const startExam = useCallback(() => {
    setExamStarted(true);
    setTimeLeft(EXAM_DURATION);
    setCurrentScenario(0);
    setExamEnded(false);
    setChatLog([]);
    setVisitedScenarios(new Set([0]));
    setShowSolution(false);
  }, []);

  // Track visited scenarios
  useEffect(() => {
    if (examStarted && !examEnded) {
      setVisitedScenarios(prev => new Set([...prev, currentScenario]));
    }
  }, [currentScenario, examStarted, examEnded]);

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
          paperId: paperId || "",
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
          <Button onClick={() => setShowUpgrade(true)} className="font-display">Upgrade Now – ₹499</Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => navigate("/")}>Go Back</Button>
          <LiveAtcUpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} onSuccess={() => setHasRtr2Access(true)} />
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

            {/* Instructions */}
            <div className="glass-panel px-5 py-4 rounded-xl mb-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">📋 Instructions</h3>
              <ol className="text-xs sm:text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>This exam is <strong className="text-foreground">Artificial Intelligence powered</strong> — AI can make mistakes. Use your own judgement.</li>
                <li>Start your answer by stating the transmitting number, e.g. <strong className="text-foreground">"Transmitting One Alpha…"</strong>, then proceed with your transmission.</li>
                <li>Use standard <strong className="text-foreground">ICAO radiotelephony phraseology</strong> throughout.</li>
              </ol>
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
              <Button onClick={() => { setVoiceGender(null); setExamStarted(false); setTimeLeft(EXAM_DURATION); setCurrentScenario(0); setExamEnded(false); setChatLog([]); setVisitedScenarios(new Set([0])); setShowSolution(false); }}>
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
                <img src={chartImageMap[paperId || ""] || airwayChartPaper1} alt="Airway Chart" className={`w-full h-full object-contain ${paperId === "rtr2-paper-7" ? "object-top" : "object-center"}`} />
                <motion.button
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onClick={() => setShowAirportLayout(true)}
                  whileHover={{ scale: 1.05 }}
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

        {/* RIGHT COLUMN - matches RtrPart2Exam layout */}
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
            {/* Status indicator */}
            <div className="text-center mb-2">
              {isAtcSpeaking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 text-[10px] font-bold">
                  <Volume2 className="w-3 h-3 animate-pulse" /> ATC Speaking...
                </motion.div>
              )}
              {isProcessing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                  <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /> Processing...
                </motion.div>
              )}
              {isListening && currentTranscript && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-blue-600 dark:text-blue-400 italic mt-1 truncate px-2">
                  "{currentTranscript}"
                </motion.div>
              )}
              {!isAtcSpeaking && !isProcessing && !isListening && (
                <p className="text-[10px] text-muted-foreground italic">Hold PTT to transmit</p>
              )}
            </div>

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
                w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest
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
              <VidpAirportLayout {...(paperId === "rtr2-paper-6" ? { runwayLeft: "32", runwayRight: "04", title: "VEBS BHUBANESWAR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-7" ? { standLeft: "12", standRight: "11", taxiwayLeft: "A", holdingPointLabel: "A", title: "VIJP JAIPUR AIRPORT / AERODROME LAYOUT" } : paperId === "rtr2-paper-8" ? { standLeft: "4", standRight: "3", title: "VOHS HYDERABAD AIRPORT / AERODROME LAYOUT" } : {})} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveAtcExam;
