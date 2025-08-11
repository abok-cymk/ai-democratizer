import { gql } from 'graphql-tag'

export const typeDefs = gql`
  # Scalar types
  scalar DateTime
  scalar JSON

  # Enums
  enum Role {
    USER
    MODERATOR
    ADMIN
    SUPER_ADMIN
  }

  enum CourseCategory {
    FUNDAMENTALS
    MACHINE_LEARNING
    DEEP_LEARNING
    NLP
    COMPUTER_VISION
    ETHICS
    APPLICATIONS
    TOOLS
  }

  enum Difficulty {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum PostCategory {
    QUESTION
    DISCUSSION
    SHOWCASE
    ANNOUNCEMENT
    HELP
  }

  enum CampaignCategory {
    AWARENESS
    ADVOCACY
    EDUCATION
    COMPETITION
    HACKATHON
  }

  enum CampaignStatus {
    DRAFT
    ACTIVE
    PAUSED
    COMPLETED
    CANCELLED
  }

  enum AchievementCategory {
    LEARNING
    COMMUNITY
    PLAYGROUND
    CAMPAIGN
    STREAK
    MILESTONE
  }

  enum Rarity {
    COMMON
    UNCOMMON
    RARE
    EPIC
    LEGENDARY
  }

  # User Types
  type User {
    id: ID!
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
    avatar: String
    bio: String
    location: String
    website: String
    level: Int!
    xp: Int!
    streak: Int!
    lastActive: DateTime!
    theme: String!
    language: String!
    role: Role!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Computed fields
    enrollments: [CourseEnrollment!]!
    playgroundSessions: [PlaygroundSession!]!
    posts: [Post!]!
    achievements: [UserAchievement!]!
    campaignParticipations: [CampaignParticipation!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  # Course Types
  type Course {
    id: ID!
    title: String!
    description: String!
    content: JSON!
    slug: String!
    thumbnail: String
    category: CourseCategory!
    difficulty: Difficulty!
    tags: [String!]!
    duration: Int!
    rating: Float!
    ratingCount: Int!
    isPublished: Boolean!
    isFeatured: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    lessons: [Lesson!]!
    enrollments: [CourseEnrollment!]!
    enrollmentCount: Int!
    
    # User-specific fields
    isEnrolled: Boolean
    userProgress: Float
  }

  type Lesson {
    id: ID!
    title: String!
    description: String
    content: JSON!
    order: Int!
    duration: Int!
    videoUrl: String
    materials: [String!]!
    isPublished: Boolean!
    isFree: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    course: Course!
    
    # User-specific fields
    isCompleted: Boolean
    progress: LessonProgress
  }

  type CourseEnrollment {
    id: ID!
    progress: Float!
    completedAt: DateTime
    enrolledAt: DateTime!
    lastAccessed: DateTime!
    
    # Relations
    user: User!
    course: Course!
  }

  type LessonProgress {
    id: ID!
    completed: Boolean!
    timeSpent: Int!
    completedAt: DateTime
    startedAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    lesson: Lesson!
  }

  # Playground Types
  type PlaygroundSession {
    id: ID!
    title: String!
    description: String
    code: String!
    language: String!
    model: String!
    parameters: JSON!
    output: String
    error: String
    executionTime: Int
    isPublic: Boolean!
    isTemplate: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    user: User!
  }

  # Community Types
  type Post {
    id: ID!
    title: String!
    content: String!
    excerpt: String
    slug: String!
    category: PostCategory!
    tags: [String!]!
    likesCount: Int!
    commentsCount: Int!
    viewsCount: Int!
    isPublished: Boolean!
    isPinned: Boolean!
    isLocked: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    author: User!
    comments: [Comment!]!
    
    # User-specific fields
    isLiked: Boolean
  }

  type Comment {
    id: ID!
    content: String!
    likesCount: Int!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    author: User!
    post: Post!
    parent: Comment
    replies: [Comment!]!
    
    # User-specific fields
    isLiked: Boolean
  }

  # Campaign Types
  type Campaign {
    id: ID!
    title: String!
    description: String!
    content: String!
    banner: String
    category: CampaignCategory!
    tags: [String!]!
    startDate: DateTime!
    endDate: DateTime!
    status: CampaignStatus!
    targetParticipants: Int!
    participantCount: Int!
    activities: JSON!
    totalPoints: Int!
    isPublic: Boolean!
    isFeatured: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    participations: [CampaignParticipation!]!
    
    # User-specific fields
    isJoined: Boolean
    userProgress: Float
    userPointsEarned: Int
  }

  type CampaignParticipation {
    id: ID!
    progress: Float!
    pointsEarned: Int!
    completedActivities: [String!]!
    isActive: Boolean!
    completedAt: DateTime
    joinedAt: DateTime!
    updatedAt: DateTime!
    
    # Relations
    user: User!
    campaign: Campaign!
  }

  # Achievement Types
  type Achievement {
    id: ID!
    name: String!
    description: String!
    icon: String!
    category: AchievementCategory!
    requirements: JSON!
    points: Int!
    rarity: Rarity!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # User-specific fields
    isUnlocked: Boolean
    unlockedAt: DateTime
  }

  type UserAchievement {
    id: ID!
    unlockedAt: DateTime!
    
    # Relations
    user: User!
    achievement: Achievement!
  }

  # Input Types
  input RegisterInput {
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    bio: String
    location: String
    website: String
    avatar: String
    theme: String
    language: String
  }

  input CreateCourseInput {
    title: String!
    description: String!
    content: JSON!
    slug: String!
    thumbnail: String
    category: CourseCategory!
    difficulty: Difficulty!
    tags: [String!]!
    duration: Int!
    isPublished: Boolean
    isFeatured: Boolean
  }

  input CreatePlaygroundSessionInput {
    title: String!
    description: String
    code: String!
    language: String!
    model: String!
    parameters: JSON!
    isPublic: Boolean
    isTemplate: Boolean
  }

  input CreatePostInput {
    title: String!
    content: String!
    category: PostCategory!
    tags: [String!]!
  }

  input CreateCampaignInput {
    title: String!
    description: String!
    content: String!
    banner: String
    category: CampaignCategory!
    tags: [String!]!
    startDate: DateTime!
    endDate: DateTime!
    targetParticipants: Int!
    activities: JSON!
    isPublic: Boolean
    isFeatured: Boolean
  }

  # Query filters and pagination
  input CourseFilters {
    category: CourseCategory
    difficulty: Difficulty
    isEnrolled: Boolean
    isFeatured: Boolean
    search: String
  }

  input PostFilters {
    category: PostCategory
    authorId: ID
    search: String
    tags: [String!]
  }

  input CampaignFilters {
    category: CampaignCategory
    status: CampaignStatus
    isJoined: Boolean
    isFeatured: Boolean
    search: String
  }

  input PaginationInput {
    page: Int = 1
    limit: Int = 20
  }

  input SortInput {
    field: String!
    order: String! # ASC or DESC
  }

  # Response types for paginated queries
  type CourseConnection {
    nodes: [Course!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PostConnection {
    nodes: [Post!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type CampaignConnection {
    nodes: [Campaign!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  # Queries
  type Query {
    # Authentication
    me: User
    
    # Users
    user(id: ID!): User
    
    # Courses
    course(id: ID, slug: String): Course
    courses(
      filters: CourseFilters
      pagination: PaginationInput
      sort: SortInput
    ): CourseConnection!
    
    # Lessons
    lesson(id: ID!): Lesson
    
    # Playground
    playgroundSession(id: ID!): PlaygroundSession
    playgroundSessions(
      userId: ID
      isTemplate: Boolean
      pagination: PaginationInput
    ): [PlaygroundSession!]!
    
    # Community
    post(id: ID, slug: String): Post
    posts(
      filters: PostFilters
      pagination: PaginationInput
      sort: SortInput
    ): PostConnection!
    
    # Campaigns
    campaign(id: ID!): Campaign
    campaigns(
      filters: CampaignFilters
      pagination: PaginationInput
      sort: SortInput
    ): CampaignConnection!
    
    # Achievements
    achievements(category: AchievementCategory): [Achievement!]!
    userAchievements(userId: ID): [UserAchievement!]!
    
    # Analytics (for dashboard)
    dashboardStats: DashboardStats!
  }

  # Dashboard stats type
  type DashboardStats {
    totalUsers: Int!
    totalCourses: Int!
    totalPlaygroundSessions: Int!
    totalCampaigns: Int!
    activeCampaigns: Int!
    totalPosts: Int!
    userStats: UserStats
  }

  type UserStats {
    level: Int!
    xp: Int!
    streak: Int!
    coursesCompleted: Int!
    playgroundSessions: Int!
    postsCreated: Int!
    campaignsJoined: Int!
    achievementsUnlocked: Int!
  }

  # Mutations
  type Mutation {
    # Authentication
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
    
    # Profile
    updateProfile(input: UpdateProfileInput!): User!
    
    # Courses
    createCourse(input: CreateCourseInput!): Course!
    enrollInCourse(courseId: ID!): CourseEnrollment!
    unenrollFromCourse(courseId: ID!): Boolean!
    updateLessonProgress(lessonId: ID!, timeSpent: Int, completed: Boolean): LessonProgress!
    
    # Playground
    createPlaygroundSession(input: CreatePlaygroundSessionInput!): PlaygroundSession!
    updatePlaygroundSession(id: ID!, input: CreatePlaygroundSessionInput!): PlaygroundSession!
    deletePlaygroundSession(id: ID!): Boolean!
    executeCode(sessionId: ID!): PlaygroundSession!
    
    # Community
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: CreatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    likePost(postId: ID!): Post!
    unlikePost(postId: ID!): Post!
    
    # Comments
    createComment(postId: ID!, content: String!, parentId: ID): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
    likeComment(commentId: ID!): Comment!
    unlikeComment(commentId: ID!): Comment!
    
    # Campaigns
    createCampaign(input: CreateCampaignInput!): Campaign!
    updateCampaign(id: ID!, input: CreateCampaignInput!): Campaign!
    joinCampaign(campaignId: ID!): CampaignParticipation!
    leaveCampaign(campaignId: ID!): Boolean!
    updateCampaignProgress(campaignId: ID!, activityIds: [String!]!): CampaignParticipation!
  }

  # Subscriptions (for real-time features)
  type Subscription {
    # Real-time notifications
    userNotifications: Notification!
    
    # Live updates
    campaignUpdated(campaignId: ID!): Campaign!
    postCommented(postId: ID!): Comment!
  }

  type Notification {
    id: ID!
    type: String!
    title: String!
    message: String!
    data: JSON
    isRead: Boolean!
    createdAt: DateTime!
  }
`
