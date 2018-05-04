import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValueType } from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileDumper } from '../file.dumper';

export interface JsonEnum {
  [enumEntryName: string]: { [enumValueKey: string]: EnumValueType };
}

export class JsonDumper extends FileDumper {
  static language: Language = Language.Json;
  commentChar = null; // no comments in json

  constructor(enumFile: EnumFile) {
    super(enumFile);
  }

  get entries(): string {
    const jsonEnum: JsonEnum = {};

    this.enumFile.entries.forEach(entry => {
      jsonEnum[entry.name] = {};

      entry.values.forEach(enumValue => {
        jsonEnum[entry.name][enumValue.name] = enumValue.value;
      });
    });

    return JSON.stringify(jsonEnum, null, 4);
  }
}
