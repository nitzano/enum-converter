import * as yargs from 'yargs';

import { Argv } from 'yargs';
import { ALL_DUMPERS_NAMES } from '../dumpers/dumpers.utils';
import { ValuesOrder } from '../models/enum-entry/enum-entry.model';
import { EnumsOrder } from '../models/enum-file/enum-file.model';
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
          out: {
            alias: ['o', 'output'],
            describe: 'dump to output file',
            normalize: true,
            type: 'string'
          },
          modify: {
            describe: 'modify existing file',
            type: 'boolean'
          }
        })
        .group(
          [
            'emit-file-name',
            'emit-stats',
            'sort-enums',
            'name-style',
            'key-style',
            'value-style',
            'sort-values'
          ],
          'Styling options:\n'
        )
        .options({
          'emit-file-name': {
            default: true,
            describe: 'emit file name in enum file',
            type: 'boolean'
          },
          'emit-stats': {
            default: true,
            describe: 'emit stats in enum file',
            type: 'boolean'
          },
          'sort-enums': {
            alias: 'sort',
            choices: Object.values(EnumsOrder) as string[],
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
            choices: Object.values(ValuesOrder) as string[],
            describe: 'sort enum values',
            type: 'string'
          }
        });
    }
  )
  .wrap(120);
