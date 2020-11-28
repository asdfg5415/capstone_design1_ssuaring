import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editArea: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id },
      } = request;
      const { area } = args;
      console.log('editArea', id, area);

      try {
        const user = await prisma.updateUser({
          where: { id },
          data: { area, areaAuth: false },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
