import { gql } from 'apollo-boost';

export const GET_VERSION = gql`
  {
    version
  }
`;
