import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { readFile } from 'fs/promises';

let supergraphUpdate;
const gateway = new ApolloGateway({
  async supergraphSdl({ update }) {
    // `update` is a function which we'll save for later use
    supergraphUpdate = update;
    return {
      supergraphSdl: await readFile('./supergraph.graphql', 'utf-8'),
    }
  },
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});