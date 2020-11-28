import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        toggleLike:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);//로그인이 되었는지 확인
            //로그인이 안되어있으면 밑 실행 x
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND:[
                    {
                        user:{
                            id:user.id
                        },
                        post:{
                            id:postId
                        }
                    }
                ]
            }
            try{
                const existingLike = await prisma.$exists.like(filterOptions)
                    // $exists => AND의 변수들(속성들이) 겹친다면 true를 리턴한다. 겹치지 않으면 false)
                if(existingLike){
                    //DELETE EXISTINGLIKE
                    await prisma.deleteManyLikes(filterOptions)
                }else{
                    const newLike = await prisma.createLike({
                        user:{
                            connect:{
                                id:user.id
                            }
                        },
                        post:{
                            connect:{
                                id:postId
                            }
                        }           
                    })
                }
                return true    
                //confirmSecret -> TOKEN을 받으면 TOKEN을 HTTP HEADER에 삼입(로그인을 하는 행위라고 생각)-> toggleLike수행시 정상 수행.
            }catch{
                return false;
            }
        }
    }
}