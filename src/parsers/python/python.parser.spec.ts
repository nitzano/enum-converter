import * as path from 'path';

import { EnumValue } from '../../models/enum-value/enum-value.model';
import { PythonParser } from './python.parser';

describe('Python Parser', () => {
  it('should parse the sample file', () => {
    const fullPath = path.resolve(
      __dirname,
      '../../../__tests__/samples/python.simple.sample.py'
    );
    const parser = new PythonParser();
    parser.parse(fullPath);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(2);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    expect(enumFile.entries[1].name).toBe('Pets');
    expect(enumFile.entries[1].values).toHaveLength(3);
  });

  it('should parse from string', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tGreen = 1\n\tBlue = 2\n\tYellow=5`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);
  });

  it('should parse numeric values', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tFirst = 1\n\tSecond = 4`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(2);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(1);
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe(4);
  });

  it('should parse string values', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tFirst = 'first'\n\tSecond = 'second'`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(2);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe('first');
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe('second');
  });

  it('should parse boolean values', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tFirst = True\n\tSecond = False`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(2);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(true);
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe(false);
  });

  it('should parse automatic values', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tFirst = 1\n\tSecond = auto()\n\tThird = 5`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(3);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(1);

    expect(values[1].name).toBe('Second');
    expect(values[1].isAutomatic).toBeTruthy();

    expect(values[2].name).toBe('Third');
    expect(values[2].value).toBe(5);
  });

  it('should parse mixed values', () => {
    const fileData: string = `from enum import Enum, auto\nclass Colors(Enum):\n\tFirst = 1\n\tSecond = auto()\n\tThird = 'third'\n\tFourth = False`;

    const parser = new PythonParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(4);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(1);

    expect(values[1].name).toBe('Second');
    expect(values[1].isAutomatic).toBeTruthy();

    expect(values[2].name).toBe('Third');
    expect(values[2].value).toBe('third');

    expect(values[3].name).toBe('Fourth');
    expect(values[3].value).toBe(false);
  });
});
