import { CallExpression, parseStringNode } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import TextAction from '../../actions/column/TextAction'

/**
 * Text parser parses the text column method.
 */
export default abstract class TextParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'text'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TextAction()
    action.name = this.extractColumnName(ceNode)
    action.textType = this.extractTextTypeArgument(ceNode)
    return action
  }

  /**
   * Extract a text type value from the argument.
   */
  private static extractTextTypeArgument(ceNode: CallExpression): string | undefined {
    const args = ceNode.getArguments()
    if (args[1] === undefined) return undefined

    return parseStringNode(args[1])
  }
}
