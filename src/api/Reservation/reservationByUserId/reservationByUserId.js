import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        reservationByUserId: async(_, args) => {
            const { id } = args;
            return prisma.reservations({ where : {
                borrower : {
                    id
                }
            } });
        }
    }
}