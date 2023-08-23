/** Schema Definition Language (SDL) 字符串
 * @description 
 * Scalar
 * Object - This includes the three special root operation types: Query, Mutation, and Subscription.
 * Input
 * Enum
 * Union
 * Interface
 * @returns 
 */
import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync } from 'fs';
import path from 'path';

const bookPath = path.resolve(__dirname,'./books.graphql')
const books = readFileSync(bookPath, { encoding: 'utf-8' });
// import books from './books';
import product from './product';

const typeDefs = [books, product]

export default mergeTypeDefs(typeDefs)