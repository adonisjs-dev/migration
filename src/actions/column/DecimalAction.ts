import ColumnAction from '../ColumnAction'

/**
 * Decimal action is an object containing information to create or alter a decimal column.
 */
export default class DecimalAction extends ColumnAction {
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
