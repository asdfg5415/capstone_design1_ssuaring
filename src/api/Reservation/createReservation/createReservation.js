import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createReservation: async (_, args, { request, isAuthenticated }) => {
      // 1. 인증하고
      isAuthenticated(request);

      // 2. 정보 가져오기
      const { user } = request;
      const { postId, startDate, endDate } = args;

      const reservation = await prisma.createReservation({
        post: {
          connect: { id: postId },
        },
        borrower: {
          connect: { id: user.id },
        },
        status: "apply",
        startDate,
        endDate,
      });
      return reservation;
    },
  },
};
