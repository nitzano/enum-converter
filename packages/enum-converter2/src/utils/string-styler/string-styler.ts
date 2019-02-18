const changeCase = require('change-case');
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
        return changeCase.camel(source);
      case StringStyle.ConstantCase:
        return changeCase.constantCase(source);
      case StringStyle.DotCase:
        return changeCase.dotCase(source);
      case StringStyle.HeaderCase:
        return changeCase.headerCase(source);
      case StringStyle.KebabCase:
        return changeCase.paramCase(source);
      case StringStyle.LowerCase:
        return changeCase.lowerCase(source);
      case StringStyle.ParamCase:
        return changeCase.paramCase(source);
      case StringStyle.PascalCase:
        return changeCase.pascalCase(source);
      case StringStyle.PathCase:
        return changeCase.pathCase(source);
      case StringStyle.SentenceCase:
        return changeCase.sentenceCase(source);
      case StringStyle.SnakeCase:
        return changeCase.snakeCase(source);
      case StringStyle.SwapCase:
        return changeCase.swapCase(source);
      case StringStyle.TitleCase:
        return changeCase.titleCase(source);
      case StringStyle.UpperCase:
        return changeCase.upperCase(source);
    }
  }

  return source;
}
