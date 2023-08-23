export default `#graphql
type Event {
    id: ID!
    name: String
}

type Query {
  books: Int
  event: [Event!]!
  uuid: ID
}
`;