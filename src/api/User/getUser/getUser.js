import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    getUser: (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
