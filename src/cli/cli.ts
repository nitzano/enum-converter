#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertConfig, convertFromCLi } from './convert';
import { modify } from './modify';

export interface CliConfiguration extends ConfigurationOptions {
  file: string;
  modify?: boolean;
  out?: string;
}

export type YargsConfiguration = CliConfiguration & Arguments;

convertFromCLi(CLI_ARGS.argv as YargsConfiguration);
