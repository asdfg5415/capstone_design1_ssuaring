import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeLikePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const Likes = await prisma.likes({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      const posts = Likes.map((like)=>prisma.post({id}))
      console.log(posts);
      return posts;
      
    },
  },
};
