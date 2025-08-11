import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { authResolvers } from './auth.js'
import { userResolvers } from './user.js'
import { courseResolvers } from './course.js'
import { playgroundResolvers } from './playground.js'
import { communityResolvers } from './community.js'
import { campaignResolvers } from './campaign.js'
import { achievementResolvers } from './achievement.js'
import { dashboardResolvers } from './dashboard.js'

export const resolvers = {
  // Scalar resolvers
  DateTime: DateTimeResolver,
  JSON: JSONResolver,

  // Query resolvers
  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...courseResolvers.Query,
    ...playgroundResolvers.Query,
    ...communityResolvers.Query,
    ...campaignResolvers.Query,
    ...achievementResolvers.Query,
    ...dashboardResolvers.Query,
  },

  // Mutation resolvers
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...playgroundResolvers.Mutation,
    ...communityResolvers.Mutation,
    ...campaignResolvers.Mutation,
    ...achievementResolvers.Mutation,
  },

  // Subscription resolvers
  Subscription: {
    ...communityResolvers.Subscription,
    ...campaignResolvers.Subscription,
  },

  // Type resolvers
  User: userResolvers.User,
  Course: courseResolvers.Course,
  Lesson: courseResolvers.Lesson,
  Post: communityResolvers.Post,
  Comment: communityResolvers.Comment,
  Campaign: campaignResolvers.Campaign,
  Achievement: achievementResolvers.Achievement,
}
