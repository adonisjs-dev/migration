import { SyntaxKind, CallExpression, parseObjectNodeAsInterface, ObjectToParse } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import TimestampAction from '../../actions/table/TimestampAction'
import DatetimeOptions from '../../interfaces/DatetimeOptions'

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
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TimestampAction()
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
