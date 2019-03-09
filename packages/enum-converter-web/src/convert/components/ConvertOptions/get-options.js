import { gql } from 'apollo-boost';

export const GET_OPTIONS = gql`
  {
    enumsOrder {
      value
      label
    }
    valuesOrder {
      value
      label
    }
    stringStyles {
      value
      label
    }
  }
`;
