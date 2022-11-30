import { SyntaxKind, ArrowFunction, FunctionExpression, Identifier, parseIdentifierNode } from '@adonis-dev/parser'
import TableAction from '../actions/TableAction'
import ColumnMemberParser from './column/inheritance/ColumnMemberParser'
import ColumnActionParser from './column/inheritance/ColumnActionParser'
import ColumnPropertyParser from './column/inheritance/ColumnPropertyParser'
import IncrementsParser from './column/IncrementsParser'
import BigIncrementsParser from './column/BigIncrementsParser'
import IntegerParser from './column/IntegerParser'
import BigIntegerParser from './column/BigIntegerParser'
import TextParser from './column/TextParser'
import StringParser from './column/StringParser'
import FloatParser from './column/FloatParser'
import DoubleParser from './column/DoubleParser'
import DecimalParser from './column/DecimalParser'
import BooleanParser from './column/BooleanParser'
import DateParser from './column/DateParser'
import TimeParser from './column/TimeParser'
import DatetimeParser from './column/DatetimeParser'
import TimestampParser from './column/TimestampParser'
import TimestampsParser from './column/TimestampsParser'
import BinaryParser from './column/BinaryParser'
import EnumParser from './column/EnumParser'
import EnuParser from './column/EnuParser'
import JsonParser from './column/JsonParser'
import JsonbParser from './column/JsonbParser'
import UuidParser from './column/UuidParser'

/**
 * Table parser parses table builder into table actions.
 */
export default abstract class TableParser {
  /**
   * An array of the nested creatable action parsers.
   */
  private static readonly actionParsers: typeof ColumnActionParser[] = [
    IncrementsParser,
    BigIncrementsParser,
    IntegerParser,
    BigIntegerParser,
    TextParser,
    StringParser,
    FloatParser,
    DoubleParser,
    DecimalParser,
    BooleanParser,
    DateParser,
    TimeParser,
    DatetimeParser,
    TimestampParser,
    TimestampsParser,
    BinaryParser,
    EnumParser,
    EnuParser,
    JsonParser,
    JsonbParser,
    UuidParser,
  ]

  /**
   * An array of the nested property parsers.
   */
  private static readonly propertyParsers: typeof ColumnPropertyParser[] = []

  /**
   * Parse a function.
   */
  public static parse(funcNode: ArrowFunction | FunctionExpression): TableAction[] {
    const actions: TableAction[] = []

    const tableIds = this.getTableIdentifiers(funcNode)

    tableIds.forEach((tableId) => {
      const action = this.parseAction(tableId)
      if (!action) return

      const properties = this.parseProperties(tableId)
      Object.assign(action, properties)
      actions.push(action)
    })

    return actions
  }

  /**
   * Parse an action.
   */
  private static parseAction(tableIdentifier: Identifier): TableAction | undefined {
    let currentNode = tableIdentifier.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (ceNode === undefined) return undefined

      const paeChildren = currentNode.forEachChildAsArray()

      const identifierText = parseIdentifierNode(paeChildren[1])
      if (identifierText === undefined) return undefined

      const parser = this.findParserByIdentifier(identifierText, this.actionParsers)
      if (parser) {
        try {
          return parser.parse(ceNode)
        } catch {
          return undefined
        }
      }

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return undefined
  }

  /**
   * Parse properties.
   */
  private static parseProperties(tableIdentifier: Identifier): { [key: string]: string } {
    const properties: { [key: string]: string } = {}

    let currentNode = tableIdentifier.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (ceNode === undefined) return properties

      const paeChildren = currentNode.forEachChildAsArray()

      const identifierText = parseIdentifierNode(paeChildren[1])
      if (identifierText === undefined) return properties

      const parser = this.findParserByIdentifier(identifierText, this.propertyParsers)
      if (parser) {
        const parserProps = parser.parse(ceNode)
        Object.assign(properties, parserProps)
      }

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return properties
  }

  /**
   * Get 'table.*' table identifiers from the arrow function node.
   */
  private static getTableIdentifiers(funcNode: ArrowFunction | FunctionExpression): Identifier[] {
    const propertyAccessExpressions = funcNode.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)

    const tablePropertyAccessExpressions = propertyAccessExpressions.filter((paeNode) => {
      const paeChildren = paeNode.forEachChildAsArray()
      const identifier = parseIdentifierNode(paeChildren[0])

      return identifier === 'table'
    })

    const tableIdentifiers = tablePropertyAccessExpressions.map((paeNode) => {
      const paeChildren = paeNode.forEachChildAsArray()
      return paeChildren[0] as Identifier
    })

    return tableIdentifiers
  }

  /**
   * Find a parser by identifier.
   */
  private static findParserByIdentifier<T extends typeof ColumnMemberParser>(
    identifier: string,
    parsers: T[]
  ): T | undefined {
    for (let i = 0; i < parsers.length; i++) {
      if (parsers[i].identifier === identifier) {
        return parsers[i]
      }
    }

    return undefined
  }
}
