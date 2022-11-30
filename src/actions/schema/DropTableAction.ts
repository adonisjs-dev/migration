import SchemaAction from '../SchemaAction'

/**
 * Drop table action is an object containing information to drop a table.
 */
export default class DropTableAction extends SchemaAction {
  /**
   * Table name.
   */
  public name = ''

  /**
   * Schema name.
   */
  public schema = ''
}
