import { CallExpression, parseStringNodeOrThrow } from '@adonis-dev/parser'
import TableActionParser from './inheritance/TableActionParser'
import TableAction from '../../actions/TableAction'
import DropColumnAction from '../../actions/table/DropColumnAction'

/**
 * Drop column parser parses the dropColumn method.
 */
export default abstract class DropColumnParser extends TableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'dropColumn'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new DropColumnAction()
    action.name = this.extractColumnName(ceNode)

    return action
  }

  /**
   * Extract a column name from the first argument.
   * @throws There is absent a column name in the method.
   */
  public static extractColumnName(ceNode: CallExpression): string {
    const args = ceNode.getArguments()
    return parseStringNodeOrThrow(args[0])
  }
}
