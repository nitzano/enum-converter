import {
  AssignmentExpression,
  FunctionDeclaration,
  Literal,
  Node,
  Program
} from 'estree';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import {
  EnumValue,
  EnumValueType
} from '../../models/enum-value/enum-value.model';
import { Language } from '../../utils/language.enums';
import { FileParser } from '../file.parser';

const filbert = require('filbert');
const walk = require('estree-walker').walk;

export class PythonParser extends FileParser {
  static language: Language = Language.Python;

  extractEntries(filePath: string): EnumEntry[] {
    const ast: Program = filbert.parse(this.getData(filePath));

    const entries: EnumEntry[] = [];
    // scan ast for enums
    walk(ast, {
      enter: (node: Node, parent: Node) => {
        if (
          node &&
          node.type === 'FunctionDeclaration' &&
          node.body &&
          node.body.body.length > 1 &&
          this.isEnumCallExpression(node.body.body[0])
        ) {
          const entryName = node.id.name;
          const entryValues: EnumValue[] = this.extractEnumValues(node);

          const enumEntry = new EnumEntry(entryName, entryValues);
          entries.push(enumEntry);
        }
      }
    });

    return entries;
  }

  private isEnumCallExpression(node: Node): boolean {
    if (
      node &&
      node.type === 'ExpressionStatement' &&
      node.expression &&
      node.expression.type === 'CallExpression' &&
      node.expression.arguments &&
      node.expression.arguments.length === 1 &&
      node.expression.arguments[0].type === 'ThisExpression' &&
      node.expression.callee &&
      node.expression.callee.type === 'MemberExpression' &&
      node.expression.callee.object &&
      node.expression.callee.object.type === 'Identifier' &&
      ['Enum', 'IntEnum'].includes(node.expression.callee.object.name)
    ) {
      return true;
    }
    return false;
  }

  private extractEnumValues(node: FunctionDeclaration): EnumValue[] {
    const enumValues: EnumValue[] = [];

    if (node && node.body && node.body.body.length > 0) {
      node.body.body.forEach(child => {
        if (
          child.type === 'ExpressionStatement' &&
          child.expression &&
          child.expression.type === 'AssignmentExpression'
        ) {
          // extract name
          let enumName: string | undefined;

          if (
            child.expression.left &&
            child.expression.left.type === 'MemberExpression' &&
            child.expression.left.property &&
            child.expression.left.property.type === 'Identifier'
          ) {
            enumName = child.expression.left.property.name;
          }

          // extract value
          let enumValue: EnumValueType | undefined;

          if (this.isLiteral(child.expression)) {
            // string/number/boolean
            enumValue = (child.expression.right as Literal)
              .value as EnumValueType;
          } else if (this.isAuto(child.expression)) {
            enumValue = null; // auto
          }

          if (enumName !== undefined && enumValue !== undefined) {
            enumValues.push(new EnumValue(enumName, enumValue));
          }
        }
      });
    }

    return enumValues;
  }

  private isLiteral(expression: AssignmentExpression): boolean {
    return (
      expression &&
      expression.right &&
      expression.right.type === 'Literal' &&
      expression.right.value !== undefined &&
      expression.right.value !== null
    );
  }

  private isAuto(expression: AssignmentExpression): boolean {
    return (
      expression &&
      expression.right &&
      expression.right.type === 'CallExpression' &&
      expression.right.callee &&
      expression.right.callee.type === 'Identifier' &&
      expression.right.callee.name === 'auto'
    );
  }
}
