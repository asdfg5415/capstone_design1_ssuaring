import { use } from "passport";
import { prisma } from "../../../generated/prisma-client";

export default {
  Like: {
    user: async(parent) => {
      return await prisma
        .like({
          id: parent.id,
        })
        .user();
    },
    post: async(parent) => {
      return await prisma
        .like({
          id: parent.id,
        })
        .post();
    },
  },
};
