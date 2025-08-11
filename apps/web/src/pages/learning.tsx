import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Play, 
  CheckCircle, 
  BarChart3, 
  Filter,
  Grid,
  List,
  Trophy,
  Target,
  Brain
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'

// Mock data
const mockCourses = [
  {
    id: '1',
    title: 'AI Fundamentals',
    description: 'Introduction to artificial intelligence concepts, history, and applications.',
    thumbnail: '/placeholder-course.jpg',
    difficulty: 'beginner' as const,
    estimatedHours: 8,
    category: 'fundamentals' as const,
    instructor: 'Dr. Sarah Chen',
    rating: 4.8,
    reviewCount: 324,
    enrollmentCount: 1250,
    isEnrolled: true,
    progress: 65,
    tags: ['basics', 'history', 'concepts']
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    description: 'Learn the core concepts of machine learning algorithms and implementations.',
    thumbnail: '/placeholder-course.jpg',
    difficulty: 'intermediate' as const,
    estimatedHours: 12,
    category: 'machine-learning' as const,
    instructor: 'Prof. Alex Rodriguez',
    rating: 4.7,
    reviewCount: 198,
    enrollmentCount: 892,
    isEnrolled: true,
    progress: 25,
    tags: ['algorithms', 'supervised', 'unsupervised']
  },
  {
    id: '3',
    title: 'Neural Networks Deep Dive',
    description: 'Advanced exploration of neural network architectures and deep learning.',
    thumbnail: '/placeholder-course.jpg',
    difficulty: 'advanced' as const,
    estimatedHours: 16,
    category: 'deep-learning' as const,
    instructor: 'Dr. Michael Kim',
    rating: 4.9,
    reviewCount: 156,
    enrollmentCount: 567,
    isEnrolled: false,
    progress: 0,
    tags: ['deep learning', 'backpropagation', 'CNN']
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    description: 'Understanding how machines process and understand human language.',
    thumbnail: '/placeholder-course.jpg',
    difficulty: 'intermediate' as const,
    estimatedHours: 10,
    category: 'nlp' as const,
    instructor: 'Dr. Emma Watson',
    rating: 4.6,
    reviewCount: 243,
    enrollmentCount: 731,
    isEnrolled: false,
    progress: 0,
    tags: ['text processing', 'tokenization', 'sentiment']
  }
]

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function LearningPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const enrolledCourses = mockCourses.filter(course => course.isEnrolled)
  const displayCourses = activeTab === 'enrolled' ? enrolledCourses : mockCourses
  
  const filteredCourses = selectedDifficulty === 'all' 
    ? displayCourses 
    : displayCourses.filter(course => course.difficulty === selectedDifficulty)

  const CourseCard = ({ course, variant = 'grid' }: { course: any, variant?: 'grid' | 'list' }) => (
    <motion.div
      layout
      className={cn(
        "bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 ai-interactive overflow-hidden",
        variant === 'grid' ? "" : "flex items-center space-x-4 p-4"
      )}
    >
      {variant === 'grid' ? (
        <>
          <div className="aspect-video bg-muted flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full', difficultyColors[course.difficulty])}>
                {t(`learning.difficulties.${course.difficulty}`)}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {course.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.estimatedHours}h</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.enrollmentCount.toLocaleString()}</span>
              </div>
            </div>
            
            {course.isEnrolled && course.progress > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <button className={cn(
              "w-full py-2 px-4 rounded-md font-medium transition-colors",
              course.isEnrolled 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}>
              {course.isEnrolled ? (
                <div className="flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>{course.progress > 0 ? t('learning.continueCourse') : t('learning.startCourse')}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Enroll Now</span>
                </div>
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-14 bg-muted rounded flex-shrink-0 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', difficultyColors[course.difficulty])}>
                    {t(`learning.difficulties.${course.difficulty}`)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
              <button className={cn(
                "py-1.5 px-4 rounded-md font-medium text-sm transition-colors",
                course.isEnrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}>
                {course.isEnrolled ? 'Continue' : 'Enroll'}
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('learning.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('learning.subtitle')}
          </p>
        </div>

        {/* Stats */}
        {user && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-foreground">{enrolledCourses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {enrolledCourses.filter(c => c.progress === 100).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                activeTab === 'all' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t('learning.allCourses')}
            </button>
            {user && (
              <button
                onClick={() => setActiveTab('enrolled')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  activeTab === 'enrolled' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t('learning.myProgress')}
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <div className="flex items-center space-x-1 border border-border rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid/List */}
        <motion.div 
          layout
          className={cn(
            "gap-6",
            viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col space-y-4'
          )}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CourseCard course={course} variant={viewMode} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new courses.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
