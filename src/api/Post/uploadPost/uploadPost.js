import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    uploadPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { area, title, caption, price, files, period, category } = args;
      console.log('uploadPost', args, user.phoneNumber);
      const post = await prisma.createPost({
        area,
        title,
        caption,
        price,
        period,
        category,
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
