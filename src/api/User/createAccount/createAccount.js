
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({ username });
      const exists_email = await prisma.$exists.user({ email });

      if (exists | exists_email) {
        throw Error("이 유저는 이미 존재합니다");
      }
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
        phoneNumber
      });
      if (user !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
};
