export interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user-specific fields if needed
  isAdmin?: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  content: string; // Markdown content for the lesson
  type: 'video' | 'text' | 'quiz';
  videoId?: string; // YouTube video ID if type is 'video'
  quizId?: string; // Quiz ID if type is 'quiz'
}

export interface CourseModule {
  id:string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  instructor: string;
  category: string;
  tags: string[];
  imageUrl: string;
  modules: CourseModule[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites?: string[];
  learningOutcomes?: string[];
  estimatedDuration?: string; // e.g., "10 hours"
}

export interface EnrolledCourse extends Course {
  enrollmentDate: string; // ISO date string
  progress: number; // Percentage, 0-100
  completedLessons: string[]; // Array of lesson IDs
  certificateId?: string; // ID of the certificate if course completed
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: { id: string; text: string }[]; // For multiple-choice
  correctAnswer: string | string[]; // Can be an array of option IDs for multiple-choice if multiple answers are allowed
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  moduleId: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export interface UserQuizSubmission {
  userId: string;
  quizId: string;
  answers: { questionId: string; answer: string | string[] }[];
  score: number; // Percentage
  submittedAt: string; // ISO date string
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  userName: string;
  issueDate: string; // ISO date string
  verificationCode: string; // Unique code for verification
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  format: string; // e.g., CSV, JSON, Images
  size: string; // e.g., 10MB, 100000 items
  contributor: string;
  uploadDate: string; // ISO date string
  downloadUrl?: string;
  previewData?: any; // Small snippet of data for preview
  imageUrl?: string;
  documentationUrl?: string;
  license?: string;
}

export interface ComputeResource {
  id: string;
  name: string;
  type: 'GPU' | 'CPU' | 'TPU';
  provider: string;
  specs: string; // e.g., "NVIDIA A100, 80GB HBM2"
  availability: 'Available' | 'Limited' | 'Unavailable';
  accessLink: string;
  hourlyRate?: number;
  region?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description?: string;
  type: 'Academic' | 'Industry' | 'Community';
}

export enum AuthState {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system' | 'error';
  text: string;
  timestamp: number;
  sources?: GroundingChunk[]; // For grounded responses
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
  };
  // Add other chunk types if needed
}

export type CourseProgress = Record<string, { completedLessons: string[] }>; // courseId -> { completedLessons }
