import { CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import MigrationAction from '../../actions/MigrationAction'
import DropTableAction from '../../actions/schema/DropTableAction'

/**
 * Drop Table Parser parses the dropTable method.
 */
export default abstract class DropTableParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'dropTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction | undefined {
    return new DropTableAction()
  }
}
