import { styleString } from '../../utils/string-styler/string-styler';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';

// null = use previous value (auto)
export type EnumValueType = string | number | boolean | null;

export class EnumValue {
  name: string;
  value: EnumValueType;

  constructor(name: string, value: EnumValueType, nameStyle?: StringStyle) {
    this.name = name;
    this.value = value;

    if (nameStyle) {
      this.styleName(nameStyle);
    }
  }

  styleName(style: StringStyle): void {
    this.name = styleString(this.name, style);
  }

  styleValue(style: StringStyle): void {
    if (typeof this.value === 'string') {
      this.value = styleString(this.value, style);
    }
  }

  get isAutomatic(): boolean {
    return this.value === null;
  }
}
