import SchemaAction from '../SchemaAction'
import TableAction from '../TableAction'

/**
 * Alter table action is an object containing information to alter a table.
 */
export default class AlterTableAction extends SchemaAction {
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
