import { Context } from '../../lib/context.js'

export const playgroundResolvers = {
  Query: {
    playgroundSession: async (parent: any, args: any, context: Context) => null,
    playgroundSessions: async (parent: any, args: any, context: Context) => [],
  },
  Mutation: {
    createPlaygroundSession: async (parent: any, args: any, context: Context) => null,
    updatePlaygroundSession: async (parent: any, args: any, context: Context) => null,
    deletePlaygroundSession: async (parent: any, args: any, context: Context) => false,
    executeCode: async (parent: any, args: any, context: Context) => null,
  },
}
