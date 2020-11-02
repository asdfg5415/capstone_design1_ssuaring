import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { phoneNumber, secret } = args;
      console.log('[confirmSecret]', args);

      const user = await prisma.user({ phoneNumber });
      console.log(user);
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: '' },
        });
        if (user.name === 'temp') {
          return 'SignUp';
        } else {
          return generateToken(user.id);
        }
      } else {
        throw Error('Wrong phoneNumber/secret combination');
      }
    },
  },
};
