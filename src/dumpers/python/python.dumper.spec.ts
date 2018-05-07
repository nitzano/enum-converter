import { resolve } from 'path';
import { EnumFile } from '../..';
import { SAMPLE_ENUM_FILE } from '../../../__tests__/utils/utils';
import { PythonParser } from '../../parsers/python/python.parser';
import { PythonDumper } from './python.dumper';

describe('Python Dumper', () => {
  it('should dump sample enumFile', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new PythonDumper(enumFile);
    const dumperString: string = dumper.dump();

    expect(dumperString.length).toBeGreaterThan(0);
  });

  it('should dump the basic sample file', () => {
    const fullPath = resolve(
      __dirname,
      '../../../__tests__/samples/basic/python.basic.sample.py'
    );
    const parser = new PythonParser();
    parser.parse(fullPath);

    const enumFile: EnumFile = parser.enumFile;

    const dumper = new PythonDumper(enumFile);
    const dumperString: string = dumper.dump();
    console.log('dumper string', dumperString);

    expect(dumperString).toContain('Green = 1');
    expect(dumperString).toContain('Yellow = auto()');
    expect(dumperString).toContain(`Blue = 'Blue'`);
  });
});
