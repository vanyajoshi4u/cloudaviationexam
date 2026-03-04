import { useParams, useNavigate } from "react-router-dom";
import { icJoshiTopics } from "@/data/icJoshiQuestions";
import { oxfordMetTopics } from "@/data/oxfordMetQuestions";
import { rtrTopics } from "@/data/rtrQuestions";
import { rtrQuestionBank1Topic } from "@/data/rtrQuestionBank1";
import { rtrQuestionBank2Topic } from "@/data/rtrQuestionBank2";
import { rtrQuestionBank3Topic } from "@/data/rtrQuestionBank3";
import { rkBaliRegTopics } from "@/data/rkBaliRegQuestions";
import { rkBaliSamplePapers } from "@/data/rkBaliSamplePapers";
import { ArrowLeft, GraduationCap, Dumbbell, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const allTopics = [...icJoshiTopics, ...oxfordMetTopics, ...rtrTopics, rtrQuestionBank1Topic, rtrQuestionBank2Topic, rtrQuestionBank3Topic, ...rkBaliRegTopics, ...rkBaliSamplePapers];

const TopicSelect = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = allTopics.find((t) => t.id === topicId);

  const isOxford = oxfordMetTopics.some((t) => t.id === topicId);
  const isRtr = rtrTopics.some((t) => t.id === topicId);
  const isRtrBank = rtrQuestionBank1Topic.id === topicId || rtrQuestionBank2Topic.id === topicId || rtrQuestionBank3Topic.id === topicId;
  const isRkBaliReg = rkBaliRegTopics.some((t) => t.id === topicId);
  const isRkBaliSample = rkBaliSamplePapers.some((t) => t.id === topicId);
  const subtitle = isRkBaliSample ? "R K Bali — Sample Papers" : isRkBaliReg ? "R K Bali — Air Regulations" : isRtrBank ? "RTR — Question Bank" : isRtr ? "RTR Part 1 (DGCA)" : isOxford ? "Oxford — Air Meteorology" : "I C Joshi — Air Meteorology";

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-aviation">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground tracking-wide">
              {subtitle}
            </span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold mb-2">
            {topic.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {topic.questions.length} questions · Choose your mode
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate(`/quiz/${topic.id}?mode=practice`)}
            className="glass-card p-6 text-left hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Dumbbell className="w-6 h-6 text-primary" />
              <h3 className="font-display text-base font-semibold">Practice Mode</h3>
            </div>
            <p className="text-xs text-muted-foreground pl-9">
              See the correct answer immediately after each question. Learn as you go.
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate(`/quiz/${topic.id}?mode=test`)}
            className="glass-card p-6 text-left hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h3 className="font-display text-base font-semibold">Test Mode</h3>
            </div>
            <p className="text-xs text-muted-foreground pl-9">
              Answer all questions first, then see your results and review at the end.
            </p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelect;
