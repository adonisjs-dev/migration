import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'
import IncrementsAction from '../../actions/table/IncrementsAction'
import IncrementsOptions from '../../interfaces/IncrementsOptions'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Increments parser parses the increments column method.
 */
export default abstract class IncrementsParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'increments'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new IncrementsAction()
    action.name = this.extractColumnName(ceNode)
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
   * Extract options from the argument.
   */
  private static extractOptionsArgument(ceNode: CallExpression): IncrementsOptions {
    const options: IncrementsOptions = {}
    const args = ceNode.getArguments()
    const arg2ole = args[1]?.asKind(SyntaxKind.ObjectLiteralExpression)
    if (!arg2ole) return options

    const pkPropNode = arg2ole.getProperty('primaryKey')
    if (pkPropNode) {
      const pkPropertyAssignment = pkPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (pkPropertyAssignment) {
        const pkPAChildren = pkPropertyAssignment.forEachChildAsArray()

        const trueKeyword = pkPAChildren[1].asKind(SyntaxKind.TrueKeyword)
        if (trueKeyword) options.primaryKey = true

        const falseKeyword = pkPAChildren[1].asKind(SyntaxKind.FalseKeyword)
        if (falseKeyword) options.primaryKey = false
      }
    }

    return options
  }
}
