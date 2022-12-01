/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import TableMemberParser from './TableMemberParser'
import TableAction from '../../../actions/TableAction'

/**
 * Table action parser is abstract class for inheritance by parsers.
 */
export default abstract class TableActionParser extends TableMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    return typeof TableAction
  }
}
