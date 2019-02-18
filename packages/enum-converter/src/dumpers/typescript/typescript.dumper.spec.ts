import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';

import { SAMPLE_ENUM_FILE } from '../../../__tests__/utils/utils';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';
import { TypescriptDumper } from './typescript.dumper';

describe('Typescript Dumper', () => {
  it('should dump sample pyfile', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new TypescriptDumper(enumFile);
    // console.log(dumper.dump());
  });
});
