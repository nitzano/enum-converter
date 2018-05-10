import { existsSync, writeFileSync } from 'fs';
import { ConfigurationOptions } from '../config/configuration-options.type';
import { createDumperFromLanguage } from '../dumpers/dumpers.utils';
import { FileDumper } from '../dumpers/file.dumper';
import { FileParser } from '../parsers/file.parser';
import {
  createParserFromLanguage,
  createParserFromPath
} from '../parsers/parsers.utils';
import { Language } from '../utils/language.enums';

export function convert(
  file: string,
  language: Language,
  config: ConfigurationOptions
) {
  return convertConfig({ ...config, file, to: language });
}

/* tslint:disable:no-console **/
export function convertConfig(
  config: ConfigurationOptions,
  silent: boolean = true
): string {
  let fileParser: FileParser | undefined;
  let fileDumper: FileDumper | undefined;

  const filePath: string | undefined = config.file;

  if (!filePath || !existsSync(filePath)) {
    throw new Error(`could not find file: ${filePath}`);
  }

  // find parser
  fileParser = findParser(filePath, config);

  if (!fileParser) {
    throw new Error('could not find file parser');
  }

  // parse the file
  fileParser.parse(filePath);

  // find dumper
  if (config.modify) {
    fileDumper = createDumperFromLanguage(
      (fileParser.constructor as typeof FileParser).language,
      fileParser.enumFile
    );
  } else if (config.to) {
    fileDumper = createDumperFromLanguage(config.to, fileParser.enumFile);
  } else {
    throw new Error(
      'No dumper supplied, use either `modify` or `to` arguments'
    );
  }

  // find dumper
  if (!fileDumper) {
    throw new Error('could not find dumper');
  }

  const outputString: string = fileDumper.dump(config);

  if (config.modify) {
    writeFileSync(filePath, outputString);
    if (!silent) {
      console.log(`dumped to ${filePath}`);
    }
  } else if (config.output) {
    writeFileSync(config.output, outputString);
    if (!silent) {
      console.log(`dumped to ${config.output}`);
    }
  } else {
    if (!silent) {
      console.log(outputString);
    }
  }

  // dump to file or screen
  return outputString;
}

function findParser(
  filePath: string,
  config: ConfigurationOptions
): FileParser | undefined {
  if (config.from) {
    // from language
    const parser = createParserFromLanguage(config.from);
    return parser ? parser : undefined;
  } else {
    // from file name
    const parser = createParserFromPath(filePath);
    return parser ? parser : undefined;
  }
}
