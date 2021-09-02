import { gql } from "apollo-server";

function getVersion() {
  // TODO: use something else than require.resolve
  return "1.3.7-alpha";
}

export const versionTypeDefs = gql`
  extend type Query {
    version: String
  }
`;

export const versionResolvers = {
  Query: {
    version: () => getVersion(),
  },
};
