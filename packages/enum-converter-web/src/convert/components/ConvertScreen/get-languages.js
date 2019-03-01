import { gql } from 'apollo-boost';

export const GET_LANGUAGES = gql`
  {
    parsers
    dumpers
  }
`;
