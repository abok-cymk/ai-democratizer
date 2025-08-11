import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t('settings.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          Customize your AI Democratizer experience.
        </p>
        
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">Settings</h3>
          <p className="text-muted-foreground">
            User preferences and settings panel coming soon!
          </p>
        </div>
      </motion.div>
    </div>
  )
}
