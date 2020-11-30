import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createReview: async (_, args, { request, isAuthenticated }) => {
      // 1. 인증하고
      isAuthenticated(request);

      // 2. 정보 가져오기
      const { user } = request;
      const { reservationId, text, star } = args;

      const review = await prisma.createReview({
        text,
        borrower: {
          connect: {
            id: user.id,
          },
        },
        reservation: {
          connect: {
            id: reservationId,
          },
        },
        star,
      });
      return review;
    },
  },
};
