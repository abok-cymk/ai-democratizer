import { Context } from '../../lib/context.js'

export const courseResolvers = {
  Query: {
    course: async (parent: any, args: any, context: Context) => null,
    courses: async (parent: any, args: any, context: Context) => ({ nodes: [], totalCount: 0, pageInfo: { hasNextPage: false, hasPreviousPage: false } }),
    lesson: async (parent: any, args: any, context: Context) => null,
  },
  Mutation: {
    createCourse: async (parent: any, args: any, context: Context) => null,
    enrollInCourse: async (parent: any, args: any, context: Context) => null,
    unenrollFromCourse: async (parent: any, args: any, context: Context) => false,
    updateLessonProgress: async (parent: any, args: any, context: Context) => null,
  },
  Course: {},
  Lesson: {},
}
