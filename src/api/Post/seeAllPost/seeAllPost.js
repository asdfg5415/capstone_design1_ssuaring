import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAllPost: async () => {
      console.log("SEE ALL POST")
      return await prisma.posts();
    },
  },
};
