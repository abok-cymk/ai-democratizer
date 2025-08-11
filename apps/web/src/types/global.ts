// User Types
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  role: UserRole
  level: number
  xp: number
  badges: Badge[]
  preferences: UserPreferences
  stats: UserStats
  createdAt: string
  updatedAt: string
}

export type UserRole = 'student' | 'educator' | 'admin' | 'moderator'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: NotificationSettings
  accessibility: AccessibilitySettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  achievements: boolean
  campaigns: boolean
  community: boolean
  updates: boolean
}

export interface AccessibilitySettings {
  reduceMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  screenReader: boolean
}

export interface UserStats {
  totalXP: number
  coursesCompleted: number
  playgroundSessions: number
  communityPosts: number
  campaignsJoined: number
  streak: number
  lastActive: string
}

// Learning Types
export interface Course {
  id: string
  title: string
  description: string
  slug: string
  thumbnail: string
  difficulty: Difficulty
  estimatedHours: number
  category: CourseCategory
  tags: string[]
  modules: Module[]
  prerequisites: string[]
  learningObjectives: string[]
  instructor: Instructor
  rating: number
  reviewCount: number
  enrollmentCount: number
  isPublished: boolean
  isFree: boolean
  price?: number
  createdAt: string
  updatedAt: string
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type CourseCategory = 
  | 'fundamentals'
  | 'machine-learning'
  | 'deep-learning'
  | 'nlp'
  | 'computer-vision'
  | 'ethics'
  | 'applications'
  | 'tools'

export interface Module {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
  quiz?: Quiz
  assignment?: Assignment
  estimatedMinutes: number
  isLocked: boolean
}

export interface Lesson {
  id: string
  title: string
  content: LessonContent
  type: LessonType
  order: number
  estimatedMinutes: number
  isCompleted: boolean
}

export type LessonType = 'video' | 'text' | 'interactive' | 'playground' | 'quiz'

export interface LessonContent {
  type: LessonType
  data: VideoContent | TextContent | InteractiveContent | PlaygroundContent
}

export interface VideoContent {
  videoUrl: string
  duration: number
  transcript?: string
  captions?: Caption[]
}

export interface TextContent {
  markdown: string
  readingTime: number
}

export interface InteractiveContent {
  type: 'drag-drop' | 'click-reveal' | 'simulation' | 'code-editor'
  config: Record<string, any>
}

export interface PlaygroundContent {
  templateId: string
  initialCode?: string
  instructions: string
}

export interface Caption {
  start: number
  end: number
  text: string
}

export interface Instructor {
  id: string
  name: string
  bio: string
  avatar: string
  expertise: string[]
  rating: number
  coursesCount: number
}

// Assessment Types
export interface Quiz {
  id: string
  title: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
  attempts: number
  maxAttempts: number
}

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

export type QuestionType = 'multiple-choice' | 'multiple-select' | 'true-false' | 'short-answer' | 'code'

export interface Assignment {
  id: string
  title: string
  description: string
  instructions: string
  deadline?: string
  submissionType: 'file' | 'text' | 'url' | 'code'
  maxScore: number
}

// Playground Types
export interface PlaygroundSession {
  id: string
  userId: string
  templateId: string
  title: string
  description?: string
  code: string
  language: PlaygroundLanguage
  model?: AIModel
  apiKey?: string
  isPublic: boolean
  tags: string[]
  likes: number
  views: number
  forks: number
  createdAt: string
  updatedAt: string
}

export type PlaygroundLanguage = 'python' | 'javascript' | 'typescript' | 'r' | 'sql'

export interface AIModel {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'cohere' | 'huggingface'
  type: 'text' | 'image' | 'audio' | 'multimodal'
  maxTokens: number
  costPerToken: number
}

export interface PlaygroundTemplate {
  id: string
  title: string
  description: string
  code: string
  language: PlaygroundLanguage
  category: string
  tags: string[]
  difficulty: Difficulty
  model?: AIModel
  author: User
  usageCount: number
  rating: number
}

// Gamification Types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: AchievementCategory
  tier: AchievementTier
  points: number
  requirements: AchievementRequirement[]
  unlockedAt?: string
}

export type AchievementCategory = 
  | 'learning'
  | 'playground'
  | 'community'
  | 'campaign'
  | 'streak'
  | 'social'
  | 'special'

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface AchievementRequirement {
  type: string
  value: number
  description: string
}

export interface Badge {
  id: string
  achievementId: string
  unlockedAt: string
  progress?: number
}

export interface Leaderboard {
  id: string
  type: LeaderboardType
  period: LeaderboardPeriod
  entries: LeaderboardEntry[]
  updatedAt: string
}

export type LeaderboardType = 'xp' | 'courses' | 'playground' | 'community'
export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'all-time'

export interface LeaderboardEntry {
  rank: number
  user: User
  score: number
  change: number
}

// Community Types
export interface Post {
  id: string
  title: string
  content: string
  author: User
  category: PostCategory
  tags: string[]
  likes: number
  comments: Comment[]
  views: number
  isSticky: boolean
  isClosed: boolean
  createdAt: string
  updatedAt: string
}

export type PostCategory = 'question' | 'discussion' | 'showcase' | 'announcement' | 'help'

export interface Comment {
  id: string
  content: string
  author: User
  postId: string
  parentId?: string
  likes: number
  replies: Comment[]
  createdAt: string
  updatedAt: string
}

// Campaign Types
export interface Campaign {
  id: string
  title: string
  description: string
  objective: string
  banner: string
  organizer: User
  category: CampaignCategory
  status: CampaignStatus
  startDate: string
  endDate: string
  participants: User[]
  activities: CampaignActivity[]
  rewards: Reward[]
  requirements: CampaignRequirement[]
  tags: string[]
  isPublic: boolean
  maxParticipants?: number
  createdAt: string
  updatedAt: string
}

export type CampaignCategory = 'awareness' | 'advocacy' | 'education' | 'competition' | 'hackathon'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'

export interface CampaignActivity {
  id: string
  title: string
  description: string
  type: ActivityType
  points: number
  deadline?: string
  isRequired: boolean
  completedBy: string[]
}

export type ActivityType = 'learn' | 'create' | 'share' | 'discuss' | 'complete'

export interface Reward {
  id: string
  title: string
  description: string
  type: RewardType
  value: number
  image?: string
  requirements: string[]
}

export type RewardType = 'badge' | 'certificate' | 'discount' | 'access' | 'merchandise'

export interface CampaignRequirement {
  type: string
  value: number
  description: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ErrorResponse {
  success: false
  error: string
  code?: string
  details?: Record<string, any>
}

// Utility Types
export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface NavItem {
  title: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
}

export interface Toast {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}
