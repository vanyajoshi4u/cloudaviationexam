import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NARRATION_SCRIPT = `Welcome to Cloud Aviation Academy — India's first DGCA question bank with a built-in RTR Part 2 simulator.

On this platform, you get access to previous attempt questions across all DGCA subjects.

You can practice in two modes. In Practice Mode, you see the correct answer instantly after each question — learn as you go. In Test Mode, you answer all questions first, then review your results to test your knowledge.

But what truly sets us apart is the RTR Part 2 DGCA Practice Simulator. Here, you can practice the real-life DGCA examination.

Start the exam. The person acting as ATC simply scans the QR code on their phone to see the answers. Use the PTT button, just like in the actual examination. Navigate through each scenario to build your confidence.

Join Cloud Aviation Academy and ace your DGCA exams.`;

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
  }, []);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    video.currentTime = 0;

    // Start browser TTS narration
    if (speechSupported && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = createNarrationUtterance();
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    video.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.error("Playback error:", err);
    });

    video.onended = () => {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    };
  }, [isPlaying, isMuted, speechSupported]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (next) {
      window.speechSynthesis.cancel();
    } else if (isPlaying && speechSupported) {
      // Resume narration from scratch when unmuting (browser TTS can't resume mid-sentence)
      const utterance = new SpeechSynthesisUtterance(NARRATION_SCRIPT);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google") || v.name.includes("Daniel") || v.name.includes("Samantha"))
      ) || voices.find((v) => v.lang.startsWith("en"));
      if (preferred) utterance.voice = preferred;
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted, isPlaying, speechSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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

            {/* Mute toggle */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
