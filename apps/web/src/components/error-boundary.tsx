import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo)
    
    // Log error to monitoring service in production
    if (import.meta.env.PROD) {
      // TODO: Send to error monitoring service (e.g., Sentry)
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground mb-6">
                We're sorry for the inconvenience. The page encountered an unexpected error.
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <details className="text-left mb-6 p-4 bg-muted rounded-md">
                  <summary className="cursor-pointer font-medium text-destructive mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs text-muted-foreground overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md transition-colors"
              >
                Go Home
              </button>
              
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full text-muted-foreground hover:text-foreground px-4 py-2 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
