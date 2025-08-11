import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/global'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock user data
          const mockUser: User = {
            id: '1',
            email,
            username: email.split('@')[0] || 'user',
            firstName: 'Demo',
            lastName: 'User',
            role: 'student',
            level: 1,
            xp: 100,
            badges: [],
            preferences: {
              theme: 'system',
              language: 'en',
              notifications: {
                email: true,
                push: true,
                achievements: true,
                campaigns: true,
                community: true,
                updates: true
              },
              accessibility: {
                reduceMotion: false,
                highContrast: false,
                fontSize: 'medium',
                screenReader: false
              }
            },
            stats: {
              totalXP: 100,
              coursesCompleted: 0,
              playgroundSessions: 0,
              communityPosts: 0,
              campaignsJoined: 0,
              streak: 0,
              lastActive: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          set({ user: mockUser, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          })
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null })
        
        try {
          // TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock successful registration
          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'student',
            level: 1,
            xp: 0,
            badges: [],
            preferences: {
              theme: 'system',
              language: 'en',
              notifications: {
                email: true,
                push: true,
                achievements: true,
                campaigns: true,
                community: true,
                updates: true
              },
              accessibility: {
                reduceMotion: false,
                highContrast: false,
                fontSize: 'medium',
                screenReader: false
              }
            },
            stats: {
              totalXP: 0,
              coursesCompleted: 0,
              playgroundSessions: 0,
              communityPosts: 0,
              campaignsJoined: 0,
              streak: 0,
              lastActive: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          set({ user: mockUser, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          })
        }
      },

      logout: () => {
        set({ user: null, error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)
