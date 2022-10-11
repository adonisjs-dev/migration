import { CallExpression, parseNumericNode } from '@adonis-dev/parser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import TableAction from '../../actions/TableAction'
import DoubleAction from '../../actions/table/DoubleAction'

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
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new DoubleAction()
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
