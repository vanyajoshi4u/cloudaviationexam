import { useParams, useNavigate } from "react-router-dom";
import { icJoshiTopics } from "@/data/icJoshiQuestions";
import { oxfordMetTopics } from "@/data/oxfordMetQuestions";
import { rtrTopics } from "@/data/rtrQuestions";
import { rtrQuestionBank1Topic } from "@/data/rtrQuestionBank1";
import { rtrQuestionBank2Topic } from "@/data/rtrQuestionBank2";
import { rtrQuestionBank3Topic } from "@/data/rtrQuestionBank3";
import { rtrQuestionBank4Topic } from "@/data/rtrQuestionBank4";
import { skMetTopics } from "@/data/skMetQuestions";
import { redbirdTechGeneralTopic } from "@/data/redbirdTechGeneralQuestions";
import { skTechQB2Topic } from "@/data/skTechQB2Questions";
import { skTechQB3Topic } from "@/data/skTechQB3Questions";
import { skTechQB4Topic } from "@/data/skTechQB4Questions";
import { oxfordGenNavTopics } from "@/data/oxfordGenNavQuestions";
import { keithWilliamGenNavTopics } from "@/data/keithWilliamGenNavQuestions";
import { keithWilliamInstTopics } from "@/data/keithWilliamInstQuestions";
import { keithWilliamRadioNavTopics } from "@/data/keithWilliamRadioNavQuestions";
import { redbirdGenNavTopics } from "@/data/redbirdGenNavQuestions";
import { redbirdRadioNavTopics } from "@/data/redbirdRadioNavQuestions";
import { redbirdInstTopics } from "@/data/redbirdInstQuestions";
import { oxfordRadioNavTopics } from "@/data/oxfordRadioNavQuestions";
import { oxfordInstNavTopics } from "@/data/oxfordInstNavQuestions";
import { redbirdAirRegTopic } from "@/data/redbirdAirRegQuestions";
import { skTechQB5Topic } from "@/data/skTechQB5Questions";
import { cessna172RTopic } from "@/data/cessna172RQuestions";
import { cessna152Topic } from "@/data/cessna152Questions";
import { piperArcherTopic } from "@/data/piperArcherQuestions";
import { da42Topic } from "@/data/da42Questions";
import { da40Topic } from "@/data/da40Questions";
import { pa34220tTopic } from "@/data/pa34220tQuestions";
import { tecnamP2006tTopic } from "@/data/tecnamP2006tQuestions";
import { tecnamP2008jcTopic } from "@/data/tecnamP2008jcQuestions";
import { da42AustroTopic } from "@/data/da42AustroQuestions";
import { skRegAdditionalTopic } from "@/data/skRegQuestions";
import { dgcaPreviousMetTopics } from "@/data/dgcaPreviousMetQuestions";
import { dgcaPreviousNavTopics } from "@/data/dgcaPreviousNavQuestions";
import { dgcaPreviousRegTopics } from "@/data/dgcaPreviousRegQuestions";
import { dgcaPreviousTechTopics } from "@/data/dgcaPreviousTechQuestions";
import { rtrPreviousAttemptTopics } from "@/data/rtrPreviousAttemptQuestions";
import { ArrowLeft, GraduationCap, Dumbbell, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const allTopics = [...icJoshiTopics, ...oxfordMetTopics, ...rtrTopics, rtrQuestionBank1Topic, rtrQuestionBank2Topic, rtrQuestionBank3Topic, rtrQuestionBank4Topic, ...skMetTopics, redbirdTechGeneralTopic, skTechQB2Topic, skTechQB3Topic, skTechQB4Topic, skTechQB5Topic, ...oxfordGenNavTopics, ...keithWilliamGenNavTopics, ...keithWilliamInstTopics, ...keithWilliamRadioNavTopics, ...redbirdGenNavTopics, ...redbirdRadioNavTopics, ...redbirdInstTopics, ...oxfordRadioNavTopics, ...oxfordInstNavTopics, redbirdAirRegTopic, cessna172RTopic, cessna152Topic, piperArcherTopic, da40Topic, da42Topic, pa34220tTopic, tecnamP2006tTopic, tecnamP2008jcTopic, da42AustroTopic, skRegAdditionalTopic, ...dgcaPreviousMetTopics, ...dgcaPreviousNavTopics, ...dgcaPreviousRegTopics, ...dgcaPreviousTechTopics, ...rtrPreviousAttemptTopics];

const TopicSelect = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = allTopics.find((t) => t.id === topicId);

  const isOxford = oxfordMetTopics.some((t) => t.id === topicId);
  const isRtr = rtrTopics.some((t) => t.id === topicId);
  const isRtrBank = rtrQuestionBank1Topic.id === topicId || rtrQuestionBank2Topic.id === topicId || rtrQuestionBank3Topic.id === topicId || rtrQuestionBank4Topic.id === topicId;
  const isRtrPrevAttempt = rtrPreviousAttemptTopics.some((t) => t.id === topicId);
  const isSkMet = skMetTopics.some((t) => t.id === topicId);
  const isOxfordGenNav = oxfordGenNavTopics.some((t) => t.id === topicId);
  const isRedbirdTech = redbirdTechGeneralTopic.id === topicId;
  const isRedbirdGenNav = redbirdGenNavTopics.some((t) => t.id === topicId);
  const isSkTechQB = skTechQB2Topic.id === topicId || skTechQB3Topic.id === topicId || skTechQB4Topic.id === topicId || skTechQB5Topic.id === topicId;
  const isRedbirdRadNav = redbirdRadioNavTopics.some((t) => t.id === topicId);
  const isRedbirdInst = redbirdInstTopics.some((t) => t.id === topicId);
  const isOxfordInst = oxfordInstNavTopics.some((t) => t.id === topicId);
  const isKwInst = keithWilliamInstTopics.some((t) => t.id === topicId);
  const isRedbirdAirReg = redbirdAirRegTopic.id === topicId;
  const isKwRadNav = keithWilliamRadioNavTopics.some((t) => t.id === topicId);
  const isCessna172R = cessna172RTopic.id === topicId;
  const isCessna152 = cessna152Topic.id === topicId;
  const isPiperArcher = piperArcherTopic.id === topicId;
  const isDa40 = da40Topic.id === topicId;
  const isDa42 = da42Topic.id === topicId;
  const isPa34220t = pa34220tTopic.id === topicId;
  const isTecnamP2006t = tecnamP2006tTopic.id === topicId;
  const isTecnamP2008jc = tecnamP2008jcTopic.id === topicId;
  const isDa42Austro = da42AustroTopic.id === topicId;
  const subtitle = isDa42Austro ? "Technical Specific — DA42 Austro" : isTecnamP2008jc ? "Technical Specific — TECHNAM P2008JC" : isTecnamP2006t ? "Technical Specific — TECHNAM P2006T" : isPa34220t ? "Technical Specific — PA-34-220T" : isDa40 ? "Technical Specific — DA 40 (Thielert)" : isDa42 ? "Technical Specific — DA 42 (Thielert)" : isPiperArcher ? "Technical Specific — Piper Archer III DX" : isCessna152 ? "Technical Specific — Cessna 152" : isCessna172R ? "Technical Specific — Cessna 172R" : isRedbirdAirReg ? "Redbird — Air Regulations" : isKwRadNav ? "Keith William — Radio Navigation" : isKwInst ? "Keith William — Instrument Navigation" : isOxfordInst ? "Practice Questions — Instrument Navigation" : isSkTechQB ? "Technical General — Question Bank" : isRedbirdTech ? "Technical General — Question Bank" : isRedbirdInst ? "Redbird — Instrument Navigation" : isRedbirdRadNav ? "Redbird — Radio Navigation" : isRedbirdGenNav ? "Redbird — General Navigation" : isOxfordGenNav ? "Practice Questions — General Navigation" : isSkMet ? "Air Meteorology — Question Bank" : isRtrPrevAttempt ? "RTR — Previous Attempt Questions" : isRtrBank ? "RTR — Question Bank" : isRtr ? "RTR Part 1 (DGCA)" : isOxford ? "Practice Questions — Air Meteorology" : "I C Joshi — Air Meteorology";

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
