/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallExpression } from 'ts-morph'
import TableMemberParser from './TableMemberParser'

/**
 * Property parser is abstract class for inheritance by parsers.
 */
export default abstract class PropertyParser extends TableMemberParser {
  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): { [name: string]: string } {
    return {}
  }
}
