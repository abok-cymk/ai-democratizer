import { Context } from '../../lib/context.js'

export const communityResolvers = {
  Query: {
    post: async (parent: any, args: any, context: Context) => null,
    posts: async (parent: any, args: any, context: Context) => ({ nodes: [], totalCount: 0, pageInfo: { hasNextPage: false, hasPreviousPage: false } }),
  },
  Mutation: {
    createPost: async (parent: any, args: any, context: Context) => null,
    updatePost: async (parent: any, args: any, context: Context) => null,
    deletePost: async (parent: any, args: any, context: Context) => false,
    likePost: async (parent: any, args: any, context: Context) => null,
    unlikePost: async (parent: any, args: any, context: Context) => null,
    createComment: async (parent: any, args: any, context: Context) => null,
    updateComment: async (parent: any, args: any, context: Context) => null,
    deleteComment: async (parent: any, args: any, context: Context) => false,
    likeComment: async (parent: any, args: any, context: Context) => null,
    unlikeComment: async (parent: any, args: any, context: Context) => null,
  },
  Subscription: {},
  Post: {},
  Comment: {},
}
