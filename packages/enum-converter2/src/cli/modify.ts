import { ApiConfiguration } from '../config/configuration-options.type';
import { convertApi } from './convert';

export function modify(file: string, config: ApiConfiguration) {
  return convertApi({ ...config, file, modify: true });
}
