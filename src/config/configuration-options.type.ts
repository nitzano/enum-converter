import { ValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EnumsOrder } from '../models/enum-file/enum-file.model';
import { Language } from '../utils/language.enums';
import { StringStyle } from '../utils/string-styler/string-styler.enums';

export interface ConversionOptions {
  from?: Language; // parser
  to?: Language; // dumper
  output?: string;
  modify?: boolean;
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
