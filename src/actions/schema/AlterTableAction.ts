import MigrationAction from '../MigrationAction'
import TableAction from '../TableAction'

/**
 * Alter table action is an object containing information to alter a table.
 */
export default class AlterTableAction extends MigrationAction {
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
