#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { CLI_ARGS } from './args';
import { convertConfig } from './convert';
import { modify } from './modify';

type CliArgs = Arguments & ConfigurationOptions;

convertFile(CLI_ARGS.argv as CliArgs);

/* tslint:disable:no-console **/
function convertFile(args: CliArgs) {
  if (args.file) {
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

  throw new Error('could not find file in args');
}
