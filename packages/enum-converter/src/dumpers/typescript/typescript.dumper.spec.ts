import { SAMPLE_ENUM_FILE } from '../../__tests__/utils/utils';
import { TypescriptDumper } from './typescript.dumper';


describe('Typescript Dumper', () => {
  it('should dump sample pyfile', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new TypescriptDumper(enumFile);
    // console.log(dumper.dump());
  });
});
