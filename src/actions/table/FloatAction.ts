import ColumnAction from '../table/ColumnAction'

/**
 * Float action is an object containing information to create or alter a float column.
 */
export default class FloatAction extends ColumnAction {
  /**
   * Precision.
   * The second argument.
   */
  public precision: number | undefined

  /**
   * Scale.
   * The third argument.
   */
  public scale: number | undefined
}
