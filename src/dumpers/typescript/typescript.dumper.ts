import { EnumFile } from '../../models/enum-file/enum-file.model';
import { Language } from '../../utils/language.enums';
import { FileDumper } from '../file.dumper';

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
        entryString += `${enumValue.name} = ${enumValue.value},\n`;
      });

      entries.push(entryString);
    });

    return entries.join('\n');
  }
}
