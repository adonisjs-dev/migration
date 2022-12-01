/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from '@adonis-dev/parser'
import MemberParser from '../../inheritance/MemberParser'
import TableAction from '../../../actions/TableAction'

/**
 * Table action parser is abstract class for inheritance by parsers.
 */
export default abstract class TableActionParser extends MemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    return typeof TableAction
  }
}
