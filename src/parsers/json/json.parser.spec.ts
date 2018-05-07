import * as path from 'path';

import { EnumValue } from '../../models/enum-value/enum-value.model';
import { JsonParser } from './json.parser';

describe('Json Parser', () => {
  it('should parse the basic sample', () => {
    const samplePath = path.resolve(
      __dirname,
      '../../../__tests__/samples/basic/json.basic.sample.json'
    );
    const parser = new JsonParser();
    parser.parse(samplePath);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(2);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    expect(enumFile.entries[1].name).toBe('Pets');
    expect(enumFile.entries[1].values).toHaveLength(3);
  });

  xit('should parse from string', () => {
    expect(true).toBe(false);
  });

  xit('should parse numeric values', () => {
    expect(true).toBe(false);
  });

  xit('should parse string values', () => {
    expect(true).toBe(false);
  });

  xit('should parse boolean values', () => {
    expect(true).toBe(false);
  });

  xit('should parse automatic values', () => {
    expect(true).toBe(false);
  });

  xit('should parse mixed values', () => {
    expect(true).toBe(false);
  });
});
