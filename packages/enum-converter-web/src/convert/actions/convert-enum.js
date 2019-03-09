import { gql } from 'apollo-boost';

export const CONVERT_ENUM = gql`
  query convertEnum($source: String!, $configuration: Configuration!) {
    convert(source: $source, configuration: $configuration)
  }
`;
