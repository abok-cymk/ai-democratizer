import bcrypt from 'bcryptjs'
import { Context, requireAuth, generateToken } from '../../lib/context.js'
import { ValidationError, AuthenticationError, ConflictError } from '../../middleware/errorHandler.js'
import { logger } from '../../lib/logger.js'
import { z } from 'zod'

// Input validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be no more than 50 characters'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be no more than 50 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
})

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

interface RegisterInput {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
}

interface LoginInput {
  email: string
  password: string
}

export const authResolvers = {
  Query: {
    // Get current authenticated user
    me: async (parent: any, args: any, context: Context) => {
      if (!context.isAuthenticated || !context.user) {
        return null
      }
      return context.user
    },
  },

  Mutation: {
    // User registration
    register: async (parent: any, { input }: { input: RegisterInput }, context: Context) => {
      try {
        // Validate input
        const validatedInput = registerSchema.parse(input)

        // Check if user already exists
        const existingUser = await context.prisma.user.findFirst({
          where: {
            OR: [
              { email: validatedInput.email },
              { username: validatedInput.username }
            ]
          }
        })

        if (existingUser) {
          if (existingUser.email === validatedInput.email) {
            throw new ConflictError('An account with this email already exists')
          }
          if (existingUser.username === validatedInput.username) {
            throw new ConflictError('This username is already taken')
          }
        }

        // Hash password
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
        const hashedPassword = await bcrypt.hash(validatedInput.password, saltRounds)

        // Create user
        const user = await context.prisma.user.create({
          data: {
            email: validatedInput.email,
            username: validatedInput.username,
            firstName: validatedInput.firstName,
            lastName: validatedInput.lastName,
            password: hashedPassword,
          },
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
          }
        })

        // Generate JWT token
        const token = generateToken(user)

        logger.info(`User registered successfully: ${user.email}`, {
          userId: user.id,
          username: user.username,
          ip: context.ip
        })

        return {
          token,
          user
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const message = error.errors.map(e => e.message).join(', ')
          throw new ValidationError(message)
        }
        throw error
      }
    },

    // User login
    login: async (parent: any, { input }: { input: LoginInput }, context: Context) => {
      try {
        // Validate input
        const validatedInput = loginSchema.parse(input)

        // Find user by email
        const user = await context.prisma.user.findUnique({
          where: { email: validatedInput.email },
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
            password: true,
            createdAt: true,
            updatedAt: true,
          }
        })

        if (!user) {
          throw new AuthenticationError('Invalid email or password')
        }

        if (!user.isActive) {
          throw new AuthenticationError('Account is disabled. Please contact support.')
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(validatedInput.password, user.password)
        
        if (!isPasswordValid) {
          throw new AuthenticationError('Invalid email or password')
        }

        // Update last active timestamp
        await context.prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() }
        })

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user

        // Generate JWT token
        const token = generateToken(userWithoutPassword)

        logger.info(`User logged in successfully: ${user.email}`, {
          userId: user.id,
          username: user.username,
          ip: context.ip
        })

        return {
          token,
          user: userWithoutPassword
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const message = error.errors.map(e => e.message).join(', ')
          throw new ValidationError(message)
        }
        throw error
      }
    },

    // User logout (mainly for logging purposes, token management is client-side)
    logout: async (parent: any, args: any, context: Context) => {
      const user = requireAuth(context)
      
      logger.info(`User logged out: ${user.email}`, {
        userId: user.id,
        username: user.username,
        ip: context.ip
      })

      return true
    },
  },
}
