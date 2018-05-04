#!/usr/bin/env node

import { CLI_ARGS } from './args';
import { CliArgs, parseArgs } from './parse-args';

parseArgs(CLI_ARGS as CliArgs);
