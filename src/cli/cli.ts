#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertConfig } from './convert';
import { modify } from './modify';

type CliArgs = Arguments & ConfigurationOptions;
convertConfig(CLI_ARGS.argv as CliArgs, false);
