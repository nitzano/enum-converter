import { orderBy } from 'lodash';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';

import { styleString } from '../../utils/string-styler/string-styler';
import { EnumValue } from '../enum-value/enum-value.model';

export enum EnumValuesOrder {
  NameAscending = 'name_asc',
  NameDescending = 'name_desc',
  ValueAscending = 'value_asc',
  ValueDescending = 'value_desc'
}

export class EnumEntry {
  constructor(public name: string, public values: EnumValue[] = []) {}

  styleName(style: StringStyle): void {
    this.name = styleString(this.name, style);
  }

  styleKeys(style: StringStyle): void {
    this.values.forEach(value => (value.name = styleString(value.name, style)));
  }

  sortEnumValues(enumValueOrder: EnumValuesOrder): void {
    switch (enumValueOrder) {
      case EnumValuesOrder.NameAscending: {
        this.values = orderBy(this.values, 'name', 'asc');
        break;
      }
      case EnumValuesOrder.NameDescending: {
        this.values = orderBy(this.values, 'name', 'desc');
        break;
      }

      case EnumValuesOrder.ValueAscending: {
        this.values = orderBy(this.values, 'value', 'asc');
        break;
      }

      case EnumValuesOrder.ValueDescending: {
        this.values = orderBy(this.values, 'value', 'desc');
        break;
      }

      default:
        break;
    }
  }
}
