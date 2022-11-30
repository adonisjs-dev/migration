/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression, parseStringNodeOrThrow } from '@adonis-dev/parser'
import ColumnMemberParser from './ColumnMemberParser'
import TableAction from '../../../actions/TableAction'

/**
 * Column action parser is abstract class for inheritance by parsers.
 */
export default abstract class ColumnActionParser extends ColumnMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    return typeof TableAction
  }

  /**
   * Extract a column name from the first argument.
   * @throws There is absent a column name in the method.
   */
  public static extractColumnName(ceNode: CallExpression): string {
    const args = ceNode.getArguments()
    return parseStringNodeOrThrow(args[0])
  }
}
