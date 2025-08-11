import { Context } from '../../lib/context.js'

export const achievementResolvers = {
  Query: {
    achievements: async (parent: any, args: any, context: Context) => [],
    userAchievements: async (parent: any, args: any, context: Context) => [],
  },
  Mutation: {},
  Achievement: {},
}
