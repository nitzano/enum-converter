import { orderBy } from 'lodash';
import { StringStyle } from '../../utils/string-styler/string-styler.enums';
import { EnumEntry } from '../enum-entry/enum-entry.model';

export enum EntriesOrder {
  Ascending = 'asc',
  Descending = 'desc'
}

export class EnumFile {
  constructor(
    public filePath: string | null = null,
    public entries: EnumEntry[] = []
  ) {}

  sortEntries(sort: EntriesOrder) {
    switch (sort) {
      case EntriesOrder.Ascending: {
        this.entries = orderBy(this.entries, 'name', 'asc');
        break;
      }
      case EntriesOrder.Descending: {
        this.entries = orderBy(this.entries, 'name', 'desc');
        break;
      }

      default:
        break;
    }
  }
}
