import ColumnAction from '../table/ColumnAction'

/**
 * Integer action is an object containing information to create or alter an integer column.
 */
export default class IntegerAction extends ColumnAction {
  /**
   * Integer length.
   * The second argument.
   */
  public length: number | undefined
}
