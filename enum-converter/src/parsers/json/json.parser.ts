import {
  CompilerOptions,
  createProgram,
  isEnumDeclaration,
  isEnumMember,
  isIdentifier,
  isNumericLiteral,
  isStringLiteral,
  Node,
  Program,
  ScriptTarget,
  SourceFile
} from 'typescript';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import {
  EnumValue,
  EnumValueType
} from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileParser } from '../file.parser';

export class JsonParser extends FileParser {
  static language: Language = Language.Json;
  tmpFileSuffix: string = 'json';

  extractEntries(filePath: string): EnumEntry[] {
    const enumEntries: EnumEntry[] = [];
    if (filePath) {
      const jsonData: object = JSON.parse(this.getData(filePath));

      Object.entries(jsonData).forEach(([enumName, values]) => {
        const enumValues: EnumValue[] = Object.entries(values).map(
          ([enumKey, enumValue]) => {
            if (
              ['number', 'boolean', 'string'].includes(typeof enumValue) ||
              enumValue === null
            ) {
              return new EnumValue(enumKey, enumValue as EnumValueType);
            } else {
              throw new Error(`could not cast enum value ${enumValue}`);
            }
          }
        );
        const enumEntry = new EnumEntry(enumName, enumValues);

        enumEntries.push(enumEntry);
      });
    }

    return enumEntries;
  }
}
