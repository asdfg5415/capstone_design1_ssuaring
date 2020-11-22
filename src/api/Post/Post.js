import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: (parent) => {
      return prisma.files({
        where: {
          post: {
            id: parent.id,
          },
        },
      });
    },
  },
};
