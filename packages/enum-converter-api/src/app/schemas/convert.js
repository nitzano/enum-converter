import { gql } from 'apollo-server-express';
import {
  dumpers,
  EnumsOrder,
  LanguageSuffix,
  parsers,
  StringStyle,
  ValuesOrder
} from 'enum-converter';
import { entries, map, values } from 'lodash';

function flatOption(obj) {
  return map(entries(obj), element => ({
    value: element[1],
    label: element[0]
  }));
}

export const convertTypeDefs = gql`
  extend type Query {
    parsers: [String]
    dumpers: [String]
    stringStyles: [SelectOption]
    enumsOrder: [SelectOption]
    valuesOrder: [SelectOption]
    languageSuffix: [SelectOption]
  }

  type SelectOption {
    value: String
    label: String
  }
`;

export const convertResolvers = {
  Query: {
    parsers: () => map(values(parsers), 'language'),
    dumpers: () => map(values(dumpers), 'language'),
    stringStyles: () => flatOption(StringStyle),
    enumsOrder: () => flatOption(EnumsOrder),
    valuesOrder: () => flatOption(ValuesOrder),
    languageSuffix: () => flatOption(LanguageSuffix)
  }
};
