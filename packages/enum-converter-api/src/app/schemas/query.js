import { gql } from 'apollo-server-express';

export const queryTypeDef = gql`
  type Query {
    _empty: String
  }
`;

export const queryResolvers = {
  Query: {
    _empty: () => null
  }
};
