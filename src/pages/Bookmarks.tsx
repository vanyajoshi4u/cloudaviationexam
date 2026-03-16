import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Bookmark, StickyNote, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface BookmarkRow {
  id: string;
  topic_id: string;
  question_id: number;
  note: string;
  created_at: string;
}

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("bookmarked_questions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setBookmarks(data as BookmarkRow[]);
    setLoading(false);
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from("bookmarked_questions")
      .delete()
      .eq("id", id);

    if (!error) {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Bookmark removed");
    }
  };

  // Group by topic
  const grouped = bookmarks.reduce<Record<string, BookmarkRow[]>>((acc, b) => {
    if (!acc[b.topic_id]) acc[b.topic_id] = [];
    acc[b.topic_id].push(b);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-aviation">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <Bookmark className="w-6 h-6 text-primary" />
            <h1 className="font-display text-xl sm:text-2xl font-bold">My Bookmarks</h1>
          </div>

          {loading ? (
            <div className="glass-card p-8 text-center text-muted-foreground">Loading...</div>
          ) : bookmarks.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Bookmark className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No bookmarks yet. Bookmark questions during quizzes to review them here.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {Object.entries(grouped).map(([topicId, items]) => (
                <div key={topicId} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-primary capitalize">
                      {topicId.replace(/-/g, " ")}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/quiz/${topicId}?mode=practice`)}
                      className="text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Practice
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {items.map((b) => (
                      <div key={b.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/20">
                        <span className="text-xs font-medium text-muted-foreground mt-0.5">Q{b.question_id}</span>
                        <div className="flex-1 min-w-0">
                          {b.note && (
                            <div className="flex items-start gap-1.5 text-xs text-foreground">
                              <StickyNote className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                              <span>{b.note}</span>
                            </div>
                          )}
                          {!b.note && (
                            <span className="text-xs text-muted-foreground italic">No note added</span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteBookmark(b.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Bookmarks;
