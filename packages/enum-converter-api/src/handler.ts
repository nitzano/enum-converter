import { ApolloServer } from "apollo-server-micro";
import { resolvers, typeDefs } from "./app/schemas/schema";

export default new ApolloServer({
  typeDefs,
  resolvers,
}).createHandler({
  path: "/api/graphql",
});
