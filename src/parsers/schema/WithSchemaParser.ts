import { CallExpression, parseStringNode } from '@adonis-dev/parser'
import SchemaPropertyParser from './inheritance/SchemaPropertyParser'
import ISchemaProperties from './inheritance/ISchemaProperties'

/**
 * With Schema Parser parses the withSchema method.
 */
export default abstract class WithSchemaParser extends SchemaPropertyParser {
  /**
   * Identifier.
   */
  public static identifier = 'withSchema'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): ISchemaProperties {
    const properties: ISchemaProperties = {}

    const args = ceNode.getArguments()

    const arg1 = parseStringNode(args[0])
    if (arg1 !== undefined) properties.schema = arg1

    return properties
  }
}
