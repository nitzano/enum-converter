import { extname } from 'path';
import { FileParser } from '../parsers/file.parser';
import { TypescriptParser } from '../parsers/typescript/typescript.parser';
import { Language, LanguageSuffix } from '../utils/language.enums';
import { JsonParser } from './json/json.parser';
import { PythonParser } from './python/python.parser';
import { file } from 'tmp';

export const ALL_PARSERS = [PythonParser, TypescriptParser, JsonParser];
export const ALL_PARSER_NAMES = ALL_PARSERS.map(p => p.language);

export function findLanguageFromArgument(parserName: string): Language | null {
  if (parserName) {
    const parser = ALL_PARSERS.find(p => p.language === parserName);
    return parser ? parser.language : null;
  }
  return null;
}

export function createParserFromLanguage(language: Language): FileParser {
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

  throw new Error(`could not find parser for language ${language}`);
}

export function languageFromFilePath(filePath: string): Language {
  if (filePath) {
    const fileExtension: string = extname(filePath)
      .toLowerCase()
      .slice(1);

    switch (fileExtension) {
      case LanguageSuffix.Json:
        return Language.Json;
      case LanguageSuffix.Python:
        return Language.Python;
      case LanguageSuffix.Typescript:
        return Language.Typescript;
      default:
        break;
    }
  }

  throw new Error(`could not detect language from path ${filePath}`);
}
