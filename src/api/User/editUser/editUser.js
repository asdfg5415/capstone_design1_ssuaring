import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, name, nickname } = args;
      console.log(name,nickname)
      try {
        const user = await prisma.updateUser({
          where: { id: id },
          data: { name: name, nickname: nickname },
        });
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
