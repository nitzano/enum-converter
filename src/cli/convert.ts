import { existsSync, readFileSync, writeFileSync } from 'fs';
import { fileSync } from 'tmp';
import {
  ApiConfiguration,
  ConfigurationOptions
} from '../config/configuration-options.type';
import { createDumperFromLanguage } from '../dumpers/dumpers.utils';
import { FileDumper } from '../dumpers/file.dumper';
import { FileParser } from '../parsers/file.parser';
import {
  createParserFromLanguage,
  languageFromFilePath
} from '../parsers/parsers.utils';
import { Language } from '../utils/language.enums';

export const convert = convertString;

export function convertFile(filePath: string, config: ConfigurationOptions) {
  const enumStr: string = readFileSync(filePath).toString();
  return convertConfig(enumStr, config);
}

export function convertString(
  enumStr: string,
  config: ConfigurationOptions
): string {
  return convertConfig(enumStr, config);
}

/* tslint:disable:no-console **/
export function convertConfig(
  enumStr: string,
  config: ConfigurationOptions,
  silent: boolean = true
): string {
  let fileParser: FileParser | undefined;
  let fileDumper: FileDumper | undefined;

  // make sure we have enum string, parser and dumper configurations
  if (enumStr === undefined || enumStr === null) {
    throw new Error('invalid enum string');
  }

  if (!config.from) {
    throw new Error('could not find source parser in config');
  }

  if (!config.to) {
    throw new Error('could not detect destination dumper in config');
  }

  // find parser
  fileParser = createParserFromLanguage(config.from);

  // parse enum
  fileParser.parse(enumStr);

  // find dumper
  fileDumper = createDumperFromLanguage(config.to, fileParser.enumFile);

  return fileDumper.dump(config);
}

export function convertApi(apiConfig: ApiConfiguration): void {
  const config: ConfigurationOptions = {
    ...(apiConfig as ConfigurationOptions)
  };

  const sourceFileName: string | undefined = apiConfig.file;
  let destinationFileName: string | undefined;

  // make source source file exists
  if (!sourceFileName || !existsSync(sourceFileName)) {
    throw new Error(`could not find file: ${sourceFileName}`);
  }

  const enumStr: string = readFileSync(sourceFileName).toString();

  // try to fix from language
  if (!apiConfig.from) {
    // from file name
    config.from = languageFromFilePath(sourceFileName);
  }

  if (apiConfig.out) {
    destinationFileName = apiConfig.out;
  } else if (apiConfig.modify) {
    destinationFileName = sourceFileName;
    config.to = config.from;
  }

  // convert
  const outputString: string = convertConfig(enumStr, config);

  // determine if should print to console or file
  if (destinationFileName) {
    writeFileSync(destinationFileName, outputString);
    console.log(`dumped to ${destinationFileName}`);
  } else {
    console.log(outputString);
  }
}
