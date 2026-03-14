import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import paper1SolutionPage1 from "@/assets/paper1-solution-page1.jpg";
import paper1SolutionPage2 from "@/assets/paper1-solution-page2.jpg";
import paper1SolutionPage3 from "@/assets/paper1-solution-page3.jpg";
import paper1SolutionPage4 from "@/assets/paper1-solution-page4.jpg";
import paper1SolutionPage5 from "@/assets/paper1-solution-page5.jpg";
import paper2SolutionPage1 from "@/assets/paper2-solution-page1.jpg";
import paper2SolutionPage2 from "@/assets/paper2-solution-page2.jpg";
import paper2SolutionPage3 from "@/assets/paper2-solution-page3.jpg";
import paper3SolutionPage1 from "@/assets/paper3-solution-page1.jpg";
import paper3SolutionPage2 from "@/assets/paper3-solution-page2.jpg";
import paper3SolutionPage3 from "@/assets/paper3-solution-page3.jpg";

const solutionImagesMap: Record<string, { images: string[]; label: string }> = {
  "rtr2-paper-1": {
    images: [paper1SolutionPage1, paper1SolutionPage2, paper1SolutionPage3, paper1SolutionPage4, paper1SolutionPage5],
    label: "Paper 1",
  },
  "rtr2-paper-2": {
    images: [paper2SolutionPage1, paper2SolutionPage2, paper2SolutionPage3],
    label: "Paper 2",
  },
  "rtr2-paper-3": {
    images: [paper3SolutionPage1, paper3SolutionPage2, paper3SolutionPage3],
    label: "Paper 3",
  },
};

const AtcAnswerViewer = () => {
  const { paperId } = useParams();
  const normalizedPaperId = paperId?.toLowerCase().trim();
  const resolvedPaperId = normalizedPaperId
    ? (solutionImagesMap[normalizedPaperId]
        ? normalizedPaperId
        : solutionImagesMap[`rtr2-${normalizedPaperId}`]
          ? `rtr2-${normalizedPaperId}`
          : /^paper-\d+$/.test(normalizedPaperId)
            ? `rtr2-${normalizedPaperId}`
            : /^\d+$/.test(normalizedPaperId)
              ? `rtr2-paper-${normalizedPaperId}`
              : null)
    : null;
  const solution = resolvedPaperId ? solutionImagesMap[resolvedPaperId] : null;

  if (!solution) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Answer not available</h1>
          <p className="text-sm text-muted-foreground">No solution found for this paper.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">ATC Examiner Answer Sheet</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">{solution.label} — Answer Key</h1>
          <p className="text-sm text-muted-foreground mt-1">
            For the person acting as ATC examiner only
          </p>
        </motion.div>

        <div className="space-y-4">
          {solution.images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`${solution.label} Answer — Page ${idx + 1}`}
              className="w-full rounded-xl border border-border/50 shadow-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            />
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 mb-4">
          CloudAviation Academy — RTR Part 2 Practice
        </p>
      </div>
    </div>
  );
};

export default AtcAnswerViewer;
