import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileDumper } from '../file.dumper';

export class PythonDumper extends FileDumper {
  static language: Language = Language.Python;
  commentChar = '#';

  constructor(enumFile: EnumFile) {
    super(enumFile);
  }

  get entries(): string {
    const entries: string[] = [];

    this.enumFile.entries.forEach(entry => {
      let entryString: string = '';

      // create entry class
      entryString += `class ${entry.name}(Enum):\n`;

      entry.values.forEach(enumValue => {
        entryString += `    ${enumValue.name} = ${enumValue.value}\n`;
      });

      entries.push(entryString);
    });

    return entries.join('\n');
  }

  private getEnumValue(enumValue: EnumValue): string {
    if (enumValue && enumValue.value !== undefined) {
      switch (typeof enumValue.value) {
        case 'string':
          return `'${enumValue.value}'`;
        case 'number':
          return `${enumValue.value}`;
        case 'object':
          if (enumValue.value === null) {
            return 'auto()';
          }
        default:
          break;
      }
    }

    return '';
  }

  get prefixData(): string | null {
    return 'from enum import Enum, auto\n';
  }
}
