const { gql, ApolloServer } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const schema = { typeDefs, resolvers };

export const apolloServer = new ApolloServer(schema);
