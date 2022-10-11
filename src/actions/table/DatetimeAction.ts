import ColumnAction from '../ColumnAction'
import DatetimeOptions from '../../interfaces/DatetimeOptions'

/**
 * Datetime action is an object containing information to create or alter a datetime column.
 */
export default class DatetimeAction extends ColumnAction {
  /**
   * An options object.
   * The second argument.
   */
  public options: DatetimeOptions = {}
}
