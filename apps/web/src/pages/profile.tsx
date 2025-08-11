import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/auth'

export default function ProfilePage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t('profile.title')}
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage your profile and view your progress.
        </p>
        
        <div className="bg-card rounded-lg border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">User Profile</h3>
          {user && (
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Level:</strong> {user.level}</p>
              <p><strong>XP:</strong> {user.xp}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
