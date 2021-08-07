import { SAMPLE_ENUM_FILE } from '../../__tests__/utils/utils';
import { JsonDumper } from './json.dumper';

describe('JSON Dumper', () => {
  it('should dump sample pyfile to json', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new JsonDumper(enumFile);
    // console.log(dumper.dump());
  });
});
