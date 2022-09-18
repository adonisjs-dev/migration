import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'
import EnumAction from '../../actions/table/EnumAction'
import Value from '../../types/Value'
import EnumOptions from '../../interfaces/EnumOptions'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Enum parser parses the enum column method.
 */
export default abstract class EnumParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'enum'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new EnumAction()
    action.name = this.extractColumnName(ceNode)
    action.values = this.extractValuesArgument(ceNode)
    action.options = this.extractOptionsArgument(ceNode)
    return action
  }

  /**
   * Extract a column name from the argument.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  private static extractColumnName(ceNode: CallExpression): string {
    const args = ceNode.getArguments()
    const arg1sl = args[0]?.asKind(SyntaxKind.StringLiteral)
    if (!arg1sl) throw new AbsentColumnNameException()
    return arg1sl.getLiteralValue()
  }

  /**
   * Extract values from the argument.
   */
  private static extractValuesArgument(ceNode: CallExpression): Value[] {
    const values: Value[] = []
    const args = ceNode.getArguments()
    const arg2ale = args[1]?.asKind(SyntaxKind.ArrayLiteralExpression)
    if (!arg2ale) return values

    const aleChildren = arg2ale.forEachChildAsArray()

    aleChildren.forEach((node) => {
      const stringLiteral = node.asKind(SyntaxKind.StringLiteral)
      if (stringLiteral) return values.push(stringLiteral.getLiteralValue())

      const numericLiteral = node.asKind(SyntaxKind.NumericLiteral)
      if (numericLiteral) return values.push(numericLiteral.getLiteralValue())

      const trueKeyword = node.asKind(SyntaxKind.TrueKeyword)
      if (trueKeyword) return values.push(trueKeyword.getLiteralValue())

      const falseKeyword = node.asKind(SyntaxKind.FalseKeyword)
      if (falseKeyword) return values.push(falseKeyword.getLiteralValue())
    })

    return values
  }

  /**
   * Extract options from the argument.
   */
  private static extractOptionsArgument(ceNode: CallExpression): EnumOptions {
    const options: EnumOptions = {}
    const args = ceNode.getArguments()
    const arg3ole = args[2]?.asKind(SyntaxKind.ObjectLiteralExpression)
    if (!arg3ole) return options

    const unPropNode = arg3ole.getProperty('useNative')
    if (unPropNode) {
      const unPropertyAssignment = unPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (unPropertyAssignment) {
        const unPAChildren = unPropertyAssignment.forEachChildAsArray()

        const trueKeyword = unPAChildren[1].asKind(SyntaxKind.TrueKeyword)
        if (trueKeyword) options.useNative = true

        const falseKeyword = unPAChildren[1].asKind(SyntaxKind.FalseKeyword)
        if (falseKeyword) options.useNative = false
      }
    }

    const etPropNode = arg3ole.getProperty('existingType')
    if (etPropNode) {
      const etPropertyAssignment = etPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (etPropertyAssignment) {
        const etPAChildren = etPropertyAssignment.forEachChildAsArray()

        const trueKeyword = etPAChildren[1].asKind(SyntaxKind.TrueKeyword)
        if (trueKeyword) options.existingType = true

        const falseKeyword = etPAChildren[1].asKind(SyntaxKind.FalseKeyword)
        if (falseKeyword) options.existingType = false
      }
    }

    const snPropNode = arg3ole.getProperty('schemaName')
    if (snPropNode) {
      const snPropertyAssignment = snPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (snPropertyAssignment) {
        const snPAChildren = snPropertyAssignment.forEachChildAsArray()

        const stringLiteral = snPAChildren[1].asKind(SyntaxKind.StringLiteral)
        if (stringLiteral) options.schemaName = stringLiteral.getLiteralValue()
      }
    }

    const enPropNode = arg3ole.getProperty('enumName')
    if (enPropNode) {
      const enPropertyAssignment = enPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (enPropertyAssignment) {
        const enPAChildren = enPropertyAssignment.forEachChildAsArray()

        const stringLiteral = enPAChildren[1].asKind(SyntaxKind.StringLiteral)
        if (stringLiteral) options.enumName = stringLiteral.getLiteralValue()
      }
    }

    return options
  }
}
