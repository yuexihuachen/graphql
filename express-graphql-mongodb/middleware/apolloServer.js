import { ApolloServer } from '@apollo/server';
import typeDefs from "../graphql/schema/index";
import resolvers from "../graphql/resolvers/index";
const startApolloServer = async (options) => {
    const server = new ApolloServer(options)
    await server.start()
    return server
}

const formatError = (error) => {

	return error
}


  console.log('************************************************')
  console.log('************************************************')
//   console.log(gateway)
  

export async function apolloServer() {
    return await startApolloServer({
         typeDefs,
         resolvers,
         formatError
     })
}

