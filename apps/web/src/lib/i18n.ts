import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations
const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    update: 'Update',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    next: 'Next',
    previous: 'Previous',
    back: 'Back',
    continue: 'Continue',
    finish: 'Finish',
    close: 'Close',
    open: 'Open',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    share: 'Share',
    copy: 'Copy',
    paste: 'Paste',
    print: 'Print',
    export: 'Export',
    import: 'Import',
    refresh: 'Refresh',
    retry: 'Retry',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    okay: 'Okay',
    submit: 'Submit',
    reset: 'Reset',
    clear: 'Clear'
  },
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
    playground: 'AI Playground',
    learning: 'Learning Paths',
    community: 'Community',
    campaigns: 'Campaigns',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  auth: {
    login: 'Login',
    register: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signInWith: 'Sign in with {{provider}}',
    signUpWith: 'Sign up with {{provider}}',
    termsAndConditions: 'Terms and Conditions',
    privacyPolicy: 'Privacy Policy',
    agreeToTerms: 'I agree to the {{terms}} and {{privacy}}',
    invalidCredentials: 'Invalid email or password',
    emailAlreadyExists: 'Email already exists',
    passwordTooWeak: 'Password is too weak',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    usernameRequired: 'Username is required',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    passwordsDoNotMatch: 'Passwords do not match',
    loginSuccess: 'Successfully logged in',
    registerSuccess: 'Account created successfully',
    logoutSuccess: 'Successfully logged out'
  },
  home: {
    hero: {
      title: 'Democratize AI Through Interactive Learning',
      subtitle: 'Master artificial intelligence concepts through hands-on experimentation, gamified learning paths, and community-driven education',
      cta: 'Start Learning AI',
      watchDemo: 'Watch Demo'
    },
    features: {
      playground: {
        title: 'AI Playground',
        description: 'Experiment with AI models in real-time, test prompts, and see instant results with our interactive playground'
      },
      learning: {
        title: 'Structured Learning Paths',
        description: 'Progress through carefully crafted courses designed to take you from AI novice to practitioner'
      },
      community: {
        title: 'Vibrant Community',
        description: 'Connect with fellow learners, share insights, and get help from experts and peers alike'
      },
      gamification: {
        title: 'Gamified Experience',
        description: 'Earn XP, unlock achievements, and compete on leaderboards while learning AI concepts'
      }
    },
    stats: {
      users: '{{count}}+ Active Learners',
      courses: '{{count}}+ Courses Available',
      playground: '{{count}}+ Playground Sessions',
      community: '{{count}}+ Community Posts'
    }
  },
  dashboard: {
    welcome: 'Welcome back, {{name}}!',
    continueWhere: 'Continue where you left off',
    recentActivity: 'Recent Activity',
    achievements: 'Recent Achievements',
    stats: {
      level: 'Level {{level}}',
      xp: '{{current}}/{{next}} XP',
      streak: '{{days}} day streak',
      courses: '{{completed}}/{{total}} courses',
      playground: '{{count}} sessions',
      community: '{{count}} contributions'
    },
    quickActions: {
      title: 'Quick Actions',
      newPlayground: 'New Playground Session',
      continueLearning: 'Continue Learning',
      visitCommunity: 'Visit Community',
      joinCampaign: 'Join Campaign'
    }
  },
  playground: {
    title: 'AI Playground',
    subtitle: 'Experiment with AI models and see results in real-time',
    newSession: 'New Session',
    templates: 'Templates',
    myProjects: 'My Projects',
    public: 'Public Gallery',
    run: 'Run Code',
    save: 'Save',
    fork: 'Fork',
    share: 'Share',
    export: 'Export',
    settings: 'Settings',
    model: 'AI Model',
    language: 'Language',
    prompt: 'Enter your prompt here...',
    result: 'Result',
    error: 'Error',
    running: 'Running...',
    noResult: 'No result yet. Run your code to see output.',
    templateCategories: {
      textGeneration: 'Text Generation',
      imageGeneration: 'Image Generation',
      codeGeneration: 'Code Generation',
      dataAnalysis: 'Data Analysis',
      chatbot: 'Chatbot'
    }
  },
  learning: {
    title: 'Learning Paths',
    subtitle: 'Master AI through structured courses and hands-on practice',
    allCourses: 'All Courses',
    myProgress: 'My Progress',
    categories: 'Categories',
    difficulty: 'Difficulty',
    duration: 'Duration',
    rating: 'Rating',
    enrolled: 'Enrolled',
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    startCourse: 'Start Course',
    continueCourse: 'Continue Course',
    courseCompleted: 'Course Completed!',
    nextLesson: 'Next Lesson',
    previousLesson: 'Previous Lesson',
    takeQuiz: 'Take Quiz',
    submitAssignment: 'Submit Assignment',
    downloadCertificate: 'Download Certificate',
    courseCategories: {
      fundamentals: 'AI Fundamentals',
      machineLearning: 'Machine Learning',
      deepLearning: 'Deep Learning',
      nlp: 'Natural Language Processing',
      computerVision: 'Computer Vision',
      ethics: 'AI Ethics',
      applications: 'AI Applications',
      tools: 'AI Tools'
    },
    difficulties: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    }
  },
  community: {
    title: 'Community',
    subtitle: 'Connect, share, and learn together with fellow AI enthusiasts',
    newPost: 'New Post',
    trending: 'Trending',
    recent: 'Recent',
    unanswered: 'Unanswered',
    myPosts: 'My Posts',
    categories: 'Categories',
    search: 'Search posts...',
    reply: 'Reply',
    like: 'Like',
    unlike: 'Unlike',
    report: 'Report',
    edit: 'Edit',
    delete: 'Delete',
    postCategories: {
      question: 'Question',
      discussion: 'Discussion',
      showcase: 'Showcase',
      announcement: 'Announcement',
      help: 'Help'
    }
  },
  campaigns: {
    title: 'Campaigns',
    subtitle: 'Join AI advocacy and awareness campaigns to make a difference',
    active: 'Active Campaigns',
    upcoming: 'Upcoming',
    completed: 'Completed',
    myCampaigns: 'My Campaigns',
    createCampaign: 'Create Campaign',
    joinCampaign: 'Join Campaign',
    leaveCampaign: 'Leave Campaign',
    participants: 'Participants',
    activities: 'Activities',
    rewards: 'Rewards',
    progress: 'Progress',
    deadline: 'Deadline',
    status: {
      draft: 'Draft',
      active: 'Active',
      paused: 'Paused',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    categories: {
      awareness: 'Awareness',
      advocacy: 'Advocacy',
      education: 'Education',
      competition: 'Competition',
      hackathon: 'Hackathon'
    }
  },
  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    viewPublic: 'View Public Profile',
    achievements: 'Achievements',
    statistics: 'Statistics',
    activity: 'Activity',
    preferences: 'Preferences',
    avatar: 'Profile Picture',
    bio: 'Bio',
    location: 'Location',
    website: 'Website',
    socialMedia: 'Social Media',
    expertise: 'Areas of Expertise',
    interests: 'Interests',
    joinedDate: 'Joined {{date}}',
    lastActive: 'Last active {{date}}'
  },
  settings: {
    title: 'Settings',
    account: 'Account',
    privacy: 'Privacy',
    notifications: 'Notifications',
    accessibility: 'Accessibility',
    language: 'Language',
    theme: 'Theme',
    advanced: 'Advanced',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    exportData: 'Export Data',
    themes: {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    languages: {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      zh: '中文',
      ja: '日本語'
    }
  },
  errors: {
    404: 'Page Not Found',
    500: 'Internal Server Error',
    offline: 'You are offline',
    networkError: 'Network Error',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    rateLimited: 'Too Many Requests',
    maintenance: 'Under Maintenance',
    generic: 'Something went wrong',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
    reportIssue: 'Report Issue'
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email',
    minLength: 'Must be at least {{min}} characters',
    maxLength: 'Must be no more than {{max}} characters',
    password: 'Password must contain at least 8 characters with uppercase, lowercase, and numbers',
    confirmPassword: 'Passwords must match',
    username: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
  },
  toast: {
    success: 'Success!',
    error: 'Error!',
    warning: 'Warning!',
    info: 'Info'
  }
} as const

// Spanish translations (partial - you would expand this)
const es = {
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    // ... more translations
  },
  navigation: {
    home: 'Inicio',
    dashboard: 'Panel',
    playground: 'Laboratorio de IA',
    // ... more translations
  }
  // ... more sections
} as const

const resources = {
  en: { translation: en },
  es: { translation: es }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'ai-democratizer-language',
      caches: ['localStorage']
    },
    
    react: {
      useSuspense: false
    }
  })

export default i18n
