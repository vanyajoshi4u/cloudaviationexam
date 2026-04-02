export interface MCQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct answer
  diagram?: string;
}

export interface Topic {
  id: string;
  title: string;
  questions: MCQuestion[];
}
