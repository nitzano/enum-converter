import { readFileSync, writeFileSync } from 'fs';
import { fileSync } from 'tmp';
import { EnumEntry } from '../models/enum-entry/enum-entry.model';
import { EnumFile } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';

export abstract class FileParser {
  static language: Language;
  protected tmpFileSuffix: string = 'tmp';

  constructor(public enumFile: EnumFile = new EnumFile()) {}

  parseFile(filePath: string) {
    this.parseEnum(filePath);
  }

  parseString(fileData: string) {
    // create tmp file
    const result = fileSync({ postfix: `.${this.tmpFileSuffix}` });

    // parse enum
    writeFileSync(result.name, fileData);
    this.parseEnum(result.name);

    // remove tmp file
    result.removeCallback();
  }

  abstract extractEntries(filePath: string): EnumEntry[];

  protected getData(filePath: string): string {
    const fileData: Buffer = readFileSync(filePath);
    return fileData.toString();
  }

  // the actual function which extracts the entries from enums
  private parseEnum(filePath: string): void {
    this.enumFile.filePath = filePath;
    this.enumFile.entries = this.extractEntries(filePath);
  }
}
