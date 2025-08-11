import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger.js'

export interface ApiError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export class AppError extends Error implements ApiError {
  public statusCode: number
  public isOperational: boolean

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message)
    
    this.statusCode = statusCode
    this.isOperational = isOperational
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor)
  }
}

// Predefined error classes for common scenarios
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429)
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500)
  }
}

// Error handler middleware
export function errorHandler(
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(error)
  }

  // Default error properties
  let statusCode = 500
  let message = 'Internal Server Error'
  let isOperational = false

  // Handle custom ApiError instances
  if ('statusCode' in error && error.statusCode) {
    statusCode = error.statusCode
    message = error.message
    isOperational = error.isOperational ?? true
  }
  // Handle known error types
  else if (error.name === 'ValidationError') {
    statusCode = 400
    message = error.message
    isOperational = true
  }
  else if (error.name === 'CastError') {
    statusCode = 400
    message = 'Invalid data format'
    isOperational = true
  }
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid authentication token'
    isOperational = true
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Authentication token expired'
    isOperational = true
  }
  else if (error.message.includes('duplicate key')) {
    statusCode = 409
    message = 'Resource already exists'
    isOperational = true
  }
  // Handle Prisma errors
  else if (error.message.includes('Unique constraint')) {
    statusCode = 409
    message = 'Resource already exists'
    isOperational = true
  }
  else if (error.message.includes('Record to update not found')) {
    statusCode = 404
    message = 'Resource not found'
    isOperational = true
  }
  else if (error.message.includes('Foreign key constraint')) {
    statusCode = 400
    message = 'Invalid reference to related resource'
    isOperational = true
  }

  // Log the error
  const errorContext = {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
    statusCode,
    stack: error.stack,
  }

  if (statusCode >= 500) {
    logger.error(`Server Error: ${message}`, errorContext)
  } else if (statusCode >= 400) {
    logger.warn(`Client Error: ${message}`, errorContext)
  }

  // Prepare error response
  const errorResponse: any = {
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    }
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = error.stack
    errorResponse.error.details = error.message
  }

  // Include request ID if available
  if (req.headers['x-request-id']) {
    errorResponse.error.requestId = req.headers['x-request-id']
  }

  // Send error response
  res.status(statusCode).json(errorResponse)
}

// Async error handler wrapper
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// Global uncaught exception handler
export function setupGlobalErrorHandlers(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error)
    process.exit(1)
  })

  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Rejection:', reason)
    process.exit(1)
  })
}
