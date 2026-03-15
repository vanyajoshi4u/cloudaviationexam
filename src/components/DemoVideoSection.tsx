import { useState, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DemoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const { toast } = useToast();

  const loadNarration = useCallback(async () => {
    if (audioLoaded && audioRef.current) return audioRef.current;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-demo-narration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) throw new Error("Failed to generate narration");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setAudioLoaded(true);
      return audio;
    } catch (error) {
      console.error("Narration error:", error);
      toast({
        variant: "destructive",
        title: "Could not load narration",
        description: "Playing video without voiceover.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [audioLoaded, toast]);

  const handlePlayPause = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    // Load narration on first play
    const audio = await loadNarration();

    video.currentTime = 0;
    if (audio) {
      audio.currentTime = 0;
      audio.muted = isMuted;
    }

    try {
      await video.play();
      if (audio) await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback error:", err);
    }

    // Sync end
    video.onended = () => {
      audio?.pause();
      setIsPlaying(false);
    };
  }, [isPlaying, isMuted, loadNarration]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  }, [isMuted]);

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
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.mov" type="video/quicktime" />
            </video>

            {/* Overlay controls */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
              <Button
                onClick={handlePlayPause}
                disabled={isLoading}
                size="lg"
                className="rounded-full w-14 h-14 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isPlaying ? (
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
