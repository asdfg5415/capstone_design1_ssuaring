import { prisma } from '../../../generated/prisma-client';

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    user: ({ id }) => prisma.post({ id }).user(),
    isMine: ({ id }, _, { request }) => {
      const { user } = request;
      return prisma
        .post({ id })
        .user()
        .id()
        .then(postId => postId === user.id);
    },
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          {
            post: { id: parent.id },
          },
          {
            user: { id: user.id },
          },
        ],
      });
    },
    likeCount: ({ id }) =>
      prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    reservations: ({ id }) => prisma.post({ id }).reservations(),
    reservationCount: ({ id }) =>
      prisma
        .reservationsConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
  },
};
