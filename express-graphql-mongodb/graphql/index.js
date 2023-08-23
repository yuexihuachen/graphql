import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock';
import nodeEnv from 'kiwi-environment';

import typeDefs from "./types/index";
import { resolvers } from "./resolvers/index";

const IS_PROD = nodeEnv.isProd()

/**
 * 描述的是客户端应用程序可用的功能（本身是一个抽象的）
 * @description graphql schema
 * 
 */
let schema = addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers })
})

if (IS_PROD) {
    schema = makeExecutableSchema({ typeDefs, resolvers })
}

export {
    schema
}

// export const schema = makeExecutableSchema({ typeDefs, resolvers });

// export const schema = addMocksToSchema({
//     schema: makeExecutableSchema({ typeDefs, resolvers })
// })