import { Context } from '../../lib/context.js'

export const campaignResolvers = {
  Query: {
    campaign: async (parent: any, args: any, context: Context) => null,
    campaigns: async (parent: any, args: any, context: Context) => ({ nodes: [], totalCount: 0, pageInfo: { hasNextPage: false, hasPreviousPage: false } }),
  },
  Mutation: {
    createCampaign: async (parent: any, args: any, context: Context) => null,
    updateCampaign: async (parent: any, args: any, context: Context) => null,
    joinCampaign: async (parent: any, args: any, context: Context) => null,
    leaveCampaign: async (parent: any, args: any, context: Context) => false,
    updateCampaignProgress: async (parent: any, args: any, context: Context) => null,
  },
  Subscription: {},
  Campaign: {},
}
