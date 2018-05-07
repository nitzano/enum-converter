import { basename } from 'path';
import { EnumValue } from '..';
import { EnumValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EnumFile } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';
import { StringStyle } from '../utils/string-styler/string-styler.enums';
import { DEFAULT_ENUM_CONFIG, DumpConfig } from './dump-config.type';

export abstract class FileDumper {
  static language: Language;
  abstract commentChar: string | null;
  abstract get entries(): string;

  constructor(public enumFile: EnumFile) {}

  dump(config: DumpConfig = DEFAULT_ENUM_CONFIG): string {
    const fileData: string[] = [];

    // header
    if (config.emitHeader && this.commentChar) {
      fileData.push(this.getHeader(config));
      fileData.push(''); // extra space
    }

    // prefix data
    if (this.prefixData !== null) {
      fileData.push(this.prefixData);
    }

    // apply configuration options
    this.applyConfigs(config);

    // entries
    fileData.push(this.entries);

    return fileData.join('\n');
  }

  protected get prefixData(): string | null {
    return null;
  }

  private getHeader(config: DumpConfig): string {
    let header: string = `${this.commentChar}`;

    if (this.enumFile.filePath) {
      header += ` From ${basename(this.enumFile.filePath)}`;
    }

    // stats
    if (config.emitStats) {
      header += this.getStats();
    }

    return header;
  }

  private getStats(): string {
    const numEntries = this.enumFile.entries.length;
    const numValues = this.enumFile.entries.reduce(
      (acc, entry) => acc + entry.values.length,
      0
    );
    return ` (${numEntries} Enums ${numValues} Values)`;
  }

  private applyConfigs(config: DumpConfig): void {
    // sort entries
    if (config.sortEntries !== undefined) {
      this.enumFile.sortEntries(config.sortEntries);
    }

    // style names
    if (config.nameStyle !== undefined) {
      this.enumFile.entries.forEach(entry => {
        entry.styleName(config.nameStyle!);
      });
    }

    // style keys
    if (config.keyStyle) {
      const enumValuesStyle: StringStyle = config.keyStyle;

      this.enumFile.entries.forEach(entry => entry.styleKeys(enumValuesStyle));
    }

    // style values (strings only)
    if (config.valueStyle) {
      throw new Error('not implemented yet');
    }

    // sort enum values
    if (config.sortValues !== undefined) {
      const enumValuesOrder: EnumValuesOrder = config.sortValues;

      this.enumFile.entries.forEach(entry => {
        entry.sortEnumValues(enumValuesOrder);
      });
    }
  }
}
