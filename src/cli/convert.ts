import { existsSync, readFileSync, writeFileSync } from 'fs';
import { fileSync } from 'tmp';
import {
  ConfigurationOptions,
  FileOptions
} from '../config/configuration-options.type';
import { createDumperFromLanguage } from '../dumpers/dumpers.utils';
import { FileDumper } from '../dumpers/file.dumper';
import { FileParser } from '../parsers/file.parser';
import {
  languageFromFilePath,
  parserFromLanguage,
  suffixFromLanguage
} from '../parsers/parsers.utils';
import { Language } from '../utils/language.enums';

export function convert(file: string, fileOptions: FileOptions) {
  // converts to a string + dumps to file
  return convertApi({ file, ...fileOptions });
}

export function convertString(
  enumStr: string,
  config: ConfigurationOptions
): string {
  // create tmp file
  // Note: we must match the suffix here so that parser will work ok
  const result = fileSync({ postfix: `.${suffixFromLanguage(config.from!)}` });

  // write enum to it
  writeFileSync(result.name, enumStr);

  // convert
  const outputString: string = convertFile(result.name, config);

  // remove tmp file
  result.removeCallback();

  return outputString;
}

/* tslint:disable:no-console **/
export function convertFile(
  filePath: string,
  config: ConfigurationOptions
): string {
  let fileParser: FileParser | undefined;
  let fileDumper: FileDumper | undefined;

  // make sure we have enum string, parser and dumper configurations
  if (!filePath || !existsSync(filePath)) {
    throw new Error(`could not find file: ${filePath}`);
  }

  if (!config.from) {
    throw new Error('could not find source parser in config');
  }

  if (!config.to) {
    throw new Error('could not detect destination dumper in config');
  }

  // find parser
  fileParser = parserFromLanguage(config.from);

  // parse enum
  fileParser.parseFile(filePath);

  // find dumper
  fileDumper = createDumperFromLanguage(config.to, fileParser.enumFile);

  return fileDumper.dump(config);
}

// TODO: merge to convertFile
export function convertApi(fileOptions: FileOptions): void {
  const config: ConfigurationOptions = {
    ...(fileOptions as ConfigurationOptions)
  };

  const sourceFileName: string | undefined = fileOptions.file;
  let destinationFileName: string | undefined;

  // make source source file exists
  if (!sourceFileName || !existsSync(sourceFileName)) {
    throw new Error(`could not find file: ${sourceFileName}`);
  }

  // try to fix from language
  if (!fileOptions.from) {
    // from file name
    config.from = languageFromFilePath(sourceFileName);
  }

  if (fileOptions.out) {
    destinationFileName = fileOptions.out;
  } else if (fileOptions.modify) {
    destinationFileName = sourceFileName;
    config.to = config.from;
  }

  // convert
  const outputString: string = convertFile(sourceFileName, config);

  // determine if should print to console or file
  if (destinationFileName) {
    writeFileSync(destinationFileName, outputString);
    console.log(`dumped to ${destinationFileName}`);
  } else {
    console.log(outputString);
  }
}
