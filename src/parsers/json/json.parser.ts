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
    if (filePath) {
      const jsonData: object = JSON.parse(this.getData(filePath));
      console.log('json data', jsonData);
    }

    return [];
  }
}
