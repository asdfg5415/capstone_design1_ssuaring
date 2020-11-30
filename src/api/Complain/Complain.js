import { prisma } from "../../../generated/prisma-client";

export default {
  Complain: {
    post: ({ id }) => prisma.complain({ id }).post(),
    complainant: ({ id }) => prisma.complain({ id }).complainant(),
  },
};
