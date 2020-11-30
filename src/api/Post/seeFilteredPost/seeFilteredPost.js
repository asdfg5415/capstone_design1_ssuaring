import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFilteredPost: async (_, args) => {
      const { category } = args;
      const filteredPosts = await prisma.posts({
        where: {
          category,
        },
      });
      return filteredPosts;
    },
  },
};
