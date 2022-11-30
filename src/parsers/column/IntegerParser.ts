import { CallExpression, parseNumericNode } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import IntegerAction from '../../actions/column/IntegerAction'

/**
 * Integer parser parses the integer column method.
 */
export default abstract class IntegerParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'integer'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new IntegerAction()
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
