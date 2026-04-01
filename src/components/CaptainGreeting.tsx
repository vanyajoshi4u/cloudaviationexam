import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Plane, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CaptainGreeting = () => {
  const [name, setName] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem("captain_name");
    } catch {
      return null;
    }
  });
  const [needsName, setNeedsName] = useState(false);
  const [inputName, setInputName] = useState("");
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!name);

  useEffect(() => {
    if (name) {
      setLoading(false);
    }
    const fetchName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .single();

      if (data?.full_name && data.full_name.trim()) {
        const n = data.full_name.trim();
        setName(n);
        try { sessionStorage.setItem("captain_name", n); } catch {}
        setLoading(false);
        return;
      }

      const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
      if (metaName && String(metaName).trim()) {
        const n = String(metaName).trim();
        setName(n);
        try { sessionStorage.setItem("captain_name", n); } catch {}
        setLoading(false);
        return;
      }

      setNeedsName(true);
      setLoading(false);
    };
    fetchName();
  }, []);

  const handleSaveName = async () => {
    const trimmed = inputName.trim();
    if (!trimmed) {
      toast.error("Please enter your name");
      return;
    }
    if (!userId) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: trimmed })
        .eq("user_id", userId);

      if (error) throw error;

      setName(trimmed);
      setNeedsName(false);
      toast.success("Welcome aboard, Captain!");
    } catch {
      toast.error("Failed to save name. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (needsName) {
    return (
      <div className="container mx-auto px-4 max-w-lg pt-20 sm:pt-24 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-4 px-5 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              <span className="text-sm font-display font-semibold text-foreground">What should we call you, Captain?</span>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); handleSaveName(); }}
              className="flex gap-2 w-full max-w-xs"
            >
              <Input
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                className="text-sm"
                autoFocus
              />
              <Button type="submit" size="sm" disabled={saving} className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading && !name) {
    return (
      <div className="container mx-auto px-4 max-w-lg pt-20 sm:pt-24 pb-2">
        <div className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10 animate-pulse">
          <div className="w-6 h-6 rounded-full bg-primary/20" />
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-20 rounded bg-muted-foreground/20" />
            <div className="h-5 w-32 rounded bg-primary/20" />
          </div>
        </div>
      </div>
    );
  }

  if (!name) return null;

  const firstName = name.split(" ")[0];

  return (
    <div className="container mx-auto px-4 max-w-lg pt-20 sm:pt-24 pb-2">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            animate={{ 
              x: [0, 8, 0],
              y: [0, -3, 0],
              rotate: [-20, -10, -20]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Plane className="w-6 h-6 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
          </motion.div>
          <div className="relative z-10 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium"
            >
              Welcome aboard
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl font-display font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] tracking-wide"
            >
              Captain {firstName} ✈️
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CaptainGreeting;
