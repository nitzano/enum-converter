import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';

// set up file
export const SAMPLE_ENUM_FILE: EnumFile = new EnumFile();
SAMPLE_ENUM_FILE.entries.push(
  new EnumEntry('EnumA', [
    new EnumValue('NameA1', 1),
    new EnumValue('NameA2', 2),
    new EnumValue('NameA3', 3)
  ])
);

SAMPLE_ENUM_FILE.entries.push(
  new EnumEntry('EnumB', [
    new EnumValue('NameB1', 1),
    new EnumValue('NameB2', 2),
    new EnumValue('NameB3', 3)
  ])
);
