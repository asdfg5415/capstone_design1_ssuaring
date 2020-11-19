import './env';
import { GraphQLServer } from 'graphql-yoga';
import passport from "passport";
import schema from './schema';
import "./passport";
import { authenticateJwt } from './passport';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
  schema,
  context: ({ request }) => ({ request })
}); //그래프큐엘서버 받아옴. props=schema ===> schema는 쿼리 뮤테이션, 리졸버들이 포함되있음

server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ server starting http://localhost:${PORT}`)
); //서버온
