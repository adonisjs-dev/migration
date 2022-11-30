import ColumnAction from '../ColumnAction'
import EnumOptions from '../../parsers/column/interfaces/EnumOptions'

/**
 * Enum action is an object containing information to create or alter an enum column.
 */
export default class EnumAction extends ColumnAction {
  /**
   * Enum values.
   * The second argument.
   */
  public values: Array<string | number | boolean> = []

  /**
   * Enum options.
   * The third argument.
   */
  public options: EnumOptions = {}
}
