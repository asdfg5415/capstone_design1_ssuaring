import { prisma } from "../../../../generated/prisma-client"

export default {
    Mutation: {
        createRoom: (_, { toId }, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma. createRoom({
                participants: {
                    connect: [{ id: toId }, { id: user.id }]
                }
            });
        }
    }
}