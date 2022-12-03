import TableAction from './TableAction'
import ColumnMethodAction from './ColumnMethodAction'

/**
 * For inheritance by column actions.
 */
export default abstract class ColumnAction extends TableAction {
  /**
   * Column name.
   */
  public name = ''

  /**
   * Column method actions.
   */
  public actions: ColumnMethodAction[] = []
}
