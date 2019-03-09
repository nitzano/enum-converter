import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { optionsResolvers, optionsTypeDefs } from './options';
import { queryResolvers, queryTypeDef } from './query';
import { versionResolvers, versionTypeDefs } from './version';

const typeDefs = [queryTypeDef, versionTypeDefs, optionsTypeDefs];

const resolvers = [queryResolvers, versionResolvers, optionsResolvers];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({ schema });
