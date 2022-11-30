/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import ColumnMemberParser from './ColumnMemberParser'
import IColumnProperties from './IColumnProperties'

/**
 * Column property parser is abstract class for inheritance by parsers.
 */
export default abstract class ColumnPropertyParser extends ColumnMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): IColumnProperties {
    return {}
  }
}
