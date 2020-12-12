import { ReplaceFieldWithFragment } from 'graphql-tools';
import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    posts: parent =>
      prisma.posts({
        where: {
          user: {
            id: parent.id,
          },
        },
      }),
    likes: parent =>
      prisma.likes({
        where: {
          user: {
            id: parent.id,
          },
        },
      }),
    tradeHistory: parent =>
      prisma.reservations({
        where: {
          user: {
            id: parent.id,
          },
        },
      }), ///내가 신청한 것들(상대방이 수락 거절해줘야함)
    reviews: parent =>
      prisma.reviews({
        where: {
          borrower: {
            id: parent.id,
          },
        },
      }),
    postsCount: parent => {
      const posts = prisma
        .postsConnection({
          where: {
            user: {
              id: parent.id,
            },
          },
        })
        .aggregate()
        .count();
      console.log(posts);
      return posts;
    },
    likesCount: parent => {
      return 1;
    },
    myReservation: async parent => {
      const posts = await prisma.posts({ where: { user: { id: parent.id } } }); //그 유저가 가진 게시물 가져옴
      //게시물들이 가진 리절베이션들을 가져와야함
      // ///그럼어케함
      // const reservations = prisma.reservations({
      //   where: { post: { OR: { id_in: posts.map((item) => item.id) } } },
      // });
      const reservations = prisma.reservations({
        where: { post: { id_in: posts.map(item => item.id) } },
      });
      return reservations;
    }, ///내가 올린 게시물의 걸려있는 예약(내가 수락거절해야함)

    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
