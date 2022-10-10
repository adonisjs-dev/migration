import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import BigIntegerAction from '../../actions/table/BigIntegerAction'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Big increments parser parses the bigIncrements column method.
 */
export default abstract class BigIncrementsParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'bigInteger'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new BigIntegerAction()
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
