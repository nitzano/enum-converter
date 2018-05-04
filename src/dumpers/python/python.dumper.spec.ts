import { SAMPLE_ENUM_FILE } from '../../../__tests__/utils/utils';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';
import { PythonDumper } from './python.dumper';

describe('Python Dumper', () => {
  it('should dump sample pyfile', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new PythonDumper(enumFile);
    // console.log(pythonDumper.dump());
  });
});
