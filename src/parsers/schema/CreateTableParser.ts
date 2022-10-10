import { SyntaxKind, CallExpression, ArrowFunction, FunctionExpression } from '@adonis-dev/parser'
import TableParser from '../TableParser'
import CreatableActionParser from './inheritance/CreatableActionParser'
import MigrationAction from '../../actions/MigrationAction'
import CreateTableAction from '../../actions/schema/CreateTableAction'
import TableAction from '../../actions/TableAction'

/**
 * Create table parser parses the createTable method.
 */
export default abstract class CreateTableParser extends CreatableActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'createTable'

  /**
   * Parse a Call Expression Node.
   */
  public static parse(ceNode: CallExpression): MigrationAction {
    const action = new CreateTableAction()
    action.name = this.extractTableName(ceNode)
    action.actions = this.parseTableActions(ceNode)
    return action
  }

  /**
   * Extract a table name from the argument.
   */
  private static extractTableName(ceNode: CallExpression): string {
    const args = ceNode.getArguments()

    const arg1pae = args[0].asKind(SyntaxKind.PropertyAccessExpression)
    if (arg1pae) {
      const paeChildren = arg1pae.forEachChildAsArray()
      const isThisKeyword = paeChildren[0].asKind(SyntaxKind.ThisKeyword) //TODO isThis()
      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier) //TODO parseIdentifier()
      if (isThisKeyword && identifier && identifier.getText() === 'tableName') {
        return ''
      }
    }

    const stringLiteral = args[0].asKind(SyntaxKind.StringLiteral)
    if (stringLiteral) {
      return stringLiteral.getLiteralValue()
    }

    return ''
  }

  /**
   * Parse table actions.
   */
  private static parseTableActions(ceNode: CallExpression): TableAction[] {
    const args = ceNode.getArguments()

    const arrowFunction = args[1].asKind(SyntaxKind.ArrowFunction)
    const functionExpression = args[1].asKind(SyntaxKind.FunctionExpression)

    let func: ArrowFunction | FunctionExpression | undefined
    if (arrowFunction) func = arrowFunction
    if (functionExpression) func = functionExpression

    return func ? TableParser.parse(func) : []
  }
}
