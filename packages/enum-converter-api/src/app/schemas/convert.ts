import { gql } from "apollo-server-express";
import { convertString } from "enum-converter";

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
    // TODO: add types
    convert: (parent: any, args: any, context: any, info: any) => {
      const { source, configuration } = args;
      return convertString(source, configuration);
    },
  },
};
