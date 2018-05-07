import * as path from 'path';

import { EnumValue } from '../../models/enum-value/enum-value.model';
import { TypescriptParser } from './typescript.parser';

describe('Typescript Parser', () => {
  it('should parse the sample file', () => {
    const fullPath = path.resolve(
      __dirname,
      '../../../__tests__/samples/basic/typescript.basic.sample.ts'
    );
    const parser = new TypescriptParser();
    parser.parse(fullPath);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(2);

    expect(enumFile.entries[0].name).toBe('Colors');
    expect(enumFile.entries[0].values).toHaveLength(3);

    expect(enumFile.entries[1].name).toBe('Pets');
    expect(enumFile.entries[1].values).toHaveLength(3);
  });

  it('should parse from string', () => {
    const fileData: string = `    
    enum Colors {
      First = 1,
      Second = 2,
      Third = 5
    }
    `;

    const parser = new TypescriptParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].name).toBe('Colors');
    const values: EnumValue[] = enumFile.entries[0].values;

    expect(values).toHaveLength(3);

    expect(values[0].name).toBe('First');
    expect(values[0].value).toBe(1);
    expect(values[1].name).toBe('Second');
    expect(values[1].value).toBe(2);
    expect(values[2].name).toBe('Third');
    expect(values[2].value).toBe(5);
  });

  it('should parse numeric values', () => {
    const fileData: string = `    
    enum Colors {
      First = 1,
      Second = 4      
    }
    `;

    const parser = new TypescriptParser();
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
    const fileData: string = `    
    enum Colors {
      First = 'first',
      Second = 'second'      
    }
    `;

    const parser = new TypescriptParser();
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

  it('should not parse boolean values', () => {
    const fileData: string = `    
    enum Colors {
      First = true,
      Second = false      
    }
    `;

    const parser = new TypescriptParser();
    parser.parseString(fileData);
    const enumFile = parser.enumFile;

    expect(enumFile.entries).toHaveLength(1);
    expect(enumFile.entries[0].values).toHaveLength(0);
  });

  it('should parse automatic values', () => {
    const fileData: string = `    
    enum Colors {
      First = 1,
      Second,
      Third = 5
    }
    `;

    const parser = new TypescriptParser();
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
    const fileData: string = `    
    enum Colors {
      First = 1,
      Second,
      Third = 'third'
    }
    `;

    const parser = new TypescriptParser();
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
    expect(values[2].value).toBe('third');
  });
});
