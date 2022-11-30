import { CallExpression } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import JsonAction from '../../actions/column/JsonAction'

/**
 * Json parser parses the json column method.
 */
export default abstract class JsonParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'json'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new JsonAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
