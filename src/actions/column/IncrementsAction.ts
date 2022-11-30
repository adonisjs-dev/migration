import ColumnAction from '../ColumnAction'
import IncrementsOptions from '../../parsers/column/interfaces/IncrementsOptions'

/**
 * Increments action is an object containing information to create or alter an increments column.
 */
export default class IncrementsAction extends ColumnAction {
  /**
   * An options object.
   * The second argument.
   */
  public options: IncrementsOptions = {}
}
