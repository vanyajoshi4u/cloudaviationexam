import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NARRATION_TEXT =
  "Welcome to Cloud Aviation Academy. Practice DGCA questions in Practice and Test modes, then train in the RTR Part Two simulator with push to talk and QR answer flow.";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const narrationBlobUrlRef = useRef<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  // ── Fetch & cache ElevenLabs narration (George voice) ──
  const fetchNarrationBlob = useCallback(async (): Promise<string | null> => {
    // Return cached blob URL if available
    if (narrationBlobUrlRef.current) return narrationBlobUrlRef.current;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/generate-demo-narration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!res.ok) {
        console.warn("Narration edge function returned", res.status);
        return null;
      }

      const contentType = res.headers.get("Content-Type") || "";
      if (!contentType.includes("audio")) {
        console.warn("Narration response was not audio, falling back");
        return null;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      narrationBlobUrlRef.current = url;
      return url;
    } catch (e) {
      console.warn("Failed to fetch narration:", e);
      return null;
    }
  }, []);

  // ── Play narration: try ElevenLabs first, fallback to speechSynthesis ──
  const playNarration = useCallback(async () => {
    // Try ElevenLabs George voice via edge function
    const blobUrl = await fetchNarrationBlob();
    if (blobUrl) {
      const audio = new Audio(blobUrl);
      audio.volume = 1;
      try {
        await audio.play();
        narrationAudioRef.current = audio;
        return;
      } catch (e) {
        console.warn("ElevenLabs audio play failed:", e);
      }
    }

    // Fallback: browser speechSynthesis with male voice
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(NARRATION_TEXT);
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    const voices = synth.getVoices();
    const maleVoice = voices.find((v) =>
      /male|alex|daniel|david|george|liam|brian|fred|raj|aarav|mark|rishi|mohan/i.test(
        `${v.name} ${v.voiceURI}`
      )
    );
    if (maleVoice) utterance.voice = maleVoice;
    synth.speak(utterance);
  }, [fetchNarrationBlob]);

  const stopNarration = useCallback(() => {
    // Stop ElevenLabs audio
    const a = narrationAudioRef.current;
    if (a) { a.pause(); a.currentTime = 0; narrationAudioRef.current = null; }
    // Stop speechSynthesis fallback
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  // ── Background music helpers ──
  const startBgMusic = useCallback(() => {
    try {
      const audio = new Audio("/bg-music.mp3");
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

  // Preload voices for fallback
  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarration();
      stopBgMusic();
      if (narrationBlobUrlRef.current) {
        URL.revokeObjectURL(narrationBlobUrlRef.current);
      }
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
              <source src="/demo-video.mov" type="video/quicktime" />
              <source src="/demo-video.mp4" type="video/mp4" />
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
