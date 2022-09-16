import MigrationAction from '../MigrationAction'

/**
 * Drop table action is an object containing information to drop a table.
 */
export default class DropTableAction extends MigrationAction {
  /**
   * Table name.
   */
  public name = ''

  /**
   * Schema name.
   */
  public schema = ''
}
