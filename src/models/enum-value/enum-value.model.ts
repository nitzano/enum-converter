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

  private styleName(style: StringStyle) {
    this.name = styleString(this.name, style);
  }

  get isAutomatic(): boolean {
    return this.value === null;
  }
}
