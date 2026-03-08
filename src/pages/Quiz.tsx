import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { icJoshiTopics, MCQuestion } from "@/data/icJoshiQuestions";
import { oxfordMetTopics } from "@/data/oxfordMetQuestions";
import { rtrTopics } from "@/data/rtrQuestions";
import { rtrQuestionBank1Topic } from "@/data/rtrQuestionBank1";
import { rtrQuestionBank2Topic } from "@/data/rtrQuestionBank2";
import { rtrQuestionBank3Topic } from "@/data/rtrQuestionBank3";
import { rtrQuestionBank4Topic } from "@/data/rtrQuestionBank4";
import { rkBaliRegTopics } from "@/data/rkBaliRegQuestions";
import { rkBaliSamplePapers } from "@/data/rkBaliSamplePapers";
import { skMetTopics } from "@/data/skMetQuestions";
import { rkBaliGenNavTopics } from "@/data/rkBaliGenNavQuestions";
import { rkBaliInstrumentTopics } from "@/data/rkBaliInstrumentQuestions";
import { rkBaliRadioNavTopics } from "@/data/rkBaliRadioNavQuestions";
import { redbirdTechGeneralTopic } from "@/data/redbirdTechGeneralQuestions";
import { skTechQB2Topic } from "@/data/skTechQB2Questions";
import { skTechQB3Topic } from "@/data/skTechQB3Questions";
import { skTechQB4Topic } from "@/data/skTechQB4Questions";
import { oxfordGenNavTopics } from "@/data/oxfordGenNavQuestions";
import { keithWilliamGenNavTopics } from "@/data/keithWilliamGenNavQuestions";
import { redbirdGenNavTopics } from "@/data/redbirdGenNavQuestions";
import { redbirdRadioNavTopics } from "@/data/redbirdRadioNavQuestions";
import { redbirdInstTopics } from "@/data/redbirdInstQuestions";
import { oxfordRadioNavTopics } from "@/data/oxfordRadioNavQuestions";
import { oxfordInstNavTopics } from "@/data/oxfordInstNavQuestions";
import { redbirdAirRegTopic } from "@/data/redbirdAirRegQuestions";
import { skTechQB5Topic } from "@/data/skTechQB5Questions";
import oxfordRadNavAppendixA from "@/assets/oxford-radnav-appendix-a.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import pressureAnnexes from "@/assets/pressure-systems-annexes.png";
import turbulenceAppendixA from "@/assets/turbulence-appendix-a.png";
import altimetryDiagram13 from "@/assets/altimetry-diagram-13.png";
import altimetryDiagram29 from "@/assets/altimetry-diagram-29.png";
import cloudsId from "@/assets/clouds-identification.png";
import stationModelDiagram from "@/assets/station-model-diagram.png";
import airMassesAppendixA from "@/assets/air-masses-appendix-a.jpg";
import airMassesAppendixB from "@/assets/air-masses-appendix-b.jpg";
import edP5 from "@/assets/electronic-display-p5.jpg";
import edP6 from "@/assets/electronic-display-p6.jpg";
import edP7 from "@/assets/electronic-display-p7.jpg";
import edP8 from "@/assets/electronic-display-p8.jpg";
import edP9 from "@/assets/electronic-display-p9.jpg";
import edP10 from "@/assets/electronic-display-p10.jpg";

const diagramMap: Record<string, string> = {
  "pressure-annexes": pressureAnnexes,
  "turbulence-appendix-a": turbulenceAppendixA,
  "altimetry-13": altimetryDiagram13,
  "altimetry-29": altimetryDiagram29,
  "clouds-id": cloudsId,
  "station-model": stationModelDiagram,
  "air-masses-appendix-a": airMassesAppendixA,
  "air-masses-appendix-b": airMassesAppendixB,
  "ed-p5": edP5,
  "ed-p6": edP6,
  "ed-p7": edP7,
  "ed-p8": edP8,
  "ed-p9": edP9,
  "ed-p10": edP10,
  "oxford-radnav-appendix-a": oxfordRadNavAppendixA,
};

