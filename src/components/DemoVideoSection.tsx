import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NARRATION_SEGMENTS = [
  `Welcome to Cloud Aviation Academy — India's first DGCA question bank with a built-in RTR Part 2 simulator.

On this platform, you get access to previous attempt questions across all DGCA subjects.

You can practice in two modes. In Practice Mode, you see the correct answer instantly after each question — learn as you go. In Test Mode, you answer all questions first, then review your results to test your knowledge.`,

  `But what truly sets us apart is the RTR Part 2 DGCA Practice Simulator. Here, you can practice the real-life DGCA examination.

Start the exam.`,

  `The person acting as ATC simply scans the QR code on their phone to see the answers. Use the PTT button, just like in the actual examination. Navigate through each scenario to build your confidence.

Join Cloud Aviation Academy and ace your DGCA exams.`,
];

const SEGMENT_PAUSE_MS = 5000;

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const { toast } = useToast();

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    }
  }, []);

  const handleShare = useCallback(async () => {
    const shareUrl = "https://cloudaviationexam.lovable.app";
    const shareData = {
      title: "Cloud Aviation Academy - RTR Part 2 Simulator Demo",
      text: "Watch how India's first DGCA question bank with a built-in RTR Part 2 simulator works!",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share the link with others.",
        });
      }
    } catch (err) {
      // Fallback if both fail
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share the link with others.",
        });
      } catch {
        toast({
          title: "Share this link",
          description: shareUrl,
        });
      }
    }
  }, [toast]);

  const startBgMusic = useCallback(() => {
    try {
      const audio = new Audio("/bg-music.mp3");
      audio.loop = true;
      audio.volume = 0.08;
      audio.play();
      bgAudioRef.current = audio;
    } catch (err) {
      console.error("Background music error:", err);
    }
  }, []);

  const stopBgMusic = useCallback(() => {
    const audio = bgAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      bgAudioRef.current = null;
    }
  }, []);

  const muteBgMusic = useCallback((muted: boolean) => {
    const audio = bgAudioRef.current;
    if (audio) {
      audio.volume = muted ? 0 : 0.08;
    }
  }, []);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
    // Pre-load voices (some browsers load them async)
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const getBestVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    // Priority order: premium quality voices first
    const priorityNames = [
      "Google UK English Male", "Google UK English Female",
      "Google US English", "Daniel", "Samantha", "Karen",
      "Moira", "Tessa", "Rishi", "Microsoft Mark", "Microsoft David",
      "Microsoft Zira", "Alex"
    ];
    for (const name of priorityNames) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith("en"));
      if (match) return match;
    }
    // Fallback: any English voice
    return voices.find((v) => v.lang.startsWith("en")) || null;
  }, []);

  const createNarrationUtterance = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
    utterance.volume = 1;
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;
    return utterance;
  }, [getBestVoice]);

  const speakNarration = useCallback(() => {
    window.speechSynthesis.cancel();
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    let segmentIndex = 0;

    const speakSegment = (index: number) => {
      if (index >= NARRATION_SEGMENTS.length) return;
      const utterance = createNarrationUtterance(NARRATION_SEGMENTS[index]);
      utterance.onend = () => {
        const nextIndex = index + 1;
        if (nextIndex < NARRATION_SEGMENTS.length) {
          pauseTimerRef.current = setTimeout(() => {
            speakSegment(nextIndex);
          }, SEGMENT_PAUSE_MS);
        }
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    speakSegment(segmentIndex);
  }, [createNarrationUtterance]);

  const cancelNarration = useCallback(() => {
    window.speechSynthesis.cancel();
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      cancelNarration();
      stopBgMusic();
      setIsPlaying(false);
      return;
    }

    video.currentTime = 0;

    // Start background music
    if (!isMuted) {
      startBgMusic();
    }

    // Start browser TTS narration
    if (speechSupported && !isMuted) {
      speakNarration();
    }

    video.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.error("Playback error:", err);
    });

    video.onended = () => {
      cancelNarration();
      stopBgMusic();
      setIsPlaying(false);
    };
  }, [isPlaying, isMuted, speechSupported, cancelNarration, speakNarration, startBgMusic, stopBgMusic]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (next) {
      cancelNarration();
      muteBgMusic(true);
    } else if (isPlaying) {
      if (speechSupported) speakNarration();
      muteBgMusic(false);
    }
  }, [isMuted, isPlaying, speechSupported, cancelNarration, speakNarration, muteBgMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelNarration();
      stopBgMusic();
    };
  }, [cancelNarration, stopBgMusic]);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-lg sm:text-xl font-bold mb-1">
            See How the RTR Part 2 Simulator Works
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Watch the demo with AI narration
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden rounded-xl"
        >
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover bg-black"
              playsInline
              muted
              preload="metadata"
            >
              <source src="/demo-video.mov" type="video/quicktime" />
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>

            {/* Overlay controls */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="rounded-full w-14 h-14 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </Button>
            </div>

            {/* Bottom controls */}
            {isPlaying && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Share button - always visible */}
            <button
              onClick={handleShare}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
