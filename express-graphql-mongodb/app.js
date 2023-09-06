import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan'; //日志中间件
import nodeEnv from 'kiwi-environment';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
//Apollo Server 4集成
import { expressMiddleware } from '@apollo/server/express4';

import authenticate from "./middleware/authenticate";
import { apolloServer } from "./middleware/apolloServer";

const app = express();
const httpServer = http.createServer(app);
const IS_DEV = nodeEnv.isDev();
const port = process.env.PORT || '3000';

async function initServer() {
  const server = await apolloServer()
  const middlewares = [
    bodyParser.json(),
    cookieParser(),
    authenticate,
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res, server }),
    })
  ]
  if (IS_DEV) {
    middlewares.unshift(cors(), logger('dev'))
  }

  app.use(...middlewares);

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost.com:${port}/graphql`);

  // app.listen(port, () => {
  //   if (IS_DEV) {
  //     console.log(`Listening on http://localhost.com:${port}`)
  //     console.log(
  //       `To view the schema or test queries, open http://localhost.com:${port}/graphql`
  //     )
  //   }
  // });
}

initServer()





