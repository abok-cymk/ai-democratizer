import { PrismaClient } from '@prisma/client'
import { logger } from './logger.js'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  })

// Event listeners for Prisma logs
prisma.$on('query', (e) => {
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Query: ' + e.query)
    logger.debug('Params: ' + e.params)
    logger.debug('Duration: ' + e.duration + 'ms')
  }
})

prisma.$on('error', (e) => {
  logger.error('Prisma Error: ' + e.message)
})

prisma.$on('info', (e) => {
  logger.info('Prisma Info: ' + e.message)
})

prisma.$on('warn', (e) => {
  logger.warn('Prisma Warning: ' + e.message)
})

// Ensure connection is established
prisma.$connect()
  .then(() => {
    logger.info('✅ Database connected successfully')
  })
  .catch((error) => {
    logger.error('❌ Database connection failed:', error)
    process.exit(1)
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to handle database transactions with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      logger.warn(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error)
      
      if (attempt === maxRetries) {
        break
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  
  throw lastError!
}

// Helper function for safe database operations with error handling
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallbackValue?: T
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    logger.error('Database operation failed:', error)
    return fallbackValue ?? null
  }
}
