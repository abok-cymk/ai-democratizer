import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layout from '@/components/layout/layout'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { useAuthStore } from '@/store/auth'

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/home'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const PlaygroundPage = lazy(() => import('@/pages/playground'))
const LearningPage = lazy(() => import('@/pages/learning'))
const CommunityPage = lazy(() => import('@/pages/community'))
const CampaignsPage = lazy(() => import('@/pages/campaigns'))
const ProfilePage = lazy(() => import('@/pages/profile'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const LoginPage = lazy(() => import('@/pages/auth/login'))
const RegisterPage = lazy(() => import('@/pages/auth/register'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// Public Route wrapper (redirect if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

function App() {
  const { ready } = useTranslation()
  
  // Wait for i18n to be ready
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" id="main-content">
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingSpinner size="lg" className="fixed inset-0" />}>
                <LoginPage />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingSpinner size="lg" className="fixed inset-0" />}>
                <RegisterPage />
              </Suspense>
            </PublicRoute>
          }
        />
        
        {/* App routes with layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Suspense fallback={<LoadingSpinner size="lg" />}>
                <Routes>
                  <Route index element={<HomePage />} />
                  
                  {/* Protected routes */}
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="playground"
                    element={
                      <ProtectedRoute>
                        <PlaygroundPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="learning/*"
                    element={
                      <ProtectedRoute>
                        <LearningPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="community/*"
                    element={
                      <ProtectedRoute>
                        <CommunityPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="campaigns/*"
                    element={
                      <ProtectedRoute>
                        <CampaignsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* 404 page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </div>
  )
}

export default App
