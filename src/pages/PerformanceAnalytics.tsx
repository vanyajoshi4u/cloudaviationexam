import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface SubjectStat {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  attempts: number;
  accuracy: number;
}

const PerformanceAnalytics = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<SubjectStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallAccuracy, setOverallAccuracy] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", user.id);

    if (error || !data) {
      setLoading(false);
      return;
    }

    // Group by subject
    const subjectMap: Record<string, { total: number; correct: number; attempts: number }> = {};

    data.forEach((r: any) => {
      if (!subjectMap[r.subject]) {
        subjectMap[r.subject] = { total: 0, correct: 0, attempts: 0 };
      }
      subjectMap[r.subject].total += r.total_questions;
      subjectMap[r.subject].correct += r.correct_answers;
      subjectMap[r.subject].attempts += 1;
    });

    const subjectStats: SubjectStat[] = Object.entries(subjectMap)
      .map(([subject, s]) => ({
        subject,
        totalQuestions: s.total,
        correctAnswers: s.correct,
        attempts: s.attempts,
        accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
      }))
      .sort((a, b) => b.accuracy - a.accuracy);

    const totalQ = subjectStats.reduce((a, s) => a + s.totalQuestions, 0);
    const totalC = subjectStats.reduce((a, s) => a + s.correctAnswers, 0);

    setOverallAccuracy(totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0);
    setStats(subjectStats);
    setLoading(false);
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 75) return "text-green-500";
    if (acc >= 50) return "text-accent";
    return "text-destructive";
  };

  const getProgressColor = (acc: number) => {
    if (acc >= 75) return "[&>div]:bg-green-500";
    if (acc >= 50) return "[&>div]:bg-accent";
    return "[&>div]:bg-destructive";
  };

  const strengths = stats.filter((s) => s.accuracy >= 70);
  const weaknesses = stats.filter((s) => s.accuracy < 50);

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
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="font-display text-xl sm:text-2xl font-bold">Performance Analytics</h1>
          </div>

          {loading ? (
            <div className="glass-card p-8 text-center text-muted-foreground">Loading...</div>
          ) : stats.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No quiz data yet. Complete quizzes to see your performance breakdown.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Overall Score */}
              <div className="glass-card p-5 text-center">
                <div className={`text-4xl font-bold mb-1 ${getAccuracyColor(overallAccuracy)}`}>
                  {overallAccuracy}%
                </div>
                <p className="text-xs text-muted-foreground">Overall Accuracy</p>
                <div className="flex justify-center gap-6 mt-3 text-xs text-muted-foreground">
                  <span>{stats.reduce((a, s) => a + s.attempts, 0)} quizzes</span>
                  <span>{stats.reduce((a, s) => a + s.totalQuestions, 0)} questions</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium">Strengths</span>
                  </div>
                  {strengths.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {strengths.slice(0, 3).map((s) => (
                        <div key={s.subject} className="text-xs text-green-400 truncate">{s.subject}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Keep practicing!</p>
                  )}
                </div>
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-medium">Needs Work</span>
                  </div>
                  {weaknesses.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {weaknesses.slice(0, 3).map((s) => (
                        <div key={s.subject} className="text-xs text-destructive truncate">{s.subject}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Great work! 🎉</p>
                  )}
                </div>
              </div>

              {/* Subject Breakdown */}
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Subject-wise Breakdown</span>
                </div>
                <div className="flex flex-col gap-3">
                  {stats.map((s) => (
                    <div key={s.subject}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium truncate max-w-[60%]">{s.subject}</span>
                        <span className={`text-xs font-bold ${getAccuracyColor(s.accuracy)}`}>
                          {s.accuracy}%
                        </span>
                      </div>
                      <Progress value={s.accuracy} className={`h-2 ${getProgressColor(s.accuracy)}`} />
                      <div className="flex justify-between mt-0.5">
                        <span className="text-[10px] text-muted-foreground">
                          {s.correctAnswers}/{s.totalQuestions} correct
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {s.attempts} quiz{s.attempts !== 1 ? "zes" : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
