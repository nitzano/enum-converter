#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import {
  ApiConfiguration,
  ConfigurationOptions
} from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertApi } from './convert';
import { modify } from './modify';

export type YargsConfiguration = ApiConfiguration & Arguments;

convertApi(CLI_ARGS.argv as YargsConfiguration);
