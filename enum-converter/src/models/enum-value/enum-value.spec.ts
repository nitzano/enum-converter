import { EnumValue } from './enum-value.model';
import { StringStyle } from '../../utils';

describe('Enum Value', () => {
  it('should should create an enum value', () => {
    let enumValue = new EnumValue('test', 1);
    expect(enumValue.name).toBe('test');
    expect(enumValue.value).toBe(1);
    expect(enumValue.isAutomatic).toBe(false);
  });

  it('should create automatic enum value', () => {
    let enumValue = new EnumValue('test', null);
    expect(enumValue.name).toBe('test');
    expect(enumValue.value).toBe(null);
    expect(enumValue.isAutomatic).toBe(true);
  });

  it('should style enum value name', () => {
    let enumValue = new EnumValue('tEsT', 'hello');
    enumValue.styleName(StringStyle.UpperCase);
    expect(enumValue.name).toBe('TEST');
    enumValue.styleName(StringStyle.LowerCase);
    expect(enumValue.name).toBe('test');
  });

  it('should style string enum value', () => {
    let enumValue = new EnumValue('test', 'hello');
    enumValue.styleValue(StringStyle.UpperCase);
    expect(enumValue.value).toBe('HELLO');
  });

  it('should not style non-string enum values', () => {
    let enumValue = new EnumValue('test', 1);
    enumValue.styleValue(StringStyle.UpperCase);
    expect(enumValue.value).toBe(1);

    enumValue = new EnumValue('test', null);
    enumValue.styleValue(StringStyle.UpperCase);
    expect(enumValue.value).toBe(null);

    enumValue = new EnumValue('test', true);
    enumValue.styleValue(StringStyle.UpperCase);
    expect(enumValue.value).toBe(true);
  });
});
