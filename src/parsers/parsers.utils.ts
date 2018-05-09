import { extname } from 'path';
import { JsonParser, PythonParser } from '..';
import { FileParser } from '../parsers/file.parser';
import { TypescriptParser } from '../parsers/typescript/typescript.parser';
import { Language } from '../utils/language.enums';

export const ALL_PARSERS = [PythonParser, TypescriptParser, JsonParser];
export const ALL_PARSER_NAMES = ALL_PARSERS.map(p => p.language);

export function findlanguageFromArgument(parserName: string): Language | null {
  if (parserName) {
    const parser = ALL_PARSERS.find(p => p.language === parserName);
    return parser ? parser.language : null;
  }
  return null;
}

export function createParserFromLanguage(
  language: Language
): FileParser | null {
  switch (language) {
    case Language.Python:
      return new PythonParser();
    case Language.Typescript:
      return new TypescriptParser();
    case Language.Json:
      return new JsonParser();
    default:
      break;
  }

  return null;
}

export function createParserFromPath(filePath: string): FileParser | null {
  const extension: string = extname(filePath).toLowerCase();

  switch (extension) {
    case '.py':
      return createParserFromLanguage(Language.Python);
    case '.ts':
      return createParserFromLanguage(Language.Typescript);
    case '.json':
      return createParserFromLanguage(Language.Json);
  }

  return null;
}
