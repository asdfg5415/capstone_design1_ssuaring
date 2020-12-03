import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
        const {id,title,price,caption,period,category} = args;
        try{
            const Post = await prisma.updatePost({
                where:{
                    id:id
                },
                data:{
                    title,
                    price,
                    caption,
                    period,
                    category
                }
            })
            return Post;
        }catch(error){
            console.log(error);
            console.log("수정오류발생!")
        }
        
    }       
  },
}
