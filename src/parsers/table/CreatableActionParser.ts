/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from 'ts-morph'
import TableMemberParser from './TableMemberParser'
import TableAction from '../../actions/TableAction'

/**
 * Creatable action parser is abstract class for inheritance by parsers.
 */
export default abstract class CreatableActionParser extends TableMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    return typeof TableAction
  }
}
