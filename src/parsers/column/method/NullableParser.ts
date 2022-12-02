import { CallExpression } from '@adonis-dev/parser'
import ColumnPropertyParser from '../inheritance/ColumnPropertyParser'
import IColumnProperties from '../inheritance/IColumnProperties'

/**
 * Parses a nullable column method.
 */
export default abstract class NullableParser extends ColumnPropertyParser {
  /**
   * Parser identifier.
   */
  public static identifier = 'nullable'

  /**
   * Parse a nullable column method as a Call Expression Node.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static parse(ceNode: CallExpression): IColumnProperties {
    const properties: IColumnProperties = {}

    properties.isNullable = true

    return properties
  }
}
