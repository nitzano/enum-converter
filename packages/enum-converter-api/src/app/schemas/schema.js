import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { convertResolvers, convertTypeDefs } from './convert';
import { queryResolvers, queryTypeDef } from './query';
import { versionResolvers, versionTypeDefs } from './version';

const typeDefs = [queryTypeDef, versionTypeDefs, convertTypeDefs];

const resolvers = [queryResolvers, versionResolvers, convertResolvers];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({ schema });
