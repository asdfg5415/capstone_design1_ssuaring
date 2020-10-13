import { generateSecret, sendSecretSMS } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { phoneNumber } = args;
      const loginSecret = generateSecret();
      console.log('[requestSecret]', phoneNumber, loginSecret);
      try {
        await sendSecretSMS(phoneNumber, loginSecret);
        await prisma.updateUser({
          data: { loginSecret },
          where: { phoneNumber },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
