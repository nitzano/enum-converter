import { readFileSync } from 'fs';
import { convertApi, convertConfig } from './convert';
import {
  ApiConfiguration,
  ConfigurationOptions
} from '../config/configuration-options.type';

export function modify(file: string, config: ApiConfiguration) {
  return convertApi({ ...config, file, modify: true });
}
