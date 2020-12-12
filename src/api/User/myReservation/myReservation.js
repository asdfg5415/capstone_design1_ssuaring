import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myReservation: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
    },
  },
};
