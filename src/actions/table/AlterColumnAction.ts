import TableAction from '../TableAction'
import ColumnTypeKind from '../../enums/ColumnTypeKind'

/**
 * Alter column action is an object containing information to alter a column.
 */
export default class AlterColumnAction extends TableAction {
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
