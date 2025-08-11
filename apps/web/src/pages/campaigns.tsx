import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Megaphone,
  Users,
  Calendar,
  Target,
  Award,
  Plus,
  Search,
  Filter,
  Clock,
  TrendingUp,
  CheckCircle,
  Play,
  MapPin,
  Globe,
  Hash
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'

// Mock data
const mockCampaigns = [
  {
    id: '1',
    title: 'AI Ethics Awareness Week',
    description: 'Join our week-long campaign to raise awareness about ethical AI development and its impact on society.',
    banner: '/placeholder-banner.jpg',
    organizer: {
      id: '1',
      name: 'AI Ethics Foundation',
      avatar: '/placeholder-org.jpg'
    },
    category: 'awareness',
    status: 'active',
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-01-27T23:59:59Z',
    participantCount: 1247,
    targetParticipants: 2000,
    activities: [
      { title: 'Share AI Ethics Article', points: 10, completed: 856 },
      { title: 'Attend Virtual Workshop', points: 25, completed: 432 },
      { title: 'Create Ethics Discussion Post', points: 15, completed: 234 }
    ],
    tags: ['ethics', 'awareness', 'education'],
    isJoined: true,
    userProgress: 65
  },
  {
    id: '2',
    title: 'Democratize AI Education',
    description: 'Help us create and share educational content to make AI learning accessible to everyone, regardless of background.',
    banner: '/placeholder-banner.jpg',
    organizer: {
      id: '2',
      name: 'Open AI Education',
      avatar: '/placeholder-org.jpg'
    },
    category: 'education',
    status: 'active',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-02-15T23:59:59Z',
    participantCount: 892,
    targetParticipants: 1500,
    activities: [
      { title: 'Create Tutorial Content', points: 30, completed: 156 },
      { title: 'Translate Learning Materials', points: 20, completed: 89 },
      { title: 'Mentor New Learners', points: 40, completed: 67 }
    ],
    tags: ['education', 'accessibility', 'community'],
    isJoined: false,
    userProgress: 0
  },
  {
    id: '3',
    title: 'AI for Social Good Challenge',
    description: 'Showcase how AI can solve real-world problems and create positive social impact in your community.',
    banner: '/placeholder-banner.jpg',
    organizer: {
      id: '3',
      name: 'TechForGood Initiative',
      avatar: '/placeholder-org.jpg'
    },
    category: 'competition',
    status: 'upcoming',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z',
    participantCount: 0,
    targetParticipants: 500,
    activities: [
      { title: 'Submit Project Proposal', points: 50, completed: 0 },
      { title: 'Build AI Solution', points: 100, completed: 0 },
      { title: 'Present to Judges', points: 75, completed: 0 }
    ],
    tags: ['competition', 'social-good', 'innovation'],
    isJoined: true,
    userProgress: 0
  },
  {
    id: '4',
    title: 'Women in AI Advocacy',
    description: 'Promoting diversity and inclusion in AI by highlighting contributions of women in the field.',
    banner: '/placeholder-banner.jpg',
    organizer: {
      id: '4',
      name: 'WomenInTech Global',
      avatar: '/placeholder-org.jpg'
    },
    category: 'advocacy',
    status: 'completed',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-14T23:59:59Z',
    participantCount: 2341,
    targetParticipants: 2000,
    activities: [
      { title: 'Share Success Stories', points: 15, completed: 1204 },
      { title: 'Attend Panel Discussion', points: 20, completed: 892 },
      { title: 'Nominate Role Models', points: 25, completed: 567 }
    ],
    tags: ['diversity', 'advocacy', 'women-in-tech'],
    isJoined: false,
    userProgress: 0
  }
]

const campaignCategories = [
  { name: 'all', label: 'All Campaigns', count: mockCampaigns.length },
  { name: 'active', label: 'Active', count: mockCampaigns.filter(c => c.status === 'active').length },
  { name: 'joined', label: 'My Campaigns', count: mockCampaigns.filter(c => c.isJoined).length },
  { name: 'upcoming', label: 'Upcoming', count: mockCampaigns.filter(c => c.status === 'upcoming').length },
]

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
}

const categoryColors = {
  awareness: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  education: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  advocacy: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  competition: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  hackathon: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function CampaignsPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'active' && campaign.status === 'active') ||
      (activeFilter === 'joined' && campaign.isJoined) ||
      (activeFilter === 'upcoming' && campaign.status === 'upcoming')
    
    const matchesSearch = searchQuery === '' ||
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const CampaignCard = ({ campaign }: { campaign: typeof mockCampaigns[0] }) => {
    const progress = (campaign.participantCount / campaign.targetParticipants) * 100
    const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))

    return (
      <motion.div
        layout
        className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ai-interactive"
      >
        {/* Banner */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 via-purple-500/20 to-green-500/20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Megaphone className="w-12 h-12 text-primary/60" />
          </div>
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              statusColors[campaign.status as keyof typeof statusColors]
            )}>
              {t(`campaigns.status.${campaign.status}`)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              categoryColors[campaign.category as keyof typeof categoryColors]
            )}>
              {t(`campaigns.categories.${campaign.category}`)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
              {campaign.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {campaign.description}
            </p>
          </div>

          {/* Organizer */}
          <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-3 h-3 text-primary" />
            </div>
            <span>by {campaign.organizer.name}</span>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Participants</span>
              <span className="font-medium">{campaign.participantCount.toLocaleString()}/{campaign.targetParticipants.toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          {campaign.status !== 'completed' && (
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{campaign.status === 'upcoming' ? 'Starts' : 'Ends'} {formatRelativeTime(campaign.status === 'upcoming' ? campaign.startDate : campaign.endDate)}</span>
              </div>
              {campaign.status === 'active' && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{daysLeft} days left</span>
                </div>
              )}
            </div>
          )}

          {/* User Progress */}
          {campaign.isJoined && campaign.userProgress > 0 && (
            <div className="mb-3 p-2 bg-primary/5 rounded-md">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium text-primary">{campaign.userProgress}%</span>
              </div>
              <div className="w-full bg-primary/20 rounded-full h-1">
                <div 
                  className="bg-primary rounded-full h-1 transition-all duration-300"
                  style={{ width: `${campaign.userProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center space-x-1 mb-4">
            {campaign.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {campaign.isJoined ? (
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Play className="w-4 h-4 mr-2" />
                Continue
              </button>
            ) : (
              <button 
                disabled={campaign.status === 'completed'}
                className={cn(
                  "flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors",
                  campaign.status === 'completed'
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <Plus className="w-4 h-4 mr-2" />
                {campaign.status === 'completed' ? 'Ended' : t('campaigns.joinCampaign')}
              </button>
            )}
            <button className="px-3 py-2 border border-border rounded-md hover:bg-accent transition-colors">
              Details
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('campaigns.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('campaigns.subtitle')}
            </p>
          </div>
          
          {user && (
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              {t('campaigns.createCampaign')}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold text-foreground">{mockCampaigns.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold text-foreground">{mockCampaigns.reduce((acc, c) => acc + c.participantCount, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Campaigns</p>
                <p className="text-2xl font-bold text-foreground">{mockCampaigns.filter(c => c.isJoined).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{mockCampaigns.filter(c => c.status === 'completed').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
            {campaignCategories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  activeFilter === category.name
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {category.label}
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-muted-foreground/20 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Campaigns Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CampaignCard campaign={campaign} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a campaign!'}
            </p>
            {user && (
              <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
