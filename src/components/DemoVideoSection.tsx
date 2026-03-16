import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CACHE_BUST = Date.now().toString();

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  // ── Play narration from local MP3 ──
  const playNarration = useCallback(() => {
    const audio = new Audio(`/narration.mp3?${CACHE_BUST}`);
    audio.volume = 1;
    audio.play().catch((e) => console.warn("Narration play failed:", e));
    narrationAudioRef.current = audio;
  }, []);

  const stopNarration = useCallback(() => {
    const a = narrationAudioRef.current;
    if (a) { a.pause(); a.currentTime = 0; narrationAudioRef.current = null; }
  }, []);

  // ── Background music helpers ──
  const startBgMusic = useCallback(() => {
    try {
      const audio = new Audio(`/bg-music.mp3?${CACHE_BUST}`);
      audio.loop = true;
      audio.volume = 0.08;
      audio.play().catch(() => {});
      bgAudioRef.current = audio;
    } catch {}
  }, []);

  const stopBgMusic = useCallback(() => {
    const a = bgAudioRef.current;
    if (a) { a.pause(); a.currentTime = 0; bgAudioRef.current = null; }
  }, []);

  // ── Play / Pause ──
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
    video.play().catch(console.error);

    if (!isMuted) {
      startBgMusic();
      playNarration();
    }
  }, [isPlaying, isMuted, stopNarration, stopBgMusic, startBgMusic, playNarration]);

  // ── Sync state with video events ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { stopNarration(); stopBgMusic(); setIsPlaying(false); };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [stopNarration, stopBgMusic]);

  // ── Mute toggle ──
  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);

    if (next) {
      stopNarration();
      if (bgAudioRef.current) bgAudioRef.current.volume = 0;
    } else if (isPlaying) {
      playNarration();
      if (bgAudioRef.current) bgAudioRef.current.volume = 0.08;
    }
  }, [isMuted, isPlaying, stopNarration, playNarration]);

  // ── Fullscreen ──
  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if ((video as any).webkitEnterFullscreen) (video as any).webkitEnterFullscreen();
  }, []);

  // ── Share ──
  const handleShare = useCallback(async () => {
    const url = "https://cloudaviationexams.com";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Cloud Aviation Academy Demo", text: "Watch the RTR Part 2 simulator demo!", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied!", description: "Share the link with others." });
      }
    } catch {
      toast({ title: "Share this link", description: url });
    }
  }, [toast]);

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
            >
              <source src={`/demo-video-v5.mp4?${CACHE_BUST}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause overlay */}
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

            {/* Share */}
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
