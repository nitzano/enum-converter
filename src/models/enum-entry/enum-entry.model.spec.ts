import { EnumValue } from '../enum-value/enum-value.model';
import { EnumEntry, ValuesOrder } from './enum-entry.model';

describe('EnumEntry', () => {
  describe('sorting', () => {
    let enumEntry: EnumEntry;

    const enumA: EnumValue = new EnumValue('a', 11);
    const enumB: EnumValue = new EnumValue('b', 55);
    const enumC: EnumValue = new EnumValue('c', 999);

    const enumD: EnumValue = new EnumValue('hello', 44);

    beforeEach(() => {
      enumEntry = new EnumEntry('Test');
    });

    it('should sort by name entry ascending', () => {
      enumEntry.values = [enumC, enumB, enumA];
      enumEntry.sortEnumValues(ValuesOrder.NameAsc);
      expect(enumEntry.values).toEqual([enumA, enumB, enumC]);
    });

    it('should sort by name entry descending', () => {
      enumEntry.values = [enumC, enumB, enumA];
      enumEntry.sortEnumValues(ValuesOrder.NameDesc);
      expect(enumEntry.values).toEqual([enumC, enumB, enumA]);
    });

    it('should sort by values ascending', () => {
      enumEntry.values = [enumD, enumC, enumB, enumA];
      enumEntry.sortEnumValues(ValuesOrder.ValueAsc);
      expect(enumEntry.values).toEqual([enumA, enumD, enumB, enumC]);
    });

    it('should sort by values descending', () => {
      enumEntry.values = [enumD, enumC, enumB, enumA];
      enumEntry.sortEnumValues(ValuesOrder.ValueDesc);
      expect(enumEntry.values).toEqual([enumC, enumB, enumD, enumA]);
    });
  });
});
