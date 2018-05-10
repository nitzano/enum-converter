import { orderBy } from 'lodash';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';
import { EnumEntry } from '../enum-entry/enum-entry.model';

export enum EnumsOrder {
  Ascending = 'asc',
  Descending = 'desc'
}

export class EnumFile {
  constructor(
    public filePath: string | null = null,
    public entries: EnumEntry[] = []
  ) {}

  sortEntries(sort: EnumsOrder) {
    switch (sort) {
      case EnumsOrder.Ascending: {
        this.entries = orderBy(this.entries, 'name', 'asc');
        break;
      }
      case EnumsOrder.Descending: {
        this.entries = orderBy(this.entries, 'name', 'desc');
        break;
      }

      default:
        break;
    }
  }
}
