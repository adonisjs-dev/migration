import { CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import MigrationAction from '../../actions/MigrationAction'
import CreateTableAction from '../../actions/schema/CreateTableAction'

/**
 * Create table parser parses the createTable method.
 */
export default abstract class CreateTableParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'createTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction | undefined {
    return new CreateTableAction()
  }
}
