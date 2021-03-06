import { JsonDumper, PythonDumper, TypescriptDumper } from '.';
import { EnumFile } from '..';
import { Language } from '../utils/language.enums';
import { FileDumper } from './file.dumper';

export function createDumperFromLanguage(
  language: Language,
  enumFile: EnumFile
): FileDumper {
  switch (language) {
    case Language.Python:
      return new PythonDumper(enumFile);
    case Language.Typescript:
      return new TypescriptDumper(enumFile);
    case Language.Json:
      return new JsonDumper(enumFile);
    default:
      break;
  }

  throw new Error(`could not find file dumper for ${language}`);
}
