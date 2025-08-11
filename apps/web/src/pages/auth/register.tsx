import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FlaskConical } from 'lucide-react'

export default function RegisterPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <Link to="/" className="inline-flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold ai-gradient-text">
            AI Democratizer
          </span>
        </Link>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {t('auth.register')}
        </h1>
        <p className="text-muted-foreground mb-8">
          Registration page coming soon! For now, you can use the demo login.
        </p>
        
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {t('auth.login')}
        </Link>
      </motion.div>
    </div>
  )
}
