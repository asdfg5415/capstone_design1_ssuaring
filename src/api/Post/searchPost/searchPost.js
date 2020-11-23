import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      console.log(term);
      const posts = await prisma.posts({
        where: {
          OR: [{ title_contains: term }, { caption_contains: term }],
        },
      });
      console.log(posts);
      return posts;
    },
  },
};
