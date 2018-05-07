import { EnumFile } from '../../models/enum-file/enum-file.model';
import { Language } from '../../utils/language.enums';
import { FileDumper } from '../file.dumper';
import { EnumValue } from '../../models/enum-value/enum-value.model';

export class TypescriptDumper extends FileDumper {
  static language: Language = Language.Typescript;
  commentChar = '//';

  constructor(enumFile: EnumFile) {
    super(enumFile);
  }

  get entries(): string {
    const entries: string[] = [];

    this.enumFile.entries.forEach(entry => {
      let entryString: string = '';

      // create entry class
      entryString += `enum ${entry.name} {\n`;

      entry.values.forEach(enumValue => {
        entryString += enumValue.isAutomatic
          ? `${enumValue.name},\n`
          : `${enumValue.name} = ${this.getEnumValue(enumValue)},\n`;
      });

      entries.push(entryString);
    });

    return entries.join('\n');
  }

  getEnumValue(enumValue: EnumValue): string {
    if (enumValue && enumValue.value !== undefined) {
      switch (typeof enumValue.value) {
        case 'string':
          return `'${enumValue.value}'`;
        case 'number':
        case 'boolean':
          return `${enumValue.value}`;
        default:
          break;
      }
    }

    throw new Error(`could not match enum value type ${enumValue}`);
  }
}
