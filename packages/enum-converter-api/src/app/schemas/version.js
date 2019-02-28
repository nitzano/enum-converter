import { gql } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { normalize } from 'path';

function getVersion() {
  const pathLocation = normalize(
    `${require.resolve('enum-converter')}/../../package.json`
  );

  const version = JSON.parse(readFileSync(pathLocation)).version;
  return version;
}

export const versionTypeDefs = gql`
  extend type Query {
    version: String
  }
`;

export const versionResolvers = {
  Query: {
    version: () => getVersion()
  }
};
