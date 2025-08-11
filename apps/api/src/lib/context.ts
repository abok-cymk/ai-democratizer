import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma.js'
import { logger } from './logger.js'
import type { User } from '@prisma/client'

export interface Context {
  prisma: typeof prisma
  req: Request
  res: Response
  user?: User
  isAuthenticated: boolean
  userAgent?: string
  ip?: string
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<Context> {
  let user: User | undefined
  let isAuthenticated = false

  // Extract token from Authorization header or cookies
  let token: string | undefined

  // Check Authorization header first (Bearer token)
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7) // Remove "Bearer " prefix
  }

  // Fallback to cookies if no Authorization header
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .reduce((acc, cookie) => {
        const [key, value] = cookie.split('=')
        acc[key] = decodeURIComponent(value)
        return acc
      }, {} as Record<string, string>)

    token = cookies['auth-token'] || cookies['token']
  }

  // If we have a token, try to decode and validate it
  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        logger.error('JWT_SECRET is not defined in environment variables')
        throw new Error('JWT configuration error')
      }

      // Verify and decode the JWT
      const decoded = jwt.verify(token, jwtSecret) as JWTPayload

      // Fetch user from database
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          bio: true,
          location: true,
          website: true,
          level: true,
          xp: true,
          streak: true,
          lastActive: true,
          theme: true,
          language: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          // Don't select password or sensitive fields
        },
      }) ?? undefined

      if (user && user.isActive) {
        isAuthenticated = true
        
        // Update last active timestamp
        prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() },
        }).catch(error => {
          logger.warn('Failed to update user last active timestamp:', error)
        })
      } else if (user && !user.isActive) {
        logger.warn(`Inactive user attempted to authenticate: ${user.email}`)
        user = undefined
      } else {
        logger.warn(`Token valid but user not found: ${decoded.userId}`)
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        logger.debug('JWT token expired')
      } else if (error instanceof jwt.JsonWebTokenError) {
        logger.debug('Invalid JWT token')
      } else {
        logger.error('JWT verification error:', error)
      }
      // Don't throw error here, just continue without authentication
    }
  }

  // Extract additional request information
  const userAgent = req.headers['user-agent']
  const ip = req.ip || req.connection.remoteAddress || 'unknown'

  const context: Context = {
    prisma,
    req,
    res,
    user,
    isAuthenticated,
    userAgent,
    ip,
  }

  // Log authentication status for debugging
  if (process.env.NODE_ENV === 'development') {
    logger.debug('GraphQL Context Created', {
      isAuthenticated,
      userId: user?.id,
      userEmail: user?.email,
      userAgent: userAgent?.substring(0, 50) + '...',
      ip,
    })
  }

  return context
}

// Helper function to require authentication
export function requireAuth(context: Context): User {
  if (!context.isAuthenticated || !context.user) {
    throw new Error('Authentication required. Please log in to continue.')
  }
  return context.user
}

// Helper function to require specific role
export function requireRole(context: Context, requiredRole: string | string[]): User {
  const user = requireAuth(context)
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  
  if (!roles.includes(user.role)) {
    throw new Error(`Insufficient permissions. Required role: ${roles.join(' or ')}`)
  }
  
  return user
}

// Helper function to check if user owns resource or is admin
export function requireOwnershipOrRole(
  context: Context, 
  resourceUserId: string, 
  allowedRoles: string[] = ['ADMIN', 'SUPER_ADMIN']
): User {
  const user = requireAuth(context)
  
  // Allow if user owns the resource
  if (user.id === resourceUserId) {
    return user
  }
  
  // Allow if user has required role
  if (allowedRoles.includes(user.role)) {
    return user
  }
  
  throw new Error('You can only access your own resources or need higher permissions.')
}

// Helper function to generate JWT token
export function generateToken(user: Pick<User, 'id' | 'email' | 'role'>): string {
  const jwtSecret = process.env.JWT_SECRET
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d'
  
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn,
      issuer: 'ai-democratizer',
      audience: 'ai-democratizer-app',
    }
  )
}
