import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    readUserComplain: async (_, args) => {
      const { id } = args;

      return await prisma.complains({
        where: {
          post: {
            user: {
              id,
            },
          },
        },
      });
    },
  },
};
