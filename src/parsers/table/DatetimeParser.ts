import { SyntaxKind, CallExpression, parseObjectNodeAsInterface, ObjectToParse } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import DatetimeAction from '../../actions/table/DatetimeAction'
import DatetimeOptions from '../../interfaces/DatetimeOptions'

/**
 * Datetime parser parses the datetime column method.
 */
export default abstract class DatetimeParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'datetime'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new DatetimeAction()
    action.name = this.extractColumnName(ceNode)
    action.options = this.extractOptionsArgument(ceNode)
    return action
  }

  /**
   * Extract options from the argument.
   */
  private static extractOptionsArgument(ceNode: CallExpression): DatetimeOptions {
    const args = ceNode.getArguments()
    if (args[1] === undefined) return {}

    const objectToParse: ObjectToParse = {
      useTz: SyntaxKind.BooleanKeyword,
      precision: SyntaxKind.NumericLiteral,
    }

    const options = parseObjectNodeAsInterface(args[1], objectToParse)
    if (options === undefined) return {}

    return options
  }
}
