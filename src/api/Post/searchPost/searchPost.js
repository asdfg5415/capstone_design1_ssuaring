import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      const posts = await prisma.posts({
        where: {
          OR: [{ title_contains: term }, { caption_contains: term }],
        },
      });
      return posts;
    },
  },
};
