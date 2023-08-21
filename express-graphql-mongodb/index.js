const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); //日志中间件
const nodeEnv = require('kiwi-environment');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const mongoose = require("mongoose");

const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index")

const app = express();
const IS_DEV = nodeEnv.isDev();
const port = process.env.PORT || '3000';
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


server.start().then(() => {
  if (IS_DEV) {
    app.use(cors(), logger('dev'))
  }
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next()
  })

  app.use(bodyParser.json(),
    cookieParser(),
    expressMiddleware(server));

    httpServer.listen(port);

    httpServer.on('listening', () => {
      if (IS_DEV) {
        console.log(`Listening on http://localhost.com:${port}`)
        console.log(
          `To view the schema or test queries, open http://localhost.com:${port}/graphql`
        )
      }
    });




})

const uri = `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@clustergraphql.oqtebrr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
    console.log("success")
})
.catch(err => console.log(err))



