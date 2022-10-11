import { CallExpression } from '@adonis-dev/parser'
import IncrementsParser from './IncrementsParser'
import TableAction from '../../actions/TableAction'
import IncrementsAction from '../../actions/table/IncrementsAction'
import BigIncrementsAction from '../../actions/table/BigIncrementsAction'

/**
 * Big increments parser parses the bigIncrements column method.
 */
export default abstract class BigIncrementsParser extends IncrementsParser {
  /**
   * Identifier.
   */
  public static identifier = 'bigIncrements'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const tableAction = super.parse(ceNode)
    const incrementsAction = tableAction as IncrementsAction
    const action = new BigIncrementsAction()
    Object.assign(action, incrementsAction)
    return action
  }
}
