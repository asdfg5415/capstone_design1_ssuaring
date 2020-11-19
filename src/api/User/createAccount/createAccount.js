import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, nickname, phoneNumber, area, email } = args;

      const user = await prisma.updateUser({
        where: { phoneNumber },
        data: { name, nickname, phoneNumber, area, email },
      });

      console.log(user);

      if (user !== undefined) {
        // 회원가입을 성공했을 경우 식별 토큰 반환
        return generateToken(user.id);
      } else {
        return false;
      }
    },
  },
};
