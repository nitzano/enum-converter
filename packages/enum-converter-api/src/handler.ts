import { ApolloServer } from "apollo-server-micro";
import { resolvers, typeDefs } from "./app/schemas/schema";

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server.start().then(() => server.createHandler());
