import { ReactNode } from 'react';

export type SectionType = 'lesson' | 'exercise' | 'quiz';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-based
  explanation?: string;
}

export interface QuizData {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface ExerciseData {
  title: string;
  description: string;
  initialCode: string;
  solutionCode: string;
  hints: string[];
}

export interface Section {
  id: string;
  category: string;
  group?: string; // For 2nd level grouping
  subGroup?: string; // For 3rd level grouping
  title: string;
  type: SectionType;
  content?: ReactNode; // For lesson content
  exerciseData?: ExerciseData; // For exercises
  quizData?: QuizData; // For quizzes
}