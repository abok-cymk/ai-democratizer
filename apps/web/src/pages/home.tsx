import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  FlaskConical, 
  BookOpen, 
  Users, 
  Trophy,
  Brain,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export default function HomePage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const features = [
    {
      icon: FlaskConical,
      title: t('home.features.playground.title'),
      description: t('home.features.playground.description'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: t('home.features.learning.title'),
      description: t('home.features.learning.description'),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: t('home.features.community.title'),
      description: t('home.features.community.description'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: t('home.features.gamification.title'),
      description: t('home.features.gamification.description'),
      gradient: 'from-yellow-500 to-orange-500'
    }
  ]

  const stats = [
    { label: t('home.stats.users', { count: '10,000' }), value: '10K+' },
    { label: t('home.stats.courses', { count: '50' }), value: '50+' },
    { label: t('home.stats.playground', { count: '100,000' }), value: '100K+' },
    { label: t('home.stats.community', { count: '5,000' }), value: '5K+' }
  ]

  const benefits = [
    {
      icon: Brain,
      title: 'Learn by Doing',
      description: 'Hands-on experience with real AI models and tools'
    },
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Engage with AI concepts through dynamic, visual experiences'
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Practice and experiment without any risk or limitations'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with learners and experts from around the world'
    }
  ]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="ai-gradient-text">
                  {t('home.hero.title')}
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t('home.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to={user ? "/dashboard" : "/register"}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl ai-interactive"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-foreground bg-background border border-border rounded-full hover:bg-accent transition-all duration-200 ai-interactive">
                {t('home.hero.watchDemo')}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to master AI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed to make AI learning accessible, engaging, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ai-interactive"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why choose AI Democratizer?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We believe AI education should be accessible, practical, and engaging for everyone, regardless of their technical background.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-green-500/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-purple-500/10 to-green-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to democratize AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already mastering AI concepts through our interactive platform.
            </p>
            
            <Link
              to={user ? "/dashboard" : "/register"}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary to-primary/80 rounded-full hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl ai-interactive"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
