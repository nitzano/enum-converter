import { gql } from "apollo-server";
import { version } from "enum-converter";

function getEnumcVersion(): string {
  return version;
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
