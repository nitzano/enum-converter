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

      entry.values.map(enumValue => {
        jsonEnum[entry.name][enumValue.name] = this.getEnumValue(enumValue);
      });
    });

    return JSON.stringify(jsonEnum, null, 4);
  }

  getEnumValue(enumValue: EnumValue): string {
    if (enumValue) {
      return `${enumValue.isAutomatic ? 'null' : enumValue.value}`;
    } else {
      throw new Error(`could not parse ${enumValue}`);
    }
  }
}
