import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        reservationOfBorrower: async(_, args) => {
            const { id } = args;
            return prisma.reservations({ where : {
                borrower : {
                    id
                }
            } });
        }
    }
}