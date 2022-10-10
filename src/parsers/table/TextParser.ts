import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import TextAction from '../../actions/table/TextAction'
import AbsentColumnNameException from '../../exceptions/AbsentColumnNameException'

/**
 * Text parser parses the text column method.
 */
export default abstract class TextParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'text'

  /**
   * Parse a Call Expression Node.
   * @throws {AbsentColumnNameException} There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TextAction()
    action.name = this.extractColumnName(ceNode)
    action.textType = this.extractTextTypeArgument(ceNode)
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
   * Extract a text type value from the argument.
   */
  private static extractTextTypeArgument(ceNode: CallExpression): string | undefined {
    const args = ceNode.getArguments()
    const arg2sl = args[1]?.asKind(SyntaxKind.StringLiteral)
    return arg2sl?.getLiteralValue()
  }
}
