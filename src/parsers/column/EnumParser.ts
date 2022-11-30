import {
  SyntaxKind,
  CallExpression,
  parseObjectNodeAsInterface,
  ObjectToParse,
  parseArrayNodeAsKind,
  LiteralKind,
} from '@adonis-dev/parser'
import ColumnActionParser from './inheritance/ColumnActionParser'
import TableAction from '../../actions/TableAction'
import EnumAction from '../../actions/column/EnumAction'
import EnumOptions from './interfaces/EnumOptions'

/**
 * Enum parser parses the enum column method.
 */
export default abstract class EnumParser extends ColumnActionParser {
  /**
   * Identifier.
   */
  public static identifier = 'enum'

  /**
   * Parse a Call Expression Node.
   * @throws There is absent a column name in the method.
   */
  public static parse(ceNode: CallExpression): TableAction {
    const action = new EnumAction()
    action.name = this.extractColumnName(ceNode)
    action.values = this.extractValuesArgument(ceNode)
    action.options = this.extractOptionsArgument(ceNode)
    return action
  }

  /**
   * Extract values from the argument.
   */
  private static extractValuesArgument(ceNode: CallExpression): Array<string | number | boolean> {
    const args = ceNode.getArguments()
    const ale = args[1]?.asKind(SyntaxKind.ArrayLiteralExpression)
    if (ale === undefined) return []

    const aleChildren = ale.forEachChildAsArray()

    if (aleChildren[0] === undefined) return []

    const kind = aleChildren[0].getKind() as LiteralKind
    const values = parseArrayNodeAsKind(args[1], kind)
    if (values === undefined) return []

    return values
  }

  /**
   * Extract options from the argument.
   */
  private static extractOptionsArgument(ceNode: CallExpression): EnumOptions {
    const args = ceNode.getArguments()
    if (args[2] === undefined) return {}

    const objectToParse: ObjectToParse = {
      useNative: SyntaxKind.BooleanKeyword,
      existingType: SyntaxKind.BooleanKeyword,
      schemaName: SyntaxKind.StringLiteral,
      enumName: SyntaxKind.StringLiteral,
    }

    const options = parseObjectNodeAsInterface(args[2], objectToParse)
    if (options === undefined) return {}

    return options
  }
}
