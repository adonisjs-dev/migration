import { CallExpression } from '@adonis-dev/parser'
import SchemaActionParser from './inheritance/SchemaActionParser'
import SchemaAction from '../../actions/SchemaAction'
import DropTableAction from '../../actions/schema/DropTableAction'

/**
 * Drop table parser parses the dropTable method.
 */
export default abstract class DropTableParser extends SchemaActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'dropTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): SchemaAction {
    return new DropTableAction()
  }
}
