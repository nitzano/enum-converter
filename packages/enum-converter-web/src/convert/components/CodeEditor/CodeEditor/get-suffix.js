import { gql } from 'apollo-boost';

export const GET_SUFFIX = gql`
  {
    languageSuffix {
      value
      label
    }
  }
`;
