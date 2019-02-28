import { gql } from 'apollo-server-express';
import { dumpers, parsers } from 'enum-converter';
import { map, values } from 'lodash';
// console.log('enum', parsers, dumpers);

console.log('parsers', map(values(parsers), 'language'));

export const convertTypeDefs = gql`
  extend type Query {
    parsers: [String]
    dumpers: [String]
  }
`;

export const convertResolvers = {
  Query: {
    parsers: () => map(values(parsers), 'language'),
    dumpers: () => map(values(dumpers), 'language')
  }
};
