import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'
import TimestampAction from '../../actions/table/TimestampAction'
import DatetimeOptions from '../../interfaces/DatetimeOptions'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Timestamp parser parses the timestamp column method.
 */
export default abstract class TimestampParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'timestamp'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TimestampAction()
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
  private static extractOptionsArgument(ceNode: CallExpression): DatetimeOptions {
    const options: DatetimeOptions = {}
    const args = ceNode.getArguments()
    const arg2ole = args[1]?.asKind(SyntaxKind.ObjectLiteralExpression)
    if (!arg2ole) return options

    const useTzPropNode = arg2ole.getProperty('useTz')
    if (useTzPropNode) {
      const useTzPropertyAssignment = useTzPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (useTzPropertyAssignment) {
        const useTzPAChildren = useTzPropertyAssignment.forEachChildAsArray()

        const trueKeyword = useTzPAChildren[1].asKind(SyntaxKind.TrueKeyword)
        if (trueKeyword) options.useTz = true

        const falseKeyword = useTzPAChildren[1].asKind(SyntaxKind.FalseKeyword)
        if (falseKeyword) options.useTz = false
      }
    }

    const precisionPropNode = arg2ole.getProperty('precision')
    if (precisionPropNode) {
      const precisionPropertyAssignment = precisionPropNode.asKind(SyntaxKind.PropertyAssignment)
      if (precisionPropertyAssignment) {
        const precisionPAChildren = precisionPropertyAssignment.forEachChildAsArray()

        const numericLiteral = precisionPAChildren[1].asKind(SyntaxKind.NumericLiteral)
        if (numericLiteral) options.precision = numericLiteral.getLiteralValue()
      }
    }

    return options
  }
}
