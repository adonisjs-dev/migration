import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import DoubleAction from '../../actions/table/DoubleAction'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Double parser parses the double column method.
 */
export default abstract class DoubleParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'double'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new DoubleAction()
    action.name = this.extractColumnName(ceNode)
    action.precision = this.extractPrecisionArgument(ceNode)
    action.scale = this.extractScaleArgument(ceNode)
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

  /**
   * Extract a precision value from the argument.
   */
  private static extractPrecisionArgument(ceNode: CallExpression): number | undefined {
    const args = ceNode.getArguments()
    const arg2nl = args[1]?.asKind(SyntaxKind.NumericLiteral)
    return arg2nl?.getLiteralValue()
  }

  /**
   * Extract a scale value from the argument.
   */
  private static extractScaleArgument(ceNode: CallExpression): number | undefined {
    const args = ceNode.getArguments()
    const arg3nl = args[2]?.asKind(SyntaxKind.NumericLiteral)
    return arg3nl?.getLiteralValue()
  }
}
