import SchemaAction from '../SchemaAction'
import TableAction from '../TableAction'

/**
 * Create table action is an object containing information to create a table.
 */
export default class CreateTableAction extends SchemaAction {
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
