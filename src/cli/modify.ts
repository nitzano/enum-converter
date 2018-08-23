import { FileOptions } from '../config/configuration-options.type';
import { convertApi } from './convert';

export function modify(file: string, config: FileOptions) {
  return convertApi({ ...config, file, modify: true });
}
