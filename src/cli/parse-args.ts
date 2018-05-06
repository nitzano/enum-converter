/* tslint:disable:no-console **/
import { existsSync, writeFileSync } from 'fs';
import { Arguments } from 'yargs';
import { DEFAULT_ENUM_CONFIG, DumpConfig } from '../dumpers/dump-config.type';
import { createDumperFromLanguage } from '../dumpers/dumpers.utils';
import { FileDumper } from '../dumpers/file.dumper';
import { EnumValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EntriesOrder } from '../models/enum-file/enum-file.model';
import { FileParser } from '../parsers/file.parser';
import {
  createParserFromLanguage,
  createParserFromPath
} from '../parsers/parsers.utils';
import { Language } from '../utils/language.enums';
import { StringStyle } from '../utils/string-styler/string-styler.enums';

export interface CliArgs extends Arguments {
  _: any[];
  $0: string;
  file: string;
  from: Language;
  to: Language;
  self: boolean;
  output: string;
  sort: EntriesOrder;
  emitHeader: boolean;
  emitStats: boolean;
  nameStyle: StringStyle;
  keyStyle: StringStyle;
  valueStyle: StringStyle;
  sortValues: EnumValuesOrder;
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
  const dumpConfig: DumpConfig | undefined = argsToConfig(args);

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

function argsToConfig(args: CliArgs): DumpConfig | undefined {
  if (args) {
    return {
      emitHeader: args.emitHeader
        ? args.emitHeader
        : DEFAULT_ENUM_CONFIG.emitHeader,
      emitStats: args.emitStats
        ? args.emitStats
        : DEFAULT_ENUM_CONFIG.emitHeader,
      keyStyle: args.keyStyle ? args.keyStyle : DEFAULT_ENUM_CONFIG.keyStyle,
      nameStyle: args.nameStyle
        ? args.nameStyle
        : DEFAULT_ENUM_CONFIG.nameStyle,
      sortEntries: args.sort ? args.sort : DEFAULT_ENUM_CONFIG.sortEntries,
      sortValues: args.sortValues
        ? args.sortValues
        : DEFAULT_ENUM_CONFIG.sortValues,
      valueStyle: args.valueStyle
        ? args.valueStyle
        : DEFAULT_ENUM_CONFIG.valueStyle
    };
  }

  return undefined;
}
