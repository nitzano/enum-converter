import { AssignmentExpression, BaseNode, ExpressionStatement, FunctionDeclaration, Literal, Program } from 'estree';
import { walk } from 'estree-walker';
import filbert from 'filbert';
import { EnumValue, EnumValueType } from '../../models';
import { EnumEntry } from '../../models/enum-entry/enum-entry.model';
import { Language } from '../../utils/language.enums';
import { FileParser } from '../file.parser';


export class PythonParser extends FileParser {
  static language: Language = Language.Python;

  extractEntries(filePath: string): EnumEntry[] {
    const ast: Program = filbert.parse(this.getData(filePath));

    const entries: EnumEntry[] = [];
    // scan ast for enums
    walk(ast, {
      enter: (node: BaseNode , parent: BaseNode ) => {
        if (node.type === "FunctionDeclaration") {
          let functionDeclaration: FunctionDeclaration = node as FunctionDeclaration;
          if (functionDeclaration.body.body.length > 1) {
            if (this.isEnumCallExpression(functionDeclaration.body.body[0])) {
              const entryName = functionDeclaration?.id?.name;
              const entryValues: EnumValue[] = this.extractEnumValues(functionDeclaration);
              if (entryName) {
                const enumEntry = new EnumEntry(entryName, entryValues);
                entries.push(enumEntry);
              }
            }
          }          
        }
      }
    });

    return entries;
  }

  private isEnumCallExpression(node: BaseNode): boolean {
    if (node?.type === "ExpressionStatement") {      
      const expressionStatement  = node as ExpressionStatement;

      const expression = expressionStatement.expression;

      if (expression.type === 'CallExpression') {

        if (expression.arguments.length === 1 && expression.arguments[0].type === 'ThisExpression') {
          const argument = expression.arguments[0];
          if (argument.type === 'ThisExpression' && expression.callee.type === 'MemberExpression' && expression.callee.object && expression.callee.object.type === 'Identifier') {
            const indentifier = expression.callee.object

            if (  ['Enum', 'IntEnum'].includes(indentifier.name)) {
              return true
            }
          }
        }
      }
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

