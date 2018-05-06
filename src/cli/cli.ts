#!/usr/bin/env node

import { CLI_ARGV } from './args';
import { CliArgs, parseArgs } from './parse-args';

parseArgs(CLI_ARGV as CliArgs);
