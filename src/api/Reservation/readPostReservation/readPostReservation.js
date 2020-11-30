import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    readPostReservation: async (_, args) => {
      const { id } = args;

      return await prisma.reservations({
        where: {
          post: {
            id,
          },
        },
      });
    },
  },
};
