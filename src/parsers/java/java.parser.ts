import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { parse } from 'java-ast';
import {
  EnumConstantContext,
  EnumDeclarationContext,
  ExpressionContext
} from 'java-ast/dist/parser/JavaParser';
import { EnumValue } from '../../models';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { Language } from '../../utils/language.enums';
import { FileParser } from '../file.parser';

export class JavaParser extends FileParser {
  static language: Language = Language.Java;

  extractEntries(filePath: string): EnumEntry[] {
    const ast = parse(this.getData(filePath));

    const entries: EnumEntry[] = [];
    const pendingNodes: ParseTree[] = [ast];
    while (pendingNodes.length) {
      const node = pendingNodes.shift();
      if (node && node.childCount) {
        if (node.payload instanceof EnumDeclarationContext) {
          entries.push(
            this.parseEnumNode(node.payload as EnumDeclarationContext)
          );
        }
        for (let i = 0; i < node.childCount; i++) {
          pendingNodes.push(node.getChild(i));
        }
      }
    }

    return entries;
  }

  private parseEnumNode(enumNode: EnumDeclarationContext) {
    const name = enumNode.IDENTIFIER().text;
    const values = enumNode.enumConstants();
    if (!values) {
      return new EnumEntry(name, []);
    }

    const parsedValues: EnumValue[] = [];
    for (const value of values.children || []) {
      if (value instanceof EnumConstantContext) {
        const args = value.arguments();
        let parsedArg = null;
        const argList = args && args.expressionList();
        if (argList && argList.childCount) {
          const firstArg = argList && argList.getChild(0);
          if (firstArg instanceof ExpressionContext) {
            parsedArg = this.expressionValue(firstArg);
          }
        }
        parsedValues.push(new EnumValue(value.IDENTIFIER().text, parsedArg));
      }
    }

    return new EnumEntry(name, parsedValues);
  }

  private expressionValue(expr: ExpressionContext) {
    const primary = expr.primary();
    if (!primary) {
      return null;
    }

    const literal = primary.literal();
    if (!literal) {
      return null;
    }

    const stringLiteral = literal.STRING_LITERAL();
    const boolLiteral = literal.BOOL_LITERAL();
    const intLiteral = literal.integerLiteral();
    const floatLiteral = literal.floatLiteral();

    if (stringLiteral) {
      return JSON.parse(stringLiteral.text);
    }

    if (intLiteral) {
      return parseInt(intLiteral.text); // tslint:disable-line:radix
    }

    if (floatLiteral) {
      return parseFloat(floatLiteral.text);
    }

    if (boolLiteral) {
      return boolLiteral.text === 'true';
    }

    return null;
  }
}
