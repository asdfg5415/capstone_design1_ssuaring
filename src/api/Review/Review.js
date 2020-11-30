import { prisma } from "../../../generated/prisma-client";

export default {
  Review: {
    borrower: ({ id }) => prisma.review({ id }).borrower(),
    reservation: ({ id }) => prisma.review({ id }).reservation(),
  },
};
