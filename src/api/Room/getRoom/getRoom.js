import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        getRoom: async (_, { id }, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const canSee = await prisma.$exist.room({
                participants_some: {
                    id: user.id
                }
            });
            if (canSee) {
                return prisma.rooms({ id });
            } else {
                throw Error("볼 수 없습니다.");
            }
        }
    }
};