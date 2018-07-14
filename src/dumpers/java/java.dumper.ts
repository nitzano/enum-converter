import { EnumFile } from '../../models/enum-file/enum-file.model';
import {
  EnumValue,
  EnumValueType
} from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileDumper } from '../file.dumper';

export interface JsonEnum {
  [enumEntryName: string]: { [enumValueKey: string]: EnumValueType };
}

export class JavaDumper extends FileDumper {
  static language: Language = Language.Java;
  commentChar = '//'; 

  constructor(enumFile: EnumFile) {
    super(enumFile);
  }

  get entries(): string {
    const entries: string[] = [];

    this.enumFile.entries.forEach(entry => {
      let entryString: string = '';

      // create entry class
      entryString += `public enum ${entry.name}`;

      entry.values.forEach(enumValue => {
        entryString += `    ${enumValue.name} = ${this.getEnumValue(
          enumValue
        )}\n`;
      });

      entries.push(entryString);
    });

    return entries.join('\n');
  }
}
