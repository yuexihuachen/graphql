import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
/**
 * @description 解析器
 */
import { books } from "./books"
import { resolved, hello } from "./product"

export const resolvers = {
    Query: {
        hello,
        resolved,
        books
    }
}
