/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import TableMemberParser from './TableMemberParser'
import ITableProperties from './ITableProperties'

/**
 * Table property parser is abstract class for inheritance by parsers.
 */
export default abstract class TablePropertyParser extends TableMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): ITableProperties {
    return {}
  }
}
