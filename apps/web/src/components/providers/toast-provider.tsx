import React, { createContext, useContext, useCallback, useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import type { Toast } from '@/types/global'

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: React.ReactNode
  maxToasts?: number
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100'
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const Icon = toastIcons[toast.type]
  
  React.useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id)
      }, toast.duration || 5000)
      
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        relative flex items-start gap-3 p-4 rounded-lg border shadow-sm max-w-md w-full
        ${toastStyles[toast.type]}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm leading-5">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-sm opacity-90 mt-1 leading-5">
            {toast.description}
          </p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="text-sm font-medium underline mt-2 hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newToast: Toast = { ...toast, id }
    
    setToasts(prev => {
      const updated = [...prev, newToast]
      return updated.slice(-maxToasts)
    })
  }, [maxToasts])
  
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const success = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: 'success' })
  }, [addToast])

  const error = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: 'error' })
  }, [addToast])

  const warning = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: 'warning' })
  }, [addToast])

  const info = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: 'info' })
  }, [addToast])

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info
    }}>
      {children}
      
      {/* Toast Container */}
      <div 
        className="fixed top-0 right-0 z-50 p-4 space-y-2 pointer-events-none"
        style={{ maxHeight: '100vh', overflow: 'hidden' }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem
                toast={toast}
                onRemove={removeToast}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
}
