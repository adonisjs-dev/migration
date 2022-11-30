import { CallExpression } from '@adonis-dev/parser'
import SchemaActionParser from './inheritance/SchemaActionParser'
import SchemaAction from '../../actions/SchemaAction'
import AlterTableAction from '../../actions/schema/AlterTableAction'

/**
 * Alter table parser parses the alterTable method.
 */
export default abstract class AlterTableParser extends SchemaActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'alterTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): SchemaAction {
    return new AlterTableAction()
  }
}
