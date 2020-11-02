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
        if (!exists) {
          await prisma.createUser({
            phoneNumber,
            name: 'temp',
            nickname: 'temp',
            area: 'temp',
            areaAuth: false,
            email: 'temp',
            loginSecret: '',
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
