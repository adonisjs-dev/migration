import { SyntaxKind, CallExpression } from 'ts-morph'
import CreatableActionParser from './CreatableActionParser'
import TableAction from '../../actions/TableAction'
import TimestampsAction from '../../actions/table/TimestampsAction'

/**
 * Timestamps parser parses the timestamps column method.
 */
export default abstract class TimestampsParser extends CreatableActionParser {
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

    const trueKeyword = args[0]?.asKind(SyntaxKind.TrueKeyword)
    if (trueKeyword) return true

    const falseKeyword = args[0]?.asKind(SyntaxKind.FalseKeyword)
    if (falseKeyword) return false

    return undefined
  }

  /**
   * Extract a makeDefaultNow value from the argument.
   */
  private static extractMakeDefaultNowArgument(ceNode: CallExpression): boolean | undefined {
    const args = ceNode.getArguments()

    const trueKeyword = args[1]?.asKind(SyntaxKind.TrueKeyword)
    if (trueKeyword) return true

    const falseKeyword = args[1]?.asKind(SyntaxKind.FalseKeyword)
    if (falseKeyword) return false

    return undefined
  }
}
