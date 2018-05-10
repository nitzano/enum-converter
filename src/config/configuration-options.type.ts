import { ValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EnumsOrder } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';
import { StringStyle } from '../utils/string-styler/string-styler.enums';

export interface ConversionOptions {
  file?: string;
  from?: Language; // parser
  modify?: boolean;
  output?: string;
  to?: Language; // dumper
}

export interface StylingOptions {
  emitHeader?: boolean;
  emitStats?: boolean;
  keyStyle?: StringStyle;
  nameStyle?: StringStyle;
  sortEnums?: EnumsOrder;
  sortValues?: ValuesOrder;
  valueStyle?: StringStyle;
}

export type ConfigurationOptions = ConversionOptions & StylingOptions;
