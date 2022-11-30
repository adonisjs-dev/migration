/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import SchemaMemberParser from './SchemaMemberParser'
import SchemaAction from '../../../actions/SchemaAction'

/**
 * Schema action parser is abstract class for inheritance by parsers.
 */
export default abstract class SchemaActionParser extends SchemaMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): SchemaAction {
    return typeof SchemaAction
  }
}
