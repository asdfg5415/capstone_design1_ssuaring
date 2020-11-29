import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { area, title, caption, price, files } = args;
      console.log('uploadPost', args, user.phoneNumber);
      const post = await prisma.createPost({
        area,
        title,
        caption,
        price,
        category : 1,
        period : 7,
        user: { connect: { id: user.id } },
      });
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          })
      );
      return post;
    },
  },
};
