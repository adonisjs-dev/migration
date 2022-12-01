/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import MemberParser from '../../inheritance/MemberParser'
import ISchemaProperties from './ISchemaProperties'

/**
 * Schema property parser is abstract class for inheritance by parsers.
 */
export default abstract class SchemaPropertyParser extends MemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): ISchemaProperties {
    return {}
  }
}
