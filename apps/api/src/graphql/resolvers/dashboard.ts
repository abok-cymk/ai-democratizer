import { Context } from '../../lib/context.js'

export const dashboardResolvers = {
  Query: {
    dashboardStats: async (parent: any, args: any, context: Context) => ({
      totalUsers: 0,
      totalCourses: 0,
      totalPlaygroundSessions: 0,
      totalCampaigns: 0,
      activeCampaigns: 0,
      totalPosts: 0,
      userStats: context.user ? {
        level: context.user.level,
        xp: context.user.xp,
        streak: context.user.streak,
        coursesCompleted: 0,
        playgroundSessions: 0,
        postsCreated: 0,
        campaignsJoined: 0,
        achievementsUnlocked: 0,
      } : null,
    }),
  },
}
