/* tslint:disable:no-console **/
import { existsSync, writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { createDumperFromLanguage } from '../dumpers/dumpers.utils';
import { FileDumper } from '../dumpers/file.dumper';
import { FileParser } from '../parsers/file.parser';
import {
  createParserFromLanguage,
  createParserFromPath
} from '../parsers/parsers.utils';

export interface CliArgs extends Arguments, ConfigurationOptions {
  file: string;
}

export function parseArgs(args: CliArgs) {
  let fileParser: FileParser | undefined;
  let fileDumper: FileDumper | undefined;

  const filePath: string = args.file;

  if (!existsSync(filePath)) {
    throw new Error(`could not find file: ${filePath}`);
  }

  // find parser
  fileParser = findParser(args);

  if (!fileParser) {
    throw new Error('could not find file parser');
  }

  // parse the file
  fileParser.parse(filePath);

  // find dumper
  if (args.self) {
    fileDumper = createDumperFromLanguage(
      (fileParser.constructor as typeof FileParser).language,
      fileParser.enumFile
    );
  } else if (args.to) {
    fileDumper = createDumperFromLanguage(args.to, fileParser.enumFile);
  } else {
    console.error('No dumper supplied, use either `self` or `to` arguments');
    return;
  }

  // find dumper
  if (!fileDumper) {
    throw new Error('could not find dumper');
  }

  // apply styling
  const dumpConfig: ConfigurationOptions | undefined = args;

  // dump to file or screen
  const outputString: string = fileDumper.dump(dumpConfig);

  if (args.self) {
    writeFileSync(filePath, outputString);
    console.log(`dumped to ${filePath}`);
  } else if (args.output) {
    writeFileSync(args.output, outputString);
    console.log(`dumped to ${args.output}`);
  } else {
    console.log(outputString);
  }
}

function findParser(args: CliArgs): FileParser | undefined {
  if (args.from) {
    // from language
    const parser = createParserFromLanguage(args.from);
    return parser ? parser : undefined;
  } else {
    // from file name
    const parser = createParserFromPath(args.file);
    return parser ? parser : undefined;
  }
}
