import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy,
  Target,
  Flame,
  BookOpen,
  FlaskConical,
  Users,
  Megaphone,
  ChevronRight,
  Star,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'

// Mock data for demonstration
const mockAchievements = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first AI lesson',
    icon: '🎯',
    tier: 'bronze' as const,
    unlockedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Code Explorer',
    description: 'Ran your first playground session',
    icon: '⚡',
    tier: 'silver' as const,
    unlockedAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    title: 'Community Helper',
    description: 'Helped 5 fellow learners',
    icon: '🤝',
    tier: 'gold' as const,
    unlockedAt: '2024-01-20T09:15:00Z'
  }
]

const mockActivities = [
  {
    id: '1',
    type: 'course_progress',
    title: 'Completed "Introduction to Neural Networks"',
    timestamp: '2024-01-22T16:45:00Z',
    icon: BookOpen
  },
  {
    id: '2',
    type: 'playground',
    title: 'Created GPT-4 text generation session',
    timestamp: '2024-01-22T14:20:00Z',
    icon: FlaskConical
  },
  {
    id: '3',
    type: 'community',
    title: 'Answered question in "Machine Learning Basics"',
    timestamp: '2024-01-22T11:30:00Z',
    icon: Users
  }
]

const mockRecommendations = [
  {
    id: '1',
    type: 'course',
    title: 'Deep Learning Fundamentals',
    description: 'Perfect next step after completing AI Fundamentals',
    difficulty: 'intermediate',
    estimatedTime: '12h'
  },
  {
    id: '2',
    type: 'playground',
    title: 'Try Image Generation with DALL-E',
    description: 'Explore creative AI applications',
    difficulty: 'beginner',
    estimatedTime: '30min'
  }
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const nextLevelXP = ((Math.floor((user?.level || 1) / 10) + 1) * 1000)
  const progressToNext = ((user?.xp || 0) % 1000) / 10

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome', { name: user?.firstName || 'User' })}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.continueWhere')}
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-primary">{user?.level || 1}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              {t('dashboard.stats.level', { level: user?.level || 1 })}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">XP Progress</span>
                <span className="font-medium">{user?.xp || 0}/{nextLevelXP}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{user?.stats?.streak || 0}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              {t('dashboard.stats.streak', { days: user?.stats?.streak || 0 })}
            </h3>
            <p className="text-sm text-muted-foreground">Keep it up!</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{user?.stats?.coursesCompleted || 0}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Courses</h3>
            <p className="text-sm text-muted-foreground">
              {user?.stats?.coursesCompleted || 0} completed
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{user?.stats?.playgroundSessions || 0}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Playground</h3>
            <p className="text-sm text-muted-foreground">
              {user?.stats?.playgroundSessions || 0} sessions
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Achievements */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                {t('dashboard.achievements')}
              </h2>
              <Link to="/profile" className="text-sm text-primary hover:text-primary/80">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {mockAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-lg",
                    `ai-badge-${achievement.tier}`
                  )}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Award className={cn(
                    "w-4 h-4",
                    achievement.tier === 'gold' && "text-yellow-600",
                    achievement.tier === 'silver' && "text-gray-600",
                    achievement.tier === 'bronze' && "text-amber-600"
                  )} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              {t('dashboard.recentActivity')}
            </h2>
            <div className="space-y-4">
              {mockActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('dashboard.quickActions.title')}
            </h2>
            <div className="space-y-3">
              <Link
                to="/playground"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors ai-interactive"
              >
                <div className="flex items-center space-x-3">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{t('dashboard.quickActions.newPlayground')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              
              <Link
                to="/learning"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors ai-interactive"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-foreground">{t('dashboard.quickActions.continueLearning')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              
              <Link
                to="/community"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors ai-interactive"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-foreground">{t('dashboard.quickActions.visitCommunity')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              
              <Link
                to="/campaigns"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors ai-interactive"
              >
                <div className="flex items-center space-x-3">
                  <Megaphone className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-foreground">{t('dashboard.quickActions.joinCampaign')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecommendations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="p-4 rounded-lg border border-border hover:shadow-md transition-all ai-interactive"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className={cn(
                      "px-2 py-1 rounded-full font-medium",
                      item.difficulty === 'beginner' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      item.difficulty === 'intermediate' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    )}>
                      {item.difficulty}
                    </span>
                    <span>{item.estimatedTime}</span>
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-primary/80">
                    Start
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
