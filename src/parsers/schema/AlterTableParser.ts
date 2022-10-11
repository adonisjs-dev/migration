import { CallExpression } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import MigrationAction from '../../actions/MigrationAction'
import AlterTableAction from '../../actions/schema/AlterTableAction'

/**
 * Alter table parser parses the alterTable method.
 */
export default abstract class AlterTableParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'alterTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction {
    return new AlterTableAction()
  }
}
