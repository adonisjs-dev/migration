import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'
import JsonAction from '../../actions/table/JsonAction'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Json parser parses the json column method.
 */
export default abstract class JsonParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'json'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new JsonAction()
    action.name = this.extractColumnName(ceNode)
    return action
  }

  /**
   * Extract a column name from the argument.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  private static extractColumnName(ceNode: CallExpression): string {
    const args = ceNode.getArguments()
    const arg1sl = args[0]?.asKind(SyntaxKind.StringLiteral)
    if (!arg1sl) throw new AbsentColumnNameException()
    return arg1sl.getLiteralValue()
  }
}
