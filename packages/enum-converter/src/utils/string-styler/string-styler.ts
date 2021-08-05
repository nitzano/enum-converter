import {
  camelCase, constantCase,
  dotCase,
  headerCase, paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
} from "change-case";
import { lowerCase } from "lower-case";
import { swapCase } from "swap-case";
import { titleCase } from "title-case";
import { upperCase } from "upper-case";
import { StringStyle } from './string-styler.enums';

/**
 * style strings according to a give one
 *
 * @export
 * @param {string} source - source string
 * @param {StringStyle} stringStyle - target format
 * @returns
 */
export function styleString(source: string, stringStyle: StringStyle) {
  if (source && source.length) {
    switch (stringStyle) {
      case StringStyle.CamelCase:
        return camelCase(source);
      case StringStyle.ConstantCase:
        return constantCase(source);
      case StringStyle.DotCase:
        return dotCase(source);
      case StringStyle.HeaderCase:
        return headerCase(source);
      case StringStyle.KebabCase:
        return paramCase(source);
      case StringStyle.LowerCase:
        return lowerCase(source);
      case StringStyle.ParamCase:
        return paramCase(source);
      case StringStyle.PascalCase:
        return pascalCase(source);
      case StringStyle.PathCase:
        return pathCase(source);
      case StringStyle.SentenceCase:
        return sentenceCase(source);
      case StringStyle.SnakeCase:
        return snakeCase(source);
      case StringStyle.SwapCase:
        return swapCase(source);
      case StringStyle.TitleCase:
        return titleCase(source);
      case StringStyle.UpperCase:
        return upperCase(source);
    }
  }

  return source;
}
