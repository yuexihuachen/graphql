import { ApolloServer } from '@apollo/server';
import nodeEnv from 'kiwi-environment';

import typeDefs from "../graphql/schema/index";
import resolvers from "../graphql/resolvers/index";
import { formatError } from '../lib/formatError';
import { myPlugin, responsePlugin } from '../apolloPlugins/customPlugin';
import { correlationId } from '../apolloPlugins/correlationId';
import { rootTransaction } from '../apolloPlugins/rootTransaction';
import { headerLogger } from '../apolloPlugins/headerLogger';
import { queryLogger } from '../apolloPlugins/queryLogger';
import { errorLogger } from '../apolloPlugins/errorLogger';
import { formatResponse } from '../apolloPlugins/formatResponse';

const IS_PROD = nodeEnv.isProd();

const startApolloServer = async (options) => {
    const server = new ApolloServer(options)
    await server.start()
    return server
}

export async function apolloServer() {
    return await startApolloServer({
        typeDefs,
        resolvers,
        formatError,
        plugins: [
            responsePlugin,
            myPlugin,
            correlationId(),
            rootTransaction(),
            headerLogger({ whitelist: ['accept-language'] }),
            queryLogger(),
            errorLogger(),
            formatResponse()
        ],
        includeStacktraceInErrorResponses: true
    })
}

