import { ConfigurationOptions } from '../config/configuration-options.type';
import { convertConfig } from './convert';

export function modify(file: string, config: ConfigurationOptions) {
  return convertConfig({ ...config, file, modify: true });
}
