export interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuestionResult {
  questionId: number;
  selectedIndex: number | null; // null = timeout
  isCorrect: boolean;
  timeRemainingMs: number; // milliseconds remaining when answered (0 if timeout)
  xpEarned: number; // precise float
}

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Au", "Ag", "Gd"],
    correctIndex: 1,
    category: "Science",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctIndex: 2,
    category: "Science",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctIndex: 2,
    category: "History",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctIndex: 2,
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correctIndex: 1,
    category: "Science",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Botticelli"],
    correctIndex: 2,
    category: "Art",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctIndex: 3,
    category: "Geography",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctIndex: 1,
    category: "Math",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "Which country invented pizza?",
    options: ["France", "Greece", "Italy", "Spain"],
    correctIndex: 2,
    category: "Food",
    difficulty: "Easy"
  },
  {
    id: 10,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctIndex: 2,
    category: "Science",
    difficulty: "Medium"
  }
];

// XP Calculation: Base 1000 + (MsRemaining * 0.1)
export function calculateXP(isCorrect: boolean, timeRemainingMs: number): number {
  if (!isCorrect) return 0;
  return 1000 + (timeRemainingMs * 0.1);
}

// Format XP for display (rounded, with comma separators)
export function formatXP(xp: number): string {
  return Math.round(xp).toLocaleString();
}

// Format time for display
export function formatTime(ms: number): string {
  const seconds = ms / 1000;
  return seconds.toFixed(2) + 's';
}
