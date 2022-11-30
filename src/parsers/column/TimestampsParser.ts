import { CallExpression, parseBooleanNode } from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import TimestampsAction from '../../actions/column/TimestampsAction'

/**
 * Timestamps parser parses the timestamps column method.
 */
export default abstract class TimestampsParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'timestamps'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new TimestampsAction()
    action.useTimestampType = this.extractUseTimestampTypeArgument(ceNode)
    action.makeDefaultNow = this.extractMakeDefaultNowArgument(ceNode)
    return action
  }

  /**
   * Extract a useTimestampType value from the argument.
   */
  private static extractUseTimestampTypeArgument(ceNode: CallExpression): boolean | undefined {
    const args = ceNode.getArguments()
    if (args[0] === undefined) return undefined

    return parseBooleanNode(args[0])
  }

  /**
   * Extract a makeDefaultNow value from the argument.
   */
  private static extractMakeDefaultNowArgument(ceNode: CallExpression): boolean | undefined {
    const args = ceNode.getArguments()
    if (args[1] === undefined) return undefined

    return parseBooleanNode(args[1])
  }
}
