import { gql } from "apollo-server-express";
import {
  dumpers,
  EnumsOrder,
  LanguageSuffix,
  parsers,
  StringStyle,
  ValuesOrder,
} from "enum-converter";
import { capitalize, entries, map, values } from "lodash";

function createLanguageOptions(obj) {
  return values(obj)
    .map((entry) => entry.language)
    .map((entry) => ({
      value: entry,
      label: splitByCapital(capitalize(entry)),
    }));
}

function flatOption(obj) {
  return map(entries(obj), (element) => ({
    value: element[1],
    label: splitByCapital(element[0]),
  }));
}

function splitByCapital(str: string): string {
  return str.split(/(?=[A-Z])/).join(" ");
}

export const optionsTypeDefs = gql`
  extend type Query {
    parsers: [SelectOption]
    dumpers: [SelectOption]
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

export const optionsResolvers = {
  Query: {
    parsers: () => createLanguageOptions(parsers),
    dumpers: () => createLanguageOptions(dumpers),
    stringStyles: () => flatOption(StringStyle),
    enumsOrder: () => flatOption(EnumsOrder),
    valuesOrder: () => flatOption(ValuesOrder),
    languageSuffix: () => flatOption(LanguageSuffix),
  },
};
