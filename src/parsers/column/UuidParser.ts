import { CallExpression } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import UuidAction from '../../actions/column/UuidAction'

/**
 * Uuid parser parses the uuid column method.
 */
export default abstract class UuidParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'uuid'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new UuidAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
