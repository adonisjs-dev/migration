import { CallExpression } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import TimeAction from '../../actions/column/TimeAction'

/**
 * Time parser parses the time column method.
 */
export default abstract class TimeParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'time'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TimeAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
