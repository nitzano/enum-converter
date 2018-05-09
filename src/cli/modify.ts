import { ConfigurationOptions } from '../config/configuration-options.type';
import { convertConfig } from './convert';

export function modify(filePath: string, config: ConfigurationOptions) {
  return convertConfig(filePath, { ...config, modify: true });
}
