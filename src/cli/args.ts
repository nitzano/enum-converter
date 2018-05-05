import * as yargs from 'yargs';

import { Argv } from 'yargs';
import { ALL_DUMPERS_NAMES } from '../dumpers/dumpers.utils';
import { EnumValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EntriesOrder } from '../models/enum-file/enum-file.model';
import { ALL_PARSER_NAMES } from '../parsers/parsers.utils';
import { StringStyleTypes } from '../utils/string-styler/string-styler.enums';

/* tslint:disable:object-literal-sort-keys */
export const CLI_ARGS = yargs
  .command(
    '$0 <file>',
    'converts enums from one language to another',
    (argv: Argv) => {
      return argv
        .usage('$0 <file> [options]')
        .positional('file', {
          desc: 'source file to convert',
          normalize: true,
          type: 'string'
        })
        .group(['from', 'to', 'output', 'self'], 'Conversion options:\n')
        .options({
          from: {
            alias: 'parser',
            choices: ALL_PARSER_NAMES,
            describe: 'source language (explicit)'
          },
          to: {
            alias: 'dumper',
            choices: ALL_DUMPERS_NAMES,
            describe: 'destination language'
          },
          output: {
            alias: ['o', 'out'],
            describe: 'dump to output file',
            normalize: true,
            type: 'string'
          },
          self: {
            describe: 'dump to the same file',
            type: 'boolean'
          }
        })
        .group(
          [
            'emit-header',
            'emit-stats',
            'sort',
            'name-style',
            'key-style',
            'value-style',
            'sort-values'
          ],
          'Styling options:\n'
        )
        .options({
          'emit-header': {
            default: true,
            describe: 'emit header in enum file',
            type: 'boolean'
          },
          'emit-stats': {
            default: true,
            describe: 'emit stats in enum file',
            type: 'boolean'
          },
          sort: {
            alias: 'sort-enums',
            choices: Object.values(EntriesOrder) as string[],
            describe: 'sort enums in file',
            type: 'string'
          },
          'name-style': {
            choices: StringStyleTypes,
            describe: 'style enum name',
            type: 'string'
          },
          'key-style': {
            choices: StringStyleTypes,
            describe: 'style enum keys',
            type: 'string'
          },
          'value-style': {
            choices: StringStyleTypes,
            describe: 'style enum values (strings only)',
            type: 'string'
          },
          'sort-values': {
            choices: Object.values(EnumValuesOrder) as string[],
            describe: 'sort enum values',
            type: 'string'
          }
        });
    }
  )
  .wrap(120).argv;
