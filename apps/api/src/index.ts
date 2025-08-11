import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http'
import dotenv from 'dotenv'

// Import internal modules
import { createContext } from './lib/context.js'
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers/index.js'
import { prisma } from './lib/prisma.js'
import { errorHandler } from './middleware/errorHandler.js'
import { logger } from './lib/logger.js'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'

async function startServer() {
  // Create Express app
  const app = express()
  
  // Create HTTP server
  const httpServer = createServer(app)

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }))

  // Enable trust proxy for rate limiting behind reverse proxy
  app.set('trust proxy', 1)

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // max requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
  })

  app.use('/graphql', limiter)

  // CORS configuration
  const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  }

  app.use(cors(corsOptions))
  
  // Compression and parsing
  app.use(compression())
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Logging
  if (NODE_ENV !== 'test') {
    app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }))
  }

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
      logger.error('GraphQL Error:', err)
      
      // Don't expose internal errors in production
      if (NODE_ENV === 'production' && !err.message.startsWith('User')) {
        return new Error('Internal server error')
      }
      
      return err
    },
    introspection: NODE_ENV !== 'production',
  })

  // Start Apollo Server
  await server.start()

  // Apply GraphQL middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: createContext,
    }),
  )

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: NODE_ENV,
      version: process.env.npm_package_version || '1.0.0'
    })
  })

  // API info endpoint
  app.get('/api', (req, res) => {
    res.json({
      name: 'AI Democratizer API',
      version: '1.0.0',
      description: 'GraphQL API for the AI Democratizer platform',
      endpoints: {
        graphql: '/graphql',
        health: '/health'
      },
      documentation: NODE_ENV !== 'production' ? '/graphql' : null
    })
  })

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ 
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
      availableEndpoints: ['/api', '/health', '/graphql']
    })
  })

  // Global error handler
  app.use(errorHandler)

  // Graceful shutdown handler
  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`)
    
    httpServer.close(async () => {
      logger.info('HTTP server closed.')
      
      try {
        await prisma.$disconnect()
        logger.info('Database connection closed.')
        
        process.exit(0)
      } catch (error) {
        logger.error('Error during shutdown:', error)
        process.exit(1)
      }
    })
  }

  // Handle shutdown signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))

  // Start the server
  httpServer.listen(PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT}`)
    logger.info(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`)
    logger.info(`🏥 Health check: http://localhost:${PORT}/health`)
    logger.info(`🔧 Environment: ${NODE_ENV}`)
  })
}

// Start the server and handle any startup errors
startServer().catch((error) => {
  logger.error('Failed to start server:', error)
  process.exit(1)
})
