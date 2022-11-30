import ColumnAction from '../ColumnAction'

/**
 * String action is an object containing information to create or alter a string column.
 */
export default class StringAction extends ColumnAction {
  /**
   * String length.
   * The second argument.
   */
  public length: number | undefined
}
