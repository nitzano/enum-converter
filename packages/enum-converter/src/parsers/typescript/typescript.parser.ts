import {
  CompilerOptions,
  createProgram,
  isEnumDeclaration,
  isEnumMember,
  isIdentifier,
  isNumericLiteral,
  isStringLiteral,
  Node,
  Program,
  ScriptTarget,
  SourceFile
} from 'typescript';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import {
  EnumValue,
  EnumValueType
} from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileParser } from '../file.parser';

export class TypescriptParser extends FileParser {
  static language: Language = Language.Typescript;
  tmpFileSuffix: string = 'ts';

  extractEntries(filePath: string): EnumEntry[] {
    const entries: EnumEntry[] = [];

    // let fileData = this.getData(filePath);

    const compilerOptions: CompilerOptions = {
      experimentalAsyncFunctions: true,
      experimentalDecorators: true,
      noResolve: true,
      preserveConstEnums: true,
      target: ScriptTarget.Latest
    };

    const program: Program = createProgram([filePath], compilerOptions);

    const sourceFile: SourceFile | undefined = program.getSourceFile(filePath);

    const nodeCb = (node: Node) => {
      if (node) {
        if (isEnumDeclaration(node)) {
          const entry = new EnumEntry(node.name.text);

          node.members.forEach(member => {
            if (isEnumMember(member)) {
              let enumName: string | undefined;
              let enumValue: EnumValueType | undefined;

              if (isIdentifier(member.name)) {
                enumName = member.name.text;
              }

              if (member.initializer && isNumericLiteral(member.initializer)) {
                enumValue = Number(member.initializer.text);
              } else if (
                member.initializer &&
                isStringLiteral(member.initializer)
              ) {
                enumValue = String(member.initializer.text);
              } else if (member.initializer === undefined) {
                enumValue = null; // auto
              }

              if (enumName !== undefined && enumValue !== undefined) {
                entry.values.push(new EnumValue(enumName, enumValue));
              }
            }
          });

          entries.push(entry);
        }

        node.forEachChild(nodeCb);
      }
    };

    if (sourceFile) {
      sourceFile.forEachChild(nodeCb);
    } else {
      console.error('could not read file');
    }

    return entries;
  }
}
