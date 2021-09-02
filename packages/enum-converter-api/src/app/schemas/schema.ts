import { ApolloServer } from "apollo-server";
import { convertResolvers, convertTypeDefs } from "./convert";
import { optionsResolvers, optionsTypeDefs } from "./options";
import { queryResolvers, queryTypeDef } from "./query";
import { versionResolvers, versionTypeDefs } from "./version";

export const typeDefs = [
  queryTypeDef,
  versionTypeDefs,
  convertTypeDefs,
  optionsTypeDefs,
];

export const resolvers = [
  queryResolvers,
  versionResolvers,
  convertResolvers,
  optionsResolvers,
];

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
