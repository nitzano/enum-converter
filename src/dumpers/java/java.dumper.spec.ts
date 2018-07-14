import { resolve } from 'path';
import { EnumFile } from '../..';
import { SAMPLE_ENUM_FILE } from '../../../__tests__/utils/utils';
import { JavaParser } from '../../parsers';
import { JavaDumper } from './java.dumper';

describe('Java Dumper', () => {
  it('should dump sample enumFile', () => {
    const enumFile = SAMPLE_ENUM_FILE;
    const dumper = new JavaDumper(enumFile);
    const dumperString: string = dumper.dump();

    expect(dumperString.length).toBeGreaterThan(0);
  });

  it('should dump the basic sample file', () => {
    const fullPath = resolve(
      __dirname,
      '../../../__tests__/samples/basic/java.basic.sample.java'
    );
    const parser = new JavaParser();
    parser.parseFile(fullPath);

    const enumFile: EnumFile = parser.enumFile;

    const dumper = new JavaDumper(enumFile);
    const dumperString: string = dumper.dump();

    console.log(dumperString)
    // expect(dumperString).toContain('Green = 1');
    // expect(dumperString).toContain('Yellow = auto()');
    // expect(dumperString).toContain(`Blue = 'Blue'`);
  });
});
