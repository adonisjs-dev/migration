/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import SchemaMemberParser from './SchemaMemberParser'

/**
 * Property parser is abstract class for inheritance by parsers.
 */
export default abstract class PropertyParser extends SchemaMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): { [name: string]: string } {
    return {}
  }
}
