import { gql } from "apollo-server";
import { getVersion } from "enum-converter";

function getEnumcVersion(): string {
  return getVersion();
}

export const versionTypeDefs = gql`
  extend type Query {
    version: String
  }
`;

export const versionResolvers = {
  Query: {
    version: () => getEnumcVersion(),
  },
};
