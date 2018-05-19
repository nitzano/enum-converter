import { readFileSync, writeFileSync } from 'fs';
import { fileSync } from 'tmp';
import { EnumEntry } from '../models/enum-entry/enum-entry.model';
import { EnumFile } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';

export abstract class FileParser {
  static language: Language;
  protected tmpFileSuffix: string = 'tmp';

  constructor(public enumFile: EnumFile = new EnumFile()) {}

  parse(fileData: string): void {
    this.parseString(fileData);
  }

  parseFile(filePath: string) {
    // Note we always want to dump the file ourselves
    // since some parsers work with filePath and some with fileStrings
    // and we want to control the suffix etc'
    // TODO: add public parseFile() that will call parseString
    const enumStr: string = readFileSync(filePath).toString();
    this.parseString(enumStr);
  }

  parseString(fileData: string) {
    const result = fileSync({ postfix: `.${this.tmpFileSuffix}` });
    writeFileSync(result.name, fileData);
    this.analyzeEnum(result.name);
    result.removeCallback();
  }

  abstract extractEntries(filePath: string): EnumEntry[];

  protected getData(filePath: string): string {
    const fileData: Buffer = readFileSync(filePath);
    return fileData.toString();
  }

  // the actual function which extracts the entries from enums
  private analyzeEnum(filePath: string): void {
    this.enumFile.filePath = filePath;
    this.enumFile.entries = this.extractEntries(filePath);
  }
}
