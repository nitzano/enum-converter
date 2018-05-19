import { readFileSync } from 'fs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { CliConfiguration } from './cli';
import { convertConfig, convertFromCLi } from './convert';

export function modify(file: string, config: CliConfiguration) {
  return convertFromCLi({ ...config, file, modify: true });
}
