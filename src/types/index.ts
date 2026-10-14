export type Rarity = 'LEGENDARY' | 'EPIC' | 'RARE' | 'UNCOMMON' | 'COMMON' | 'STARTER';

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface Question {
  id: string;
  cardIndex: number; // 1 to 10
  topic: string;
  prompt: string;
  type: QuestionType;
  options?: string[]; // for multiple-choice or true-false
  correctAnswer: string;
  explanation?: string;
}

export interface QuestPack {
  id: string;
  title: string;
  course: string;
  meetingNumber: number; // e.g., 4 -> #04
  meetingCode: string;   // e.g., "Pertemuan 04"
  topic: string;
  cardCount: number;     // 10
  timeLimitMinutes: number; // 20
  coverImage: string;
  assignedClass: string;
  isPublished: boolean;
  accentColor: string;
  description: string;
  questions: Question[];
}

export interface CollectedCard {
  id: string;
  packId: string;
  packTitle: string;
  course: string;
  meetingNumber: number;
  score: number;
  maxScore: number;
  rarity: Rarity;
  points: number;
  collectedAt: string;
  cardTitle: string;
  artworkUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer';
  classId: string;
  className: string;
  avatar: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  packId: string;
  packTitle: string;
  answers: Record<number, string>; // cardIndex -> answer string
  score: number;
  points: number;
  rarity: Rarity;
  completedAt: string;
  timeSpentSeconds: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  className: string;
  totalPoints: number;
  cardsCollected: number;
  legendaryCount: number;
  rank?: number;
}
