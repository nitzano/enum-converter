import { ApolloServer } from "apollo-server";
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

export const server = new ApolloServer({ typeDefs, resolvers });
