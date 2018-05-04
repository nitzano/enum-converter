import { SAMPLE_ENUM_FILE } from '../../../__tests__/utils/utils';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';
import { JsonDumper } from './json.dumper';

fdescribe('JSON Dumper', () => {
  it('should dump sample pyfile to json', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new JsonDumper(enumFile);
    // console.log(dumper.dump());
  });
});
