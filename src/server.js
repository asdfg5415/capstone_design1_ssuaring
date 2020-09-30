import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema"

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema}) //그래프큐엘서버 받아옴. props=schema ===> schema는 쿼리 뮤테이션, 리졸버들이 포함되있음
server.start({ port: PORT }, () => console.log(`server starting http://localhost:${PORT}`));//서버온
