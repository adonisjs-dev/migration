import { CallExpression } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import BooleanAction from '../../actions/column/BooleanAction'

/**
 * Boolean parser parses the boolean column method.
 */
export default abstract class BooleanParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'boolean'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new BooleanAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
