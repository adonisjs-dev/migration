import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import MigrationAction from '../../actions/MigrationAction'
import DropTableAction from '../../actions/schema/DropTableAction'

/**
 * Drop table parser parses the dropTable method.
 */
export default abstract class DropTableParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'dropTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction {
    return new DropTableAction()
  }
}
