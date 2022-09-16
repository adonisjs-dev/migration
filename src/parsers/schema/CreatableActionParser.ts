/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from 'ts-morph'
import SchemaMemberParser from './SchemaMemberParser'
import MigrationAction from '../../actions/MigrationAction'

/**
 * Creatable action parser is abstract class for inheritance by parsers.
 */
export default abstract class CreatableActionParser extends SchemaMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction {
    return typeof MigrationAction
  }
}
