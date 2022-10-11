import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import JsonAction from '../../actions/table/JsonAction'

/**
 * Json parser parses the json column method.
 */
export default abstract class JsonParser extends CreatableActionParser {
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
