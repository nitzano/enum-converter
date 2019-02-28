import { gql } from 'apollo-server-express';

export const convertTypeDefs = gql`
  extend type Query {
    parsers: [String]
    dumpers: [String]
  }
`;

export const convertResolvers = {
  Query: {
    parsers: () => [],
    dumpers: () => []
  }
};
