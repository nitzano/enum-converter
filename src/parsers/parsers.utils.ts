import { endsWith } from 'lodash';
import { PythonParser } from '..';
import { EnumFile } from '../models/enum-file/enum-file.model';
import { FileParser } from '../parsers/file.parser';
import { TypescriptParser } from '../parsers/typescript/typescript.parser';
import { Language } from '../utils/language.enums';

export const ALL_PARSERS = [PythonParser, TypescriptParser];
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
    default:
      break;
  }

  return null;
}

export function createParserFromPath(filePath: string): FileParser | null {
  if (endsWith(filePath, '.py')) {
    return createParserFromLanguage(Language.Python);
  } else if (endsWith(filePath, '.ts')) {
    return createParserFromLanguage(Language.Typescript);
  }

  return null;
}
