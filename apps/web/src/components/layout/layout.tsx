import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Home, 
  LayoutDashboard, 
  FlaskConical, 
  BookOpen, 
  Users, 
  Megaphone,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'

import { useAuthStore } from '@/store/auth'
import { useTheme } from '@/components/providers/theme-provider'
import { useToast } from '@/components/providers/toast-provider'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'home', href: '/', icon: Home },
  { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true },
  { name: 'playground', href: '/playground', icon: FlaskConical, protected: true },
  { name: 'learning', href: '/learning', icon: BookOpen, protected: true },
  { name: 'community', href: '/community', icon: Users, protected: true },
  { name: 'campaigns', href: '/campaigns', icon: Megaphone, protected: true },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { t } = useTranslation()
  const { user, logout } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const { success } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    success(t('auth.logoutSuccess'))
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun
      case 'dark': return Moon
      default: return Monitor
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold ai-gradient-text hidden sm:inline">
                AI Democratizer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                if (item.protected && !user) return null
                
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{t(`navigation.${item.name}`)}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                <ThemeIcon className="w-5 h-5" />
              </button>

              {/* User menu or auth buttons */}
              {user ? (
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('navigation.profile')}</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={t('navigation.settings')}
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={t('navigation.logout')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('auth.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {t('auth.register')}
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  if (item.protected && !user) return null
                  
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{t(`navigation.${item.name}`)}</span>
                    </Link>
                  )
                })}

                {/* Mobile user actions */}
                <div className="pt-4 border-t">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>{t('navigation.profile')}</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>{t('navigation.settings')}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors w-full text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>{t('navigation.logout')}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t('auth.login')}
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mt-2"
                      >
                        {t('auth.register')}
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold ai-gradient-text">
                  AI Democratizer
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making AI accessible to everyone through interactive learning and community engagement.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/learning" className="hover:text-foreground transition-colors">Courses</Link></li>
                <li><Link to="/playground" className="hover:text-foreground transition-colors">Playground</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/community" className="hover:text-foreground transition-colors">Forum</Link></li>
                <li><Link to="/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AI Democratizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