const Quiz = () => {
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") as "practice" | "test" || "practice";

  const allTopics = useMemo(() => [...icJoshiTopics, ...oxfordMetTopics, ...rtrTopics, rtrQuestionBank1Topic, rtrQuestionBank2Topic, rtrQuestionBank3Topic, rtrQuestionBank4Topic, ...rkBaliRegTopics, ...rkBaliSamplePapers, ...skMetTopics, ...rkBaliGenNavTopics, ...rkBaliInstrumentTopics, ...rkBaliRadioNavTopics, redbirdTechGeneralTopic, skTechQB2Topic, skTechQB3Topic, skTechQB4Topic, skTechQB5Topic, ...oxfordGenNavTopics, ...keithWilliamGenNavTopics, ...redbirdGenNavTopics, ...redbirdRadioNavTopics, ...redbirdInstTopics, ...oxfordRadioNavTopics, ...oxfordInstNavTopics, redbirdAirRegTopic], []);
  const topic = useMemo(() => allTopics.find((t) => t.id === topicId), [topicId, allTopics]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

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

  const questions = topic.questions;
  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const selectAnswer = (qId: number, optIndex: number) => {
    if (mode === "practice" && revealed[qId]) return;
    if (mode === "test" && showResults) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    if (mode === "practice") {
      setRevealed((prev) => ({ ...prev, [qId]: true }));
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const finishTest = () => {
    setShowResults(true);
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setRevealed({});
    setShowResults(false);
  };

  const score = questions.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);
  const attempted = Object.keys(answers).length;
  const percentage = Math.round((score / questions.length) * 100);

  // Test mode results screen
  if (mode === "test" && showResults) {
    return (
      <div className="min-h-screen bg-gradient-aviation">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 sm:p-8 text-center mb-6"
          >
            <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Test Complete!</h1>
            <p className="text-muted-foreground mb-6">{topic.title}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="glass-panel p-4 rounded-xl">
                <div className="text-2xl font-bold text-destructive">{attempted - score}</div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </div>
              <div className="glass-panel p-4 rounded-xl">
                <div className={`text-2xl font-bold ${percentage >= 70 ? "text-green-500" : percentage >= 50 ? "text-accent" : "text-destructive"}`}>
                  {percentage}%
                </div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(`/topics/${topicId}`)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Topic
              </Button>
              <Button onClick={restart}>
                <RotateCcw className="w-4 h-4 mr-1" /> Retry
              </Button>
            </div>
          </motion.div>

          {/* Review answers */}
          <div className="flex flex-col gap-3">
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              return (
                <div key={q.id} className="glass-card p-4">
                  <div className="flex items-start gap-2 mb-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium">{idx + 1}. {q.question}</span>
                  </div>
                  <div className="pl-7 flex flex-col gap-1.5">
                    {q.options.map((opt, oi) => {
                      let cls = "text-xs px-3 py-2 rounded-lg border ";
                      if (oi === q.correct) cls += "border-green-500/50 bg-green-500/10 text-green-400";
                      else if (oi === userAns && !isCorrect) cls += "border-destructive/50 bg-destructive/10 text-destructive";
                      else cls += "border-border/30 text-muted-foreground";
                      return <div key={oi} className={cls}>{opt}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-aviation">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(`/topics/${topicId}`)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs px-3 py-1 rounded-full glass-panel font-medium">
            {mode === "practice" ? "Practice Mode" : "Test Mode"}
          </span>
        </div>

        {/* Title & Progress */}
        <div className="mb-6">
          <h1 className="font-display text-lg sm:text-xl font-bold mb-1">{topic.title}</h1>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="glass-card p-5 sm:p-6 mb-6"
          >
            <p className="font-medium text-sm sm:text-base mb-5">
              <span className="text-primary mr-2">Q{currentIndex + 1}.</span>
              {currentQ.question}
            </p>

            {currentQ.diagram && diagramMap[currentQ.diagram] && (
              <div className="mb-5 rounded-lg overflow-hidden border border-border/30">
                <img src={diagramMap[currentQ.diagram]} alt="Reference diagram" className="w-full bg-white" />
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {currentQ.options.map((opt, oi) => {
                const selected = answers[currentQ.id] === oi;
                const isRevealed = mode === "practice" && revealed[currentQ.id];
                const isCorrect = oi === currentQ.correct;

                let optionCls = "w-full text-left text-sm px-4 py-3 rounded-xl border transition-all duration-200 ";

                if (isRevealed) {
                  if (isCorrect) optionCls += "border-green-500/60 bg-green-500/10 text-green-400";
                  else if (selected && !isCorrect) optionCls += "border-destructive/60 bg-destructive/10 text-destructive";
                  else optionCls += "border-border/30 text-muted-foreground opacity-60";
                } else if (selected) {
                  optionCls += "border-primary/60 bg-primary/10 text-foreground";
                } else {
                  optionCls += "border-border/40 text-muted-foreground hover:border-primary/40 hover:bg-primary/5";
                }

                return (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(currentQ.id, oi)}
                    className={optionCls}
                    disabled={isRevealed || (mode === "test" && showResults)}
                  >
                    <span className="font-medium text-primary/60 mr-2">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                    {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 inline ml-2 text-green-500" />}
                    {isRevealed && selected && !isCorrect && <XCircle className="w-4 h-4 inline ml-2 text-destructive" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Practice mode score tracker */}
        {mode === "practice" && (
          <div className="glass-panel px-4 py-2 mb-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Attempted: <span className="text-foreground font-medium">{attempted}</span>
            </span>
            <span className="text-muted-foreground">
              Correct: <span className="text-green-500 font-medium">{score}</span> / {attempted}
            </span>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={prevQuestion} disabled={currentIndex === 0}>
            Previous
          </Button>

          {currentIndex === questions.length - 1 ? (
            mode === "test" ? (
              <Button size="sm" onClick={finishTest} disabled={attempted < questions.length}>
                Submit Test <Trophy className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => navigate(`/topics/${topicId}`)}>
                Finish <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )
          ) : (
            <Button size="sm" onClick={nextQuestion}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Question Number Grid */}
        <div className="mt-6 glass-card p-4">
          <p className="text-xs text-muted-foreground mb-3">Jump to question</p>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              const isActive = idx === currentIndex;
              const isAnswered = answers[q.id] !== undefined;
              const isRevealedCorrect = mode === "practice" && revealed[q.id] && answers[q.id] === q.correct;
              const isRevealedWrong = mode === "practice" && revealed[q.id] && answers[q.id] !== q.correct;

              let cls = "w-9 h-9 rounded-lg text-xs font-medium flex items-center justify-center border transition-all cursor-pointer ";
              if (isActive) cls += "border-primary bg-primary text-primary-foreground";
              else if (isRevealedCorrect) cls += "border-green-500/50 bg-green-500/15 text-green-400";
              else if (isRevealedWrong) cls += "border-destructive/50 bg-destructive/15 text-destructive";
              else if (isAnswered) cls += "border-primary/40 bg-primary/10 text-foreground";
              else cls += "border-border/40 text-muted-foreground hover:border-primary/40";

              return (
                <button key={q.id} className={cls} onClick={() => setCurrentIndex(idx)}>
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
