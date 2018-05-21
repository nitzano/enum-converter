import * as path from 'path';
import { EnumFile } from '../../models/enum-file/enum-file.model';
import { EnumValue } from '../../models/enum-value/enum-value.model';
import { JsonParser } from './json.parser';

describe('Json Parser', () => {
  let parser: JsonParser;

  beforeEach(() => {
    parser = new JsonParser();
  });

  it('should parse the basic sample file', () => {
    const samplePath = path.resolve(
      __dirname,
      '../../../__tests__/samples/basic/json.basic.sample.json'
    );
    parser.parseFile(samplePath);
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(2);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    expect(enumFile.entries[1].name).toBe('Pets');
    expect(enumFile.entries[1].values).toHaveLength(3);
  });

  it('should parse from string', () => {
    const sampleObj: object = {
      Colors: {
        Blue: 'Blue',
        Green: 1,
        Yellow: 'Yellow'
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);
  });

  it('should parse numeric values', () => {
    const sampleObj: object = {
      Colors: {
        Blue: 1,
        Green: 2,
        Yellow: 5
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values[0].name).toBe('Blue');
    expect(values[0].value).toBe(1);
    expect(values[1].name).toBe('Green');
    expect(values[1].value).toBe(2);
    expect(values[2].name).toBe('Yellow');
    expect(values[2].value).toBe(5);
  });

  it('should parse string values', () => {
    const sampleObj: object = {
      Colors: {
        Blue: 'Blue',
        Green: 'Green',
        Yellow: 'Yellow'
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values[0].name).toBe('Blue');
    expect(values[0].value).toBe('Blue');
    expect(values[1].name).toBe('Green');
    expect(values[1].value).toBe('Green');
    expect(values[2].name).toBe('Yellow');
    expect(values[2].value).toBe('Yellow');
  });

  it('should parse boolean values', () => {
    const sampleObj: object = {
      Colors: {
        Blue: true,
        Green: false,
        Yellow: true
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values[0].name).toBe('Blue');
    expect(values[0].value).toBe(true);
    expect(values[1].name).toBe('Green');
    expect(values[1].value).toBe(false);
    expect(values[2].name).toBe('Yellow');
    expect(values[2].value).toBe(true);
  });

  it('should parse automatic values', () => {
    const sampleObj: object = {
      Colors: {
        Blue: 1,
        Green: null,
        Yellow: 5
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values[0].name).toBe('Blue');
    expect(values[0].value).toBe(1);
    expect(values[0].isAutomatic).toBe(false);

    expect(values[1].name).toBe('Green');
    expect(values[1].isAutomatic).toBe(true);

    expect(values[2].name).toBe('Yellow');
    expect(values[2].value).toBe(5);
    expect(values[2].isAutomatic).toBe(false);
  });

  it('should parse mixed values', () => {
    const sampleObj: object = {
      Colors: {
        Blue: 'Blue',
        Green: 1,
        Red: null,
        Yellow: false
      }
    };

    parser.parseString(JSON.stringify(sampleObj));
    const enumFile: EnumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(4);

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values[0].name).toBe('Blue');
    expect(values[0].value).toBe('Blue');
    expect(values[1].name).toBe('Green');
    expect(values[1].value).toBe(1);
    expect(values[2].name).toBe('Red');
    expect(values[2].isAutomatic).toBe(true);
    expect(values[3].name).toBe('Yellow');
    expect(values[3].value).toBe(false);
  });
});
