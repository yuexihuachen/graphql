import { buildSchema } from "graphql";

module.exports = buildSchema(`
type Query {
  hello: String
}
`);
