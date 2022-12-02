import TableAction from './TableAction'

/**
 * For inheritance by column actions.
 */
export default abstract class ColumnAction extends TableAction {
  /**
   * Column name.
   */
  public name = ''

  /**
   * Altering or creating a column.
   */
  public isAlter = false

  /**
   * Is a column nullable.
   */
  public isNullable = true
}
