import { gql } from 'apollo-server-express';
import { dumpers, parsers, StringStyle } from 'enum-converter';
import { entries, map, values } from 'lodash';

export const convertTypeDefs = gql`
  extend type Query {
    parsers: [String]
    dumpers: [String]
    stringStyles: [StringStyle]
  }

  type StringStyle {
    name: String
    label: String
  }
`;

export const convertResolvers = {
  Query: {
    parsers: () => map(values(parsers), 'language'),
    dumpers: () => map(values(dumpers), 'language'),
    stringStyles: () =>
      map(entries(StringStyle), element => ({
        name: element[1],
        label: element[0]
      }))
  }
};
