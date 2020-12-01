import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeAllPost: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return await prisma.posts({ orderBy: 'createdAt_DESC' });
    },
  },
};
