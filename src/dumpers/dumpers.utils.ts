import { JsonDumper, PythonDumper, TypescriptDumper } from '.';
import { EnumFile } from '..';
import { Language } from '../utils/language.enums';
import { FileDumper } from './file.dumper';

export const ALL_DUMPERS = [PythonDumper, TypescriptDumper, JsonDumper];
export const ALL_DUMPERS_NAMES: string[] = ALL_DUMPERS.map(
  dumper => dumper.language
);

export function createDumperFromLanguage(
  language: Language,
  enumFile: EnumFile
): FileDumper | undefined {
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

  return undefined;
}
