import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    applyComplain: async (_, args, { request, isAuthenticated }) => {
      // 1. 인증하고
      isAuthenticated(request);

      // 2. 정보 가져오기
      const { user } = request;
      const { postId, text } = args;

      const complain = await prisma.createComplain({
        post: {
          connect: {
            id: postId,
          },
        },
        text,
        complainant: {
          connect: {
            id: user.id,
          },
        },
      });
      return complain;
    },
  },
};
