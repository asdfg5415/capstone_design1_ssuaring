import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myReservation: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user);

      return await prisma.reservations({
        where : {
          borrower : {
            id : user.id
          }
        }
      });
    },
  },
};
