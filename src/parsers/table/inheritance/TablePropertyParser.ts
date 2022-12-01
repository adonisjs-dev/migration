/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import MemberParser from '../../inheritance/MemberParser'
import ITableProperties from './ITableProperties'

/**
 * Table property parser is abstract class for inheritance by parsers.
 */
export default abstract class TablePropertyParser extends MemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): ITableProperties {
    return {}
  }
}
