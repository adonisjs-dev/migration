import { SyntaxKind, CallExpression } from 'ts-morph'
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
    const arg1 = args[0].asKind(SyntaxKind.StringLiteral)
    if (!arg1) return properties

    properties.schema = arg1.getLiteralValue()

    return properties
  }
}
