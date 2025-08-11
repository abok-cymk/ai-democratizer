import { Context, requireAuth } from '../../lib/context.js'

export const userResolvers = {
  Query: {
    user: async (parent: any, { id }: { id: string }, context: Context) => {
      return await context.prisma.user.findUnique({
        where: { id },
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
    },
  },

  Mutation: {
    updateProfile: async (parent: any, { input }: any, context: Context) => {
      const user = requireAuth(context)
      
      return await context.prisma.user.update({
        where: { id: user.id },
        data: input,
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
    },
  },

  User: {
    fullName: (parent: any) => `${parent.firstName} ${parent.lastName}`,
    enrollments: async (parent: any, args: any, context: Context) => {
      return await context.prisma.courseEnrollment.findMany({
        where: { userId: parent.id }
      })
    },
    playgroundSessions: async (parent: any, args: any, context: Context) => {
      return await context.prisma.playgroundSession.findMany({
        where: { userId: parent.id }
      })
    },
    posts: async (parent: any, args: any, context: Context) => {
      return await context.prisma.post.findMany({
        where: { authorId: parent.id }
      })
    },
    achievements: async (parent: any, args: any, context: Context) => {
      return await context.prisma.userAchievement.findMany({
        where: { userId: parent.id }
      })
    },
    campaignParticipations: async (parent: any, args: any, context: Context) => {
      return await context.prisma.campaignParticipation.findMany({
        where: { userId: parent.id }
      })
    },
  },
}
