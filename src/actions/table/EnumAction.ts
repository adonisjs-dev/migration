import ColumnAction from '../table/ColumnAction'
import Value from '../../types/Value'
import EnumOptions from '../../interfaces/EnumOptions'

/**
 * Enum action is an object containing information to create or alter an enum column.
 */
export default class EnumAction extends ColumnAction {
  /**
   * Enum values.
   * The second argument.
   */
  public values: Value[] = []

  /**
   * Enum options.
   * The third argument.
   */
  public options: EnumOptions = {}
}
