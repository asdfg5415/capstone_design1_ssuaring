import { generateSecret, sendSecretSMS } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { phoneNumber } = args;
      const loginSecret = generateSecret();
      console.log('[requestSecret]', phoneNumber, loginSecret);
      try {
        const exists = await prisma.$exists.user({ phoneNumber });
        // 회원가입된 전화번호가 아닐 경우 User 생성
        if (!exists) {
          console.log('user created');
          await prisma.createUser({
            phoneNumber,
          });
        }
        await prisma.updateUser({
          data: { loginSecret },
          where: { phoneNumber },
        });
        // await sendSecretSMS(phoneNumber, loginSecret);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
