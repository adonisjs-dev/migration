import { CallExpression, parseStringLiteral } from '@adonis-dev/parser'
import PropertyParser from './inheritance/PropertyParser'

/**
 * With Schema Parser parses the withSchema method.
 */
export default abstract class WithSchemaParser extends PropertyParser {
  /**
   * Identifier.
   */
  public static identifier = 'withSchema'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): { [name: string]: string } {
    const properties: { [name: string]: string } = {}

    const args = ceNode.getArguments()

    const arg1 = parseStringLiteral(args[0])
    if (arg1 !== undefined) properties.schema = arg1

    return properties
  }
}
