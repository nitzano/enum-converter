import { gql } from "apollo-server";

export const queryTypeDef = gql`
  type Query {
    _empty: String
  }
`;

export const queryResolvers = {
  Query: {
    _empty: () => null,
  },
};
