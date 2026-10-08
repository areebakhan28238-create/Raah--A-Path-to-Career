export type BTechYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
export type BTechSemester = 
  | 'Semester 1' | 'Semester 2' 
  | 'Semester 3' | 'Semester 4' 
  | 'Semester 5' | 'Semester 6' 
  | 'Semester 7' | 'Semester 8';

export interface ResumeLearningData {
  courseId: string;
  chapterId: string;
  chapterTitle: string;
  courseTitle: string;
  timestampSeconds: number;
  totalDurationSeconds: number;
  percentageWatched: number;
  lastWatchedAt: string;
}

export interface DiscussionComment {
  id: string;
  authorName: string;
  authorRole: 'Student' | 'TA' | 'Mentor';
  avatar?: string;
  text: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  courseId: string;
  issueDate: string;
  credentialId: string;
  grade: string;
}

export interface UserSkill {
  name: string;
  category: 'Programming' | 'DSA' | 'Database' | 'Web' | 'AI/ML' | 'Cloud' | 'Core CS' | 'Soft Skills';
  score: number; // 0 - 100
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastered';
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  college: string;
  university: string;
  branch: string;
  currentYear: BTechYear;
  currentSemester: BTechSemester;
  targetCareer: string;
  avatar?: string;
  bio?: string;
  dailyStudyTime: string; // e.g. "2 hours"
  skills: UserSkill[];
  roadmapProgress: number; // 0 - 100
  careerReadinessScore: number; // 0 - 100
  learningStreak: number; // days
  xp: number;
  badges: Badge[];
  completedCourses: string[]; // course IDs
  completedChapters: string[]; // chapter IDs
  completedProjects: string[]; // project IDs
  solvedProblems: string[]; // problem IDs
  quizScores: Record<string, number>; // quizId -> score %
  videoProgress: Record<string, number>; // chapterId -> percentage watched (0-100)
  videoTimestamps: Record<string, number>; // chapterId -> timestamp in seconds
  resumeLearning?: ResumeLearningData;
  certificates: CertificateItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  requiredSkills: string[];
  averageSalary: string;
  demandLevel: 'High' | 'Very High' | 'Growing';
  difficulty: 'Moderate' | 'Challenging' | 'Advanced';
  requirements: string[];
  icon: string;
  recommendedCertifications: string[];
}

export interface RoadmapTopic {
  id: string;
  title: string;
  category: string;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  description: string;
  estimatedHours: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  linkedCourseId?: string;
  linkedQuizId?: string;
  linkedProblemId?: string;
  linkedProjectId?: string;
  keyConcepts: string[];
}

export interface CourseChapter {
  id: string;
  title: string;
  duration: string;
  durationSeconds?: number;
  videoUrl: string; // can be youtube embed or html5 video
  summary: string;
  objectives: string[];
  conceptExplanation: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  exercise: string;
  resources?: { title: string; url: string; type: string }[];
  quickQuiz?: QuizQuestion[];
  discussionComments?: DiscussionComment[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalChapters: number;
  estimatedHours: number;
  chapters: CourseChapter[];
}

export interface CodingTestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arrays' | 'Strings' | 'Linked Lists' | 'Stack & Queue' | 'Trees' | 'Graphs' | 'Dynamic Programming' | 'SQL' | 'Python';
  acceptance: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    python: string;
    cpp: string;
    java: string;
    javascript: string;
  };
  testCases: CodingTestCase[];
  hints: string[];
  optimalComplexity: string;
  xpReward: number;
}

export interface ProjectStep {
  id: number;
  title: string;
  description: string;
  checklist: string[];
  resources: { title: string; url: string }[];
  completed: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  careerCategory: string; // 'Data Science', 'Web Dev', 'AI/ML', etc.
  description: string;
  problemStatement: string;
  objectives: string[];
  requiredSkills: string[];
  techStack: string[];
  folderStructure: string;
  sampleDataset: {
    name: string;
    size: string;
    columns: string[];
    sampleRows: Record<string, string | number>[];
  };
  videoTutorialTitle: string;
  videoTutorialDuration: string;
  steps: ProjectStep[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    action: string;
    payload?: string;
  }[];
  interviewEvaluation?: {
    score: number;
    strengths: string[];
    improvements: string[];
    nextQuestion?: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'streak' | 'recommendation' | 'quiz' | 'coding' | 'career';
}
