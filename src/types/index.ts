export interface Issue {
  lineNumber?: number | null;
  description: string;
  severity: 'critical' | 'warning' | 'suggestion';
  improvedCode?: string | null;
}

export interface ConceptCard {
  id: string;
  userId: string;
  name: string;
  definition: string;
  contextExplanation: string;
  exampleCode: string;
  studyKeywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  appearedCount: number;
  lastSeenAt: Date;
  nextReviewAt: Date;
  relatedSubmissions: string[];
  userNote?: string;
  bookmarked?: boolean;
}

export interface ReviewResult {
  score: number;
  summary: string;
  issues: Issue[];
  conceptCards: ConceptCardRaw[];
  weakPatterns: string[];
  growthInsight: string;
}

export interface ConceptCardRaw {
  name: string;
  definition: string;
  contextExplanation: string;
  exampleCode: string;
  studyKeywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface CodeSubmission {
  id: string;
  userId: string;
  code: string;
  language: string;
  githubUrl?: string;
  tags: string[];
  reviewResult: ReviewResult;
  weakPatterns: string[];
  createdAt: Date;
}

export interface WeakPattern {
  id: string;
  userId: string;
  pattern: string;
  count: number;
  status: 'recurring' | 'improving' | 'resolved';
  firstSeenAt: Date;
  lastSeenAt: Date;
}

export interface RoadmapStep {
  step: number;
  topic: string;
  reason: string;
  estimatedDays: number;
  status: 'locked' | 'current' | 'completed';
  relatedConcepts: string[];
}

export interface Roadmap {
  id: string;
  userId: string;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  steps: RoadmapStep[];
  generatedAt: Date;
}

export interface Challenge {
  id: string;
  userId?: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat?: string;
  outputFormat?: string;
  examples?: { input: string; output: string }[];
  hints: string[];
  relatedConcept: string;
  baekjoonLink?: string | null;
  programmersLink?: string | null;
  completed: boolean;
  createdAt?: Date;
}

export interface DashboardStats {
  totalSubmissions: number;
  totalConceptCards: number;
  averageScore: number;
  currentStreak: number;
}
