import TableAction from '../TableAction'
import ColumnTypeKind from '../../enums/ColumnTypeKind'

/**
 * Create column action is an object containing information to create a column.
 */
export default class CreateColumnAction extends TableAction {
  /**
   * Column name.
   */
  public name = ''

  /**
   * Column type.
   */
  public type = ColumnTypeKind.None

  /**
   * Options.
   */
  public options: { [name: string]: string | boolean } = {}
}
