import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    readAllComplain: async () => {
      return await prisma.complains();
    },
  },
};
