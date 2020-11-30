import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    readPostReview: async (_, args) => {
      const { id } = args;

      return await prisma.reviews({
        where: {
          reservation: {
            post: {
              id,
            },
          },
        },
      });
    },
  },
};
