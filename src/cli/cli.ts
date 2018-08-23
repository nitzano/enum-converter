#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import {
  ConfigurationOptions,
  FileOptions
} from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertApi } from './convert';
import { modify } from './modify';

export type YargsConfiguration = FileOptions & Arguments;

convertApi(CLI_ARGS.argv as YargsConfiguration);
