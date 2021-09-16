/**
 * All valid string styles
 *
 * @export
 * @enum {number}
 */
export enum StringStyle {
  CamelCase = 'camel',
  ConstantCase = 'constant',
  DotCase = 'dot',
  HeaderCase = 'header',
  KebabCase = 'kebab',
  LowerCase = 'lower',
  ParamCase = 'param',
  PascalCase = 'pascal',
  PathCase = 'path',
  SentenceCase = 'sentence',
  SnakeCase = 'snake',
  SwapCase = 'swap',
  TitleCase = 'title',
  UpperCase = 'upper'
}

export const StringStyleTypes: string[] = Object.values(StringStyle);

export type StringJsonStyles =
  | 'camel'
  | 'constant'
  | 'dot'
  | 'header'
  | 'kebab'
  | 'lower'
  | 'param'
  | 'pascal'
  | 'path'
  | 'sentence'
  | 'snake'
  | 'swap'
  | 'title'
  | 'upper';
