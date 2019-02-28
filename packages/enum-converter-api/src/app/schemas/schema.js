import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { queryResolvers, queryTypeDef } from './query';
import { versionResolvers, versionTypeDefs } from './version';

const typeDefs = [queryTypeDef, versionTypeDefs];

const resolvers = [queryResolvers, versionResolvers];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({ schema });
