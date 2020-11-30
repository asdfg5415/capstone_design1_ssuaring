import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      
      try {
        const returnUser = await prisma.user({ id: user.id });
        return returnUser;
      } catch (error) {
        console.log("에러발생!");
        console.log(error);
      }
    },
  },
};
