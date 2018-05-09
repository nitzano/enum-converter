#!/usr/bin/env node

import { CLI_ARGS } from './args';
import { EnumcArgs, parseArgs } from './parse-args';

parseArgs(CLI_ARGS.argv as EnumcArgs);
