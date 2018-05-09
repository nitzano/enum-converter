#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertConfig } from './convert';
import { modify } from './modify';

/* tslint:disable:no-console **/
interface CliArgs extends Arguments, ConfigurationOptions {
  file: string;
}
parseArgs(CLI_ARGS.argv as CliArgs);

function parseArgs(args: CliArgs) {
  const filePath: string = args.file;

  if (args.modify) {
    const outputString = modify(filePath, args);
    writeFileSync(filePath, outputString);
    console.log(`dumped to ${filePath}`);
  } else {
    const outputString = convertConfig(filePath, args);
    if (args.output) {
      writeFileSync(args.output, outputString);
      console.log(`dumped to ${args.output}`);
    } else {
      console.log(outputString);
    }
  }
}
