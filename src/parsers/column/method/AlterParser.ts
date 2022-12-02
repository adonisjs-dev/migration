import { CallExpression } from '@adonis-dev/parser'
import ColumnPropertyParser from '../inheritance/ColumnPropertyParser'
import IColumnProperties from '../inheritance/IColumnProperties'

/**
 * Parses an alter column method.
 */
export default abstract class AlterParser extends ColumnPropertyParser {
  /**
   * Parser identifier.
   */
  public static identifier = 'alter'

  /**
   * Parse an alter column method as a Call Expression Node.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static parse(ceNode: CallExpression): IColumnProperties {
    const properties: IColumnProperties = {}

    properties.isAlter = true

    return properties
  }
}
