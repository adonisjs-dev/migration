import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import JsonbAction from '../../actions/table/JsonbAction'

/**
 * Jsonb parser parses the jsonb column method.
 */
export default abstract class JsonbParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'jsonb'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new JsonbAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
