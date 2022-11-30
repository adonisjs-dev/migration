import { CallExpression, parseNumericNode } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import FloatAction from '../../actions/column/FloatAction'

/**
 * Float parser parses the float column method.
 */
export default abstract class FloatParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'float'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new FloatAction()
    action.name = this.extractColumnName(ceNode)
    action.precision = this.extractPrecisionArgument(ceNode)
    action.scale = this.extractScaleArgument(ceNode)
    return action
  }

  /**
   * Extract a precision value from the argument.
   */
  private static extractPrecisionArgument(ceNode: CallExpression): number | undefined {
    const args = ceNode.getArguments()
    if (args[1] === undefined) return undefined

    return parseNumericNode(args[1])
  }

  /**
   * Extract a scale value from the argument.
   */
  private static extractScaleArgument(ceNode: CallExpression): number | undefined {
    const args = ceNode.getArguments()
    if (args[2] === undefined) return undefined

    return parseNumericNode(args[2])
  }
}
