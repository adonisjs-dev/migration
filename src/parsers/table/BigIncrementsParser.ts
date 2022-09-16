import { CallExpression } from 'ts-morph'
import ColumnTypeKind from '../../enums/ColumnTypeKind'
import IncrementsParser from './IncrementsParser'
import TableAction from '../../actions/TableAction'
import CreateColumnAction from '../../actions/table/CreateColumnAction'
import AlterColumnAction from '../../actions/table/AlterColumnAction'

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
   * @param isAlterAction if true that returns AlterColumnAction otherwise CreateColumnAction.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression, isAlterAction = false): TableAction {
    const tableAction = super.parse(ceNode, isAlterAction)
    const action: AlterColumnAction | CreateColumnAction = isAlterAction
      ? (tableAction as AlterColumnAction)
      : (tableAction as CreateColumnAction)
    action.type = ColumnTypeKind.BigIncrements
    return action
  }
}
