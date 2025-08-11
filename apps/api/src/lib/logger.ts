type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: any
}

class Logger {
  private logLevel: LogLevel

  constructor() {
    // Set log level based on environment
    const level = process.env.LOG_LEVEL?.toLowerCase() as LogLevel
    this.logLevel = level || (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    }
    
    return levels[level] >= levels[this.logLevel]
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    const levelStr = level.toUpperCase().padEnd(5)
    
    let logMessage = `[${timestamp}] ${levelStr} ${message}`
    
    if (data !== undefined) {
      if (typeof data === 'object' && data !== null) {
        try {
          logMessage += `\n${JSON.stringify(data, null, 2)}`
        } catch (error) {
          logMessage += `\n[Unserializable object: ${data.toString()}]`
        }
      } else {
        logMessage += ` ${data}`
      }
    }
    
    return logMessage
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(level)) {
      return
    }

    const formattedMessage = this.formatMessage(level, message, data)
    
    switch (level) {
      case 'debug':
        console.debug(formattedMessage)
        break
      case 'info':
        console.info(formattedMessage)
        break
      case 'warn':
        console.warn(formattedMessage)
        break
      case 'error':
        console.error(formattedMessage)
        break
    }
  }

  debug(message: string, data?: any): void {
    this.log('debug', message, data)
  }

  info(message: string, data?: any): void {
    this.log('info', message, data)
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data)
  }

  error(message: string, data?: any): void {
    this.log('error', message, data)
  }

  // Helper method for HTTP request logging
  request(method: string, url: string, statusCode: number, duration?: number): void {
    const message = `${method.toUpperCase()} ${url} ${statusCode}`
    const data = duration ? { duration: `${duration}ms` } : undefined
    
    if (statusCode >= 500) {
      this.error(message, data)
    } else if (statusCode >= 400) {
      this.warn(message, data)
    } else {
      this.info(message, data)
    }
  }

  // Helper method for GraphQL operation logging
  graphql(operationType: string, operationName: string, duration: number, hasErrors: boolean): void {
    const message = `GraphQL ${operationType}: ${operationName}`
    const data = { duration: `${duration}ms`, hasErrors }
    
    if (hasErrors) {
      this.warn(message, data)
    } else {
      this.debug(message, data)
    }
  }
}

export const logger = new Logger()

// Export types for external use
export type { LogLevel, LogEntry }
