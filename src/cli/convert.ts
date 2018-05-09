import { existsSync } from 'fs';
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
  filePath: string,
  language: Language,
  config: ConfigurationOptions
) {
  return convertConfig(filePath, { ...config, to: language });
}

export function convertConfig(
  filePath: string,
  config: ConfigurationOptions
): string {
  let fileParser: FileParser | undefined;
  let fileDumper: FileDumper | undefined;

  if (!existsSync(filePath)) {
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

  // dump to file or screen
  return fileDumper.dump(config);
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