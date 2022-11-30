import { CallExpression } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import JsonbAction from '../../actions/column/JsonbAction'

/**
 * Jsonb parser parses the jsonb column method.
 */
export default abstract class JsonbParser extends ColumnActionParser {
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
