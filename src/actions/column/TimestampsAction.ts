import ColumnAction from '../ColumnAction'

/**
 * Timestamps action is an object containing information to create or alter timestamp columns.
 */
export default class TimestampsAction extends ColumnAction {
  /**
   * Use a timestamp type instead datetime.
   * The first argument.
   */
  public useTimestampType: boolean | undefined

  /**
   * Using the current timestamp.
   * The second argument.
   */
  public makeDefaultNow: boolean | undefined
}
