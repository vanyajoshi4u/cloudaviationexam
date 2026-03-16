import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Share2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FALLBACK_NARRATION =
  "Welcome to Cloud Aviation Academy. Practice DGCA questions in Practice and Test modes, then train in the RTR Part Two simulator with push to talk and QR answer flow.";

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationBlobUrlRef = useRef<string | null>(null);
  const narrationFetchPromiseRef = useRef<Promise<string> | null>(null);
  const narrationQuotaExhaustedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingNarration, setIsLoadingNarration] = useState(false);
  const { toast } = useToast();

  const fetchNarrationAudio = useCallback(async () => {
    if (narrationBlobUrlRef.current) {
      return narrationBlobUrlRef.current;
    }

    if (narrationQuotaExhaustedRef.current) {
      throw new Error("quota_exceeded");
    }

    if (!narrationFetchPromiseRef.current) {
      narrationFetchPromiseRef.current = (async () => {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-demo-narration`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 429 || errorText.includes("quota_exceeded")) {
            narrationQuotaExhaustedRef.current = true;
          }
          throw new Error(errorText || `Narration fetch failed: ${response.status}`);
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        narrationBlobUrlRef.current = audioUrl;
        return audioUrl;
      })();
    }

    try {
      return await narrationFetchPromiseRef.current;
    } finally {
      narrationFetchPromiseRef.current = null;
    }
  }, []);

  // Pre-fetch narration once per page load
  useEffect(() => {
    fetchNarrationAudio().catch((err) => {
      console.error("Prefetch narration failed:", err);
    });

    return () => {
      if (narrationBlobUrlRef.current) {
        URL.revokeObjectURL(narrationBlobUrlRef.current);
      }
    };
  }, [fetchNarrationAudio]);

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
    const shareUrl = "https://cloudaviationexams.com";
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
        toast({ title: "Link copied!", description: "Share the link with others." });
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link copied!", description: "Share the link with others." });
      } catch {
        toast({ title: "Share this link", description: shareUrl });
      }
    }
  }, [toast]);

  const startBgMusic = useCallback(() => {
    try {
      const audio = new Audio("/bg-music.mp3");
      audio.loop = true;
      audio.volume = 0.08;
      audio.play().catch(() => {
        // Ignore autoplay policy errors silently
      });
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

  const stopNarration = useCallback(() => {
    const audio = narrationAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playFallbackNarration = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(FALLBACK_NARRATION);
    utterance.rate = 0.95;

    const voices = synth.getVoices();
    const maleVoice = voices.find((voice) =>
      /male|alex|daniel|david|george|liam|brian|fred|raj|aarav|mark/i.test(
        `${voice.name} ${voice.voiceURI}`
      )
    );

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    synth.speak(utterance);
  }, []);

  const fetchAndPlayNarration = useCallback(async () => {
    setIsLoadingNarration(true);

    try {
      const audioUrl = await fetchNarrationAudio();
      const audio = narrationAudioRef.current ?? new Audio();
      narrationAudioRef.current = audio;

      audio.src = audioUrl;
      audio.volume = 1;
      audio.currentTime = 0;

      await audio.play();
    } catch (err) {
      console.error("Narration playback error:", err);
      playFallbackNarration();
    } finally {
      setIsLoadingNarration(false);
    }
  }, [fetchNarrationAudio, playFallbackNarration]);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      stopNarration();
      stopBgMusic();
      return;
    }

    video.currentTime = 0;

    if (!isMuted) {
      const narrationAudio = narrationAudioRef.current ?? new Audio();
      narrationAudioRef.current = narrationAudio;

      // Unlock audio in direct user gesture context (iOS/Safari compatibility)
      narrationAudio.play().then(() => {
        narrationAudio.pause();
        narrationAudio.currentTime = 0;
      }).catch(() => {
        // Ignore unlock failures and proceed
      });

      startBgMusic();
      fetchAndPlayNarration();
    }

    video.play().catch((err) => {
      console.error("Playback error:", err);
    });
  }, [isPlaying, isMuted, stopNarration, stopBgMusic, startBgMusic, fetchAndPlayNarration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      stopNarration();
      stopBgMusic();
      setIsPlaying(false);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [stopNarration, stopBgMusic]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);

    if (next) {
      stopNarration();
      if (bgAudioRef.current) bgAudioRef.current.volume = 0;
    } else if (isPlaying) {
      fetchAndPlayNarration();
      if (bgAudioRef.current) bgAudioRef.current.volume = 0.08;
    }
  }, [isMuted, isPlaying, stopNarration, fetchAndPlayNarration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarration();
      stopBgMusic();
    };
  }, [stopNarration, stopBgMusic]);

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
              preload="auto"
              poster="/placeholder.svg"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay controls */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
              <Button
                onClick={handlePlayPause}
                size="lg"
                disabled={!isPlaying && isLoadingNarration}
                className="rounded-full w-14 h-14 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
              >
                {isLoadingNarration ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isPlaying ? (
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
