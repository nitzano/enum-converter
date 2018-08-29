#!/usr/bin/env node
import { Arguments } from 'yargs';
import { FileOptions } from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertApi } from './convert';

export type YargsConfiguration = FileOptions & Arguments;

convertApi(CLI_ARGS.argv as YargsConfiguration);
