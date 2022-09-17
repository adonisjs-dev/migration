import ColumnAction from './ColumnAction'

/**
 * Double action is an object containing information to create or alter a double column.
 */
export default class DoubleAction extends ColumnAction {
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
