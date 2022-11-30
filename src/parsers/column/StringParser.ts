import { CallExpression, parseNumericNode } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import StringAction from '../../actions/column/StringAction'

/**
 * String parser parses the string column method.
 */
export default abstract class StringParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'string'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new StringAction()
    action.name = this.extractColumnName(ceNode)
    action.length = this.extractLengthArgument(ceNode)
    return action
  }

  /**
   * Extract a length value from the argument.
   */
  private static extractLengthArgument(ceNode: CallExpression): number | undefined {
    const args = ceNode.getArguments()
    if (args[1] === undefined) return undefined

    return parseNumericNode(args[1])
  }
}
