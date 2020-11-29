import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAllPost: async () => {
      return await prisma.posts();
    },
  },
};
