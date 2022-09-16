import { SyntaxKind, ArrowFunction, FunctionExpression, Identifier } from 'ts-morph'
import TableAction from '../actions/TableAction'
import TableMemberParser from './table/TableMemberParser'
import CreateAlterColumnActionParser from './table/CreateAlterColumnActionParser'
import CreatableActionParser from './table/CreatableActionParser'
import PropertyParser from './table/PropertyParser'
import IncrementsParser from './table/IncrementsParser'
import BigIncrementsParser from './table/BigIncrementsParser'

/**
 * Table parser parses table builder into table actions.
 */
export default abstract class TableParser {
  /**
   * An array of the nested creatable action parsers.
   */
  private static readonly actionParsers: typeof CreatableActionParser[] = [IncrementsParser, BigIncrementsParser]

  /**
   * An array of the nested property parsers.
   */
  private static readonly propertyParsers: typeof PropertyParser[] = []

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
      const paeChildren = currentNode.forEachChildAsArray()

      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier)
      if (!identifier) return undefined

      const identifierText = identifier.getText()

      const parser = this.findParserByIdentifier(identifierText, this.actionParsers)

      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (!ceNode) return undefined

      if (parser) {
        if (parser.prototype instanceof CreateAlterColumnActionParser) {
          const isAlterAction = this.isAlterPresent(tableIdentifier)

          try {
            return (parser as typeof CreateAlterColumnActionParser).parse(ceNode, isAlterAction)
          } catch {
            return undefined
          }
        } else {
          return parser.parse(ceNode)
        }
      }

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return undefined
  }

  /**
   * Search for the presence of the alter method in the expression.
   */
  private static isAlterPresent(tableIdentifier: Identifier): boolean {
    let currentNode = tableIdentifier.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const paeChildren = currentNode.forEachChildAsArray()

      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier)
      if (!identifier) return false

      const identifierText = identifier.getText()

      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (!ceNode) return false

      if (identifierText === 'alter') return true

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return false
  }

  /**
   * Parse properties.
   */
  private static parseProperties(tableIdentifier: Identifier): { [name: string]: string } {
    const properties: { [name: string]: string } = {}
    let currentNode = tableIdentifier.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const paeChildren = currentNode.forEachChildAsArray()

      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier)
      if (!identifier) return properties

      const identifierText = identifier.getText()

      const parser = this.findParserByIdentifier(identifierText, this.propertyParsers)

      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (!ceNode) return properties

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
      const identifier = paeChildren[0].asKind(SyntaxKind.Identifier)

      return identifier && identifier.getText() === 'table'
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
  private static findParserByIdentifier<T extends typeof TableMemberParser>(
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
