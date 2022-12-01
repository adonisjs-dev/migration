import { SyntaxKind, ArrowFunction, FunctionExpression, Identifier, parseIdentifierNode } from '@adonis-dev/parser'
import ParentParser from './inheritance/ParentParser'
import TableAction from '../actions/TableAction'
import ColumnAction from '../actions/ColumnAction'

import ColumnActionParser from './column/inheritance/ColumnActionParser'
import ColumnPropertyParser from './column/inheritance/ColumnPropertyParser'
import IColumnProperties from './column/inheritance/IColumnProperties'

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

import TableActionParser from './table/inheritance/TableActionParser'
import TablePropertyParser from './table/inheritance/TablePropertyParser'
import ITableProperties from './table/inheritance/ITableProperties'

import DropColumnParser from './table/DropColumnParser'

/**
 * Table parser parses table builder into table actions.
 */
export default abstract class TableParser extends ParentParser {
  /**
   * An array of the nested column action parsers.
   */
  private static readonly columnActionParsers: typeof ColumnActionParser[] = [
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
   * An array of the nested column property parsers.
   */
  private static readonly columnPropertyParsers: typeof ColumnPropertyParser[] = []

  /**
   * An array of the nested table action parsers.
   */
  private static readonly tableActionParsers: typeof TableActionParser[] = [DropColumnParser]

  /**
   * An array of the nested table property parsers.
   */
  private static readonly tablePropertyParsers: typeof TablePropertyParser[] = []

  /**
   * An array of the nested action parsers.
   */
  private static readonly actionParsers: Array<typeof ColumnPropertyParser | typeof TablePropertyParser> = [
    ...this.columnActionParsers,
    ...this.tableActionParsers,
  ]

  /**
   * Parse a function.
   */
  public static parse(funcNode: ArrowFunction | FunctionExpression): TableAction[] {
    const actions: TableAction[] = []

    const tableIds = this.getTableIdentifiers(funcNode)

    tableIds.forEach((tableId) => {
      const action = this.parseAction(tableId)
      if (!action) return

      const propertyParsers = action instanceof ColumnAction ? this.columnPropertyParsers : this.tablePropertyParsers
      const properties = this.parseProperties(tableId, propertyParsers)
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
  private static parseProperties<T extends Array<typeof ColumnPropertyParser | typeof TablePropertyParser>>(
    tableIdentifier: Identifier,
    propertyParsers: T
  ): T extends typeof ColumnPropertyParser[] ? IColumnProperties : ITableProperties {
    type IProperties = T extends typeof ColumnPropertyParser[] ? IColumnProperties : ITableProperties
    const properties: IProperties = {} as IProperties

    let currentNode = tableIdentifier.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (ceNode === undefined) return properties

      const paeChildren = currentNode.forEachChildAsArray()

      const identifierText = parseIdentifierNode(paeChildren[1])
      if (identifierText === undefined) return properties

      const parser = this.findParserByIdentifier(identifierText, propertyParsers)
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
}
