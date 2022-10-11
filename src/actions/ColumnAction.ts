import TableAction from './TableAction'

/**
 * Column action is abstract class for inheritance by actions.
 */
export default abstract class ColumnAction extends TableAction {
  /**
   * Column name.
   */
  public name = ''

  /**
   * Altering or creating the column.
   */
  public isAlter = false
}
