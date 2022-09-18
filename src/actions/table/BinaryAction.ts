import ColumnAction from './ColumnAction'

/**
 * Binary action is an object containing information to create or alter a binary column.
 */
export default class BinaryAction extends ColumnAction {
  /**
   * Binary length argument for MySQL.
   * The second argument.
   */
  public length: number | undefined
}
