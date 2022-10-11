import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import DateAction from '../../actions/table/DateAction'

/**
 * Date parser parses the date column method.
 */
export default abstract class DateParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'date'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new DateAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
