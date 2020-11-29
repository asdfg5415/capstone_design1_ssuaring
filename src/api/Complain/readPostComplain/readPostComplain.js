import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    readPostComplain: async (_, args) => {
      const { id } = args;

      return await prisma.complains({
        where: {
          post: {
            id,
          },
        },
      });
    },
  },
};
