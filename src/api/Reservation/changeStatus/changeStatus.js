import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    changeStatus: async (_, args, { request, isAuthenticated }) => {
      // 1. 인증하고
      isAuthenticated(request);

      // 2. 정보 가져오기
      const { user } = request;
      const {  id, status } = args;
      
      const reservation = await prisma.updateReservation({where:{
          id:id
      },data:{
          status
      }})
    
      
      ///
      return reservation;
    },
  },
};
