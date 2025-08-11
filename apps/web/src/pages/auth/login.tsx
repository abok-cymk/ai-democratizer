import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, FlaskConical } from 'lucide-react'

import { useAuthStore } from '@/store/auth'
import { useToast } from '@/components/providers/toast-provider'
import LoadingSpinner from '@/components/ui/loading-spinner'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  const { success, error: showError } = useToast()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  React.useEffect(() => {
    clearError()
  }, [clearError])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      success(t('auth.loginSuccess'))
      navigate('/dashboard')
    } catch (err) {
      showError(t('auth.invalidCredentials'))
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold ai-gradient-text">
              AI Democratizer
            </span>
          </Link>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('auth.login')}
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full pl-10 pr-12 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring focus:ring-2"
              />
              <span className="ml-2 text-sm text-muted-foreground">
                {t('auth.rememberMe')}
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-4 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Signing in...
              </div>
            ) : (
              t('auth.login')
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-muted/50 rounded-md">
          <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials:</h3>
          <p className="text-xs text-muted-foreground">
            Email: demo@ai-democratizer.com<br />
            Password: any password will work in demo mode
          </p>
        </div>
      </motion.div>
    </div>
  )
}
