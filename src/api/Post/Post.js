import { prisma } from "../../../generated/prisma-client";

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
        .then((postId) => postId === user.id);
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
    category_string: ({ id }) => {
      const dict = {
        0: "기타",
        1: "유아동/유아도서",
        2: "남성패션/잡화",
        3: "여성의류",
        4: "여성잡화",
        5: "뷰티/미용",
        6: "생활/가공식품",
        7: "반려동물용품",
        8: "스포츠/레저",
        9: "도서/티켓/음반",
        10: "디지털/가전",
        11: "게임/취미",
        12: "가구/인테리어",
      };
      return prisma
        .post({ id })
        .category()
        .then((category) => dict[category]);
    },
    period_string: ({ id }) => {
      const dict = {
        1: "30분",
        2: "1시간",
        3: "2시간",
        4: "3시간 ",
        5: "5시간",
        6: "1일",
      };
      return prisma
        .post({ id })
        .period()
        .then((period) => dict[period]);
    },
  },
};
