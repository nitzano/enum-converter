import {
  addMockFunctionsToSchema,
  ApolloServer,
  makeExecutableSchema
} from 'apollo-server-express';
import { convertTypeDefs } from './convert';
import { queryResolvers, queryTypeDef } from './query';
import { versionResolvers, versionTypeDefs } from './version';

const typeDefs = [queryTypeDef, versionTypeDefs, convertTypeDefs];

const resolvers = [queryResolvers, versionResolvers];

const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({ schema });

export const apolloServer = new ApolloServer({ schema });
