import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    userById: async (_, args) => {
      const { id } = args;
      const user = await prisma.user({ id });
      return user;
    },
  },
};
