import { CallExpression } from '@adonis-dev/parser'
import ColumnPropertyParser from '../inheritance/ColumnPropertyParser'
import IColumnProperties from '../inheritance/IColumnProperties'

/**
 * Parses a not nullable column method.
 */
export default abstract class NotNullableParser extends ColumnPropertyParser {
  /**
   * Parser identifier.
   */
  public static identifier = 'notNullable'

  /**
   * Parse a not nullable column method as a Call Expression Node.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static parse(ceNode: CallExpression): IColumnProperties {
    const properties: IColumnProperties = {}

    properties.isNullable = false

    return properties
  }
}
