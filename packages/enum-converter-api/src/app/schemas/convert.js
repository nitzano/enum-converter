import { gql } from 'apollo-server-express';
import { convertString } from 'enum-converter';

export const convertTypeDefs = gql`
  extend type Query {
    convert(source: String!, configuration: Configuration!): String
  }

  input Configuration {
    from: String!
    to: String!
    emitFileName: Boolean
    emitStats: Boolean
    keyStyle: String
    nameStyle: String
    sortEnums: String
    sortValues: String
    valueStyle: String
  }
`;

export const convertResolvers = {
  Query: {
    convert: (parent, args, context, info) => {
      const { source, configuration } = args;
      console.log('source', source);
      const result = convertString(source, configuration);
      return result;
    }
  }
};
