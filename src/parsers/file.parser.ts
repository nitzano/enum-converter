import { readFileSync, writeFileSync } from 'fs';
import { fileSync } from 'tmp';
import { EnumEntry } from '../models/enum-entry/enum-entry.model';
import { EnumFile } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';

export abstract class FileParser {
  static language: Language;
  protected tmpFileSuffix: string = 'tmp';

  constructor(public enumFile: EnumFile = new EnumFile()) {}

  parse(filePath: string): void {
    this.parseFile(filePath);
  }

  parseFile(filePath: string): void {
    this.enumFile.filePath = filePath;
    this.enumFile.entries = this.extractEntries(filePath);
  }

  parseString(fileData: string) {
    const result = fileSync({ postfix: `.${this.tmpFileSuffix}` });
    writeFileSync(result.name, fileData);
    this.parseFile(result.name);
    result.removeCallback();
  }

  abstract extractEntries(filePath: string): EnumEntry[];

  protected getData(filePath: string): string {
    const fileData: Buffer = readFileSync(filePath);
    return fileData.toString();
  }
}
