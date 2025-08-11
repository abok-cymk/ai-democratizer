import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Heart, 
  Eye, 
  Clock,
  User,
  Plus,
  Search,
  Filter,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Users,
  Pin
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'

// Mock data
const mockPosts = [
  {
    id: '1',
    title: 'How to get started with transformer models?',
    content: 'I\'m new to AI and heard a lot about transformer models. Can someone explain the basics and point me to good resources?',
    author: {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/placeholder-avatar.jpg',
      level: 5,
      badges: ['Curious Learner']
    },
    category: 'question',
    tags: ['transformers', 'beginner', 'resources'],
    likes: 23,
    views: 156,
    commentCount: 8,
    isSticky: false,
    createdAt: '2024-01-22T10:30:00Z',
    lastActivity: '2024-01-22T15:45:00Z'
  },
  {
    id: '2',
    title: 'Built a sentiment analysis tool - sharing my experience',
    content: 'Just finished building a sentiment analysis tool using BERT. Here are the key lessons I learned and some tips for others attempting similar projects...',
    author: {
      id: '2',
      name: 'Alex Rodriguez',
      avatar: '/placeholder-avatar.jpg',
      level: 12,
      badges: ['Code Explorer', 'Community Helper']
    },
    category: 'showcase',
    tags: ['sentiment analysis', 'BERT', 'project'],
    likes: 45,
    views: 234,
    commentCount: 15,
    isSticky: true,
    createdAt: '2024-01-21T16:20:00Z',
    lastActivity: '2024-01-22T14:10:00Z'
  },
  {
    id: '3',
    title: 'Weekly AI News Discussion - January 2024',
    content: 'Let\'s discuss the latest developments in AI this week. What caught your attention?',
    author: {
      id: '3',
      name: 'Emma Watson',
      avatar: '/placeholder-avatar.jpg',
      level: 20,
      badges: ['AI Enthusiast', 'Discussion Leader', 'Moderator']
    },
    category: 'discussion',
    tags: ['weekly', 'news', 'discussion'],
    likes: 34,
    views: 189,
    commentCount: 22,
    isSticky: true,
    createdAt: '2024-01-21T08:00:00Z',
    lastActivity: '2024-01-22T16:20:00Z'
  },
  {
    id: '4',
    title: 'Help with PyTorch installation on M1 Mac',
    content: 'Having trouble installing PyTorch on my M1 MacBook. Getting compatibility errors. Any solutions?',
    author: {
      id: '4',
      name: 'Michael Kim',
      avatar: '/placeholder-avatar.jpg',
      level: 3,
      badges: ['New Member']
    },
    category: 'help',
    tags: ['pytorch', 'installation', 'mac', 'm1'],
    likes: 12,
    views: 78,
    commentCount: 6,
    isSticky: false,
    createdAt: '2024-01-22T09:15:00Z',
    lastActivity: '2024-01-22T12:30:00Z'
  }
]

const categories = [
  { name: 'all', label: 'All Posts', icon: MessageCircle, count: mockPosts.length },
  { name: 'question', label: 'Questions', icon: HelpCircle, count: mockPosts.filter(p => p.category === 'question').length },
  { name: 'discussion', label: 'Discussions', icon: MessageCircle, count: mockPosts.filter(p => p.category === 'discussion').length },
  { name: 'showcase', label: 'Showcase', icon: Lightbulb, count: mockPosts.filter(p => p.category === 'showcase').length },
  { name: 'help', label: 'Help', icon: Users, count: mockPosts.filter(p => p.category === 'help').length },
]

const sortOptions = [
  { value: 'latest', label: 'Latest Activity' },
  { value: 'newest', label: 'Newest Posts' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'unanswered', label: 'Unanswered' }
]

export default function CommunityPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const PostCard = ({ post }: { post: typeof mockPosts[0] }) => (
    <motion.div
      layout
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 ai-interactive"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {post.isSticky && <Pin className="w-4 h-4 text-yellow-600" />}
                <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer line-clamp-2">
                  {post.title}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.content}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  <span>•</span>
                  <span>Level {post.author.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatRelativeTime(post.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

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
              {t('community.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('community.subtitle')}
            </p>
          </div>
          
          {user && (
            <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              {t('community.newPost')}
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('community.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors",
                        activeCategory === category.name
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span>{category.label}</span>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        activeCategory === category.name
                          ? "bg-primary-foreground/20"
                          : "bg-muted"
                      )}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>
              
              {/* Community Stats */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-medium text-foreground mb-3">Community Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Posts</span>
                    <span className="font-medium">{mockPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Today</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="font-medium">2,341</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
                  </p>
                  {user && (
                    <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="mt-8 text-center">
                <button className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors">
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
