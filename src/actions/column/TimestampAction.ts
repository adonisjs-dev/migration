import ColumnAction from '../ColumnAction'
import DatetimeOptions from '../../parsers/column/interfaces/DatetimeOptions'

/**
 * Timestamp action is an object containing information to create or alter a timestamp column.
 */
export default class TimestampAction extends ColumnAction {
  /**
   * An options object.
   * The second argument.
   */
  public options: DatetimeOptions = {}
}
