import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { roomId, text, toId } = args;
            const { user } = request;
            let room;
            if (roomId === undefined){
                if(user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [{ id: toId}, { id: user.id }]
                        }
                    });
                }
            } else {
                room = await prisma.room({ id: roomId });
            }
            if (!room) {
                throw Error("존재하지 않는 채팅방입니다.");
            }
            return prisma.createMessage({
                text,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: { id: toId}
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
};