import { styleString } from '../../utils/string-styler/string-styler';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';

// null = use previous value (auto)
export type EnumValueType = string | number | boolean | null;

export class EnumValue {
  name: string;
  value: EnumValueType;

  constructor(name: string, value: EnumValueType, nameStyle?: StringStyle, valueStyle?: StringStyle) {
    this.name = name;
    this.value = value;

    if(valueStyle) {
      this.styleValue(valueStyle);
    }

    if (nameStyle) {
      this.value = styleString(this.name, nameStyle);
    }
  }

  styleValue(style: StringStyle ) {
    if(typeof this.value == 'string') {
      this.value = styleString(this.name, style);
    }

  }

  get isAutomatic(): boolean {
    return this.value === null;
  }
}
