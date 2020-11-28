import { ReplaceFieldWithFragment } from "graphql-tools";
import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: (parent) =>
      prisma.posts({
        where: {
          user: {
            id: parent.id,
          },
        },
      }),
    likes: (parent) =>
      prisma.likes({
        where: {
          user: {
            id: parent.id,
          },
        },
      }),
    tradeHistory: (parent) =>
      prisma.reservations({
        where: {
          user: {
            id: parent.id,
          },
        },
      }),
    reviews: (parent) =>
      prisma.reviews({
        where: {
          borrower: {
            id: parent.id,
          },
        },
      }),
    postsCount: (parent) => {
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
    likesCount: (parent) => {
      return 1;
    },
    
  },
};
