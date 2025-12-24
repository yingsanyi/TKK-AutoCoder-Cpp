import { ReactNode } from 'react';

export type SectionType = 'lesson' | 'exercise' | 'quiz';

export interface QuizQuestion {
  id: number;
  type?: 'single' | 'multiple';
  question: string;
  options: string[];
  correctAnswer: number | string | number[]; // Index 0-based or string answer or array of indices
  explanation?: string;
}

export interface QuizData {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export interface TestCase {
  input: string;
  output?: string;
  description?: string;
}

export interface ExerciseData {
  title: string;
  description: string;
  initialCode: string;
  solutionCode: string;
  extraSolutions?: {
    label: string;
    code: string;
  }[];
  hints: string[];
  testCases?: TestCase[];
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