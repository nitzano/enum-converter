import { EnumValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EntriesOrder } from '../models/enum-file/enum-file.model';
import { StringStyle } from '../utils/string-styler/string-styler.enums';

export interface DumpConfig {
  emitHeader?: boolean;
  emitStats?: boolean;
  keyStyle?: StringStyle;
  nameStyle?: StringStyle;
  sortEntries?: EntriesOrder;
  sortValues?: EnumValuesOrder;
  valueStyle?: StringStyle;
}

export const DEFAULT_ENUM_CONFIG: DumpConfig = {
  emitHeader: true,
  emitStats: true
};
