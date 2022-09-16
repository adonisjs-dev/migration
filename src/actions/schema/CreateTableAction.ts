import MigrationAction from '../MigrationAction'
import TableAction from '../TableAction'

/**
 * Create table action is an object containing information to create a table.
 */
export default class CreateTableAction extends MigrationAction {
  /**
   * Table name.
   */
  public name = ''

  /**
   * Schema name.
   */
  public schema = ''

  /**
   * Table column actions.
   */
  public actions: TableAction[] = []
}
