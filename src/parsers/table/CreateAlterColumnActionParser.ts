/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'

/**
 * Create alter column action parser is abstract class for inheritance by parsers.
 */
export default abstract class CreateAlterColumnActionParser extends CreatableActionParser {
  /**
   * Parse a Call Expression Node.
   * @param isAlterAction if true that returns AlterColumnAction otherwise CreateColumnAction.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression, isAlterAction = false): TableAction {
    return typeof TableAction
  }
}
