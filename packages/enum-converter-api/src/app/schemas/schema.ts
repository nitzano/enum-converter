import { ApolloServer } from "apollo-server-express";
import { convertResolvers, convertTypeDefs } from "./convert";
import { optionsResolvers, optionsTypeDefs } from "./options";
import { queryResolvers, queryTypeDef } from "./query";
import { versionResolvers, versionTypeDefs } from "./version";

const typeDefs = [
  queryTypeDef,
  versionTypeDefs,
  convertTypeDefs,
  optionsTypeDefs,
];

const resolvers = [
  queryResolvers,
  versionResolvers,
  convertResolvers,
  optionsResolvers,
];


export const apolloServer = new ApolloServer({ typeDefs, resolvers });
