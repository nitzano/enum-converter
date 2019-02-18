import * as path from 'path';

import { EnumValue } from '../../models/enum-value/enum-value.model';
import { JavaParser } from './java.parser';

describe('Java Parser', () => {
  it('should parse the sample file', () => {
    const fullPath = path.resolve(
      __dirname,
      '../../../__tests__/samples/basic/java.basic.sample.java'
    );
    const parser = new JavaParser();
    parser.parseFile(fullPath);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(2);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    expect(enumFile.entries[1].name).toBe('Pets');
    expect(enumFile.entries[1].values).toHaveLength(3);
  });

  it('should parse from string', () => {
    const fileData: string = `package test;\npublic enum Colors {Green(1),\n\tBlue(2),\n\tYellow(5);\n}\n`;

    const parser = new JavaParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);
  });

  it('should parse numeric values', () => {
    const fileData: string = `package test;\npublic enum Colors {First(1),\n\tSecond(0x1f),\n\tThird(.15);\n\t}\n`;

    const parser = new JavaParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(3);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(1);
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe(0x1f);
    expect(values[2].name).toBe('Third');
    expect(values[2].value).toBe(0.15);
  });

  it('should parse string values', () => {
    const fileData: string = `package test;\npublic enum Colors {First("first"),\n\tSecond("second");\n}\n`;

    const parser = new JavaParser();
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
    const fileData: string = `package test;\npublic enum Colors {First(true),\n\tSecond(false);\n}\n`;

    const parser = new JavaParser();
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

  it('should ignore complex enum initializers', () => {
    const fileData: string = `package test;\npublic enum Colors {First(1+1),\n\tSecond(2);\n}\n`;

    const parser = new JavaParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(2);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(null);
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe(2);
  });

  it('should only take the first argument as initializer', () => {
    const fileData: string = `package test;\npublic enum Colors {First(10, 20);\n}\n`;

    const parser = new JavaParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');

    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(1);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(10);
  });
});
