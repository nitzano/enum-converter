import { extname } from 'path';
import { FileParser } from './file.parser';
import { TypescriptParser } from './typescript/typescript.parser';
import { Language, LanguageSuffix } from '../utils/language.enums';
import { JavaParser } from './java/java.parser';
import { JsonParser } from './json/json.parser';
import { PythonParser } from './python/python.parser';

export const ALL_PARSERS = [PythonParser, TypescriptParser, JsonParser];
export const ALL_PARSER_NAMES = ALL_PARSERS.map(p => p.language);

export function parserFromLanguage(language: Language): FileParser {
  switch (language) {
    case Language.Python:
      return new PythonParser();
    case Language.Typescript:
      return new TypescriptParser();
    case Language.Json:
      return new JsonParser();
    case Language.Java:
      return new JavaParser();
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
      case LanguageSuffix.Java:
        return Language.Java;
      default:
        break;
    }
  }

  throw new Error(`could not detect language from path ${filePath}`);
}

export function suffixFromLanguage(language: Language): string {
  switch (language) {
    case Language.Json:
      return LanguageSuffix.Json;
    case Language.Python:
      return LanguageSuffix.Python;
    case Language.Typescript:
      return LanguageSuffix.Typescript;
    case Language.Java:
      return LanguageSuffix.Java;
    default:
      break;
  }

  throw new Error(`could not detect language ${language}`);
}
