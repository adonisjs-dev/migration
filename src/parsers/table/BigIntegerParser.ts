import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import BigIntegerAction from '../../actions/table/BigIntegerAction'

/**
 * Big increments parser parses the bigIncrements column method.
 */
export default abstract class BigIncrementsParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'bigInteger'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new BigIntegerAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }
}
