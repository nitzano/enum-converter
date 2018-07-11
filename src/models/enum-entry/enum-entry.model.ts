import { orderBy } from 'lodash';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';

import { styleString } from '../../utils/string-styler/string-styler';
import { EnumValue } from '../enum-value/enum-value.model';

export enum ValuesOrder {
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  ValueAsc = 'value_asc',
  ValueDesc = 'value_desc'
}

export class EnumEntry {
  constructor(public name: string, public values: EnumValue[] = []) {}

  styleName(style: StringStyle): void {
    this.name = styleString(this.name, style);
  }

  styleKeys(style: StringStyle): void {
    this.values.forEach(value => (value.name = styleString(value.name, style)));
  }

  styleValues(style: StringStyle): void {
    this.values.forEach(value => value.styleValue(style));
  }

  sortEnumValues(enumValueOrder: ValuesOrder): void {
    switch (enumValueOrder) {
      case ValuesOrder.NameAsc: {
        this.values = orderBy(this.values, 'name', 'asc');
        break;
      }
      case ValuesOrder.NameDesc: {
        this.values = orderBy(this.values, 'name', 'desc');
        break;
      }

      case ValuesOrder.ValueAsc: {
        this.values = orderBy(this.values, 'value', 'asc');
        break;
      }

      case ValuesOrder.ValueDesc: {
        this.values = orderBy(this.values, 'value', 'desc');
        break;
      }

      default:
        break;
    }
  }
}
