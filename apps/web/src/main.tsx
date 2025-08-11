import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App.tsx'
import { ThemeProvider } from '@/components/providers/theme-provider.tsx'
import { ToastProvider } from '@/components/providers/toast-provider.tsx'
import ErrorBoundary from '@/components/error-boundary.tsx'
import '@/lib/i18n.ts'
import './index.css'

// Create a React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always'
    },
    mutations: {
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 2
      }
    }
  }
})

// Register service worker for PWA functionality
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  import('virtual:pwa-register').then(({ registerSW }) => {
    const updateSW = registerSW({
      onNeedRefresh() {
        // Show update available notification
        if (confirm('New content available. Reload?')) {
          updateSW(true)
        }
      },
      onOfflineReady() {
        console.log('App ready to work offline')
        // Show offline ready notification
      },
      onRegisterError(error) {
        console.error('SW registration error:', error)
      }
    })

    // Check for updates every hour
    setInterval(() => {
      updateSW()
    }, 60 * 60 * 1000)
  })
}

// Performance monitoring
if (import.meta.env.PROD) {
  // Web Vitals reporting
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)  
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeProvider>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
