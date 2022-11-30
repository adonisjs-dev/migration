import {
  SyntaxKind,
  MethodDeclaration,
  PropertyAccessExpression,
  parseIdentifierNode,
  isThisNode,
} from '@adonis-dev/parser'
import SchemaAction from '../actions/SchemaAction'
import SchemaMemberParser from './schema/inheritance/SchemaMemberParser'
import SchemaActionParser from './schema/inheritance/SchemaActionParser'
import SchemaPropertyParser from './schema/inheritance/SchemaPropertyParser'
import ISchemaProperties from './schema/inheritance/ISchemaProperties'
import AlterTableParser from './schema/AlterTableParser'
import CreateTableParser from './schema/CreateTableParser'
import DropTableParser from './schema/DropTableParser'
import TableParser from './schema/TableParser'
import WithSchemaParser from './schema/WithSchemaParser'

/**
 * Schema parser parses schema builder into migration actions.
 */
export default abstract class SchemaParser {
  /**
   * An array of the nested creatable action parsers.
   */
  private static readonly actionParsers: typeof SchemaActionParser[] = [
    AlterTableParser,
    CreateTableParser,
    DropTableParser,
    TableParser,
  ]

  /**
   * An array of the nested property parsers.
   */
  private static readonly propertyParsers: typeof SchemaPropertyParser[] = [WithSchemaParser]

  /**
   * Parse a method.
   */
  public static parse(mdNode: MethodDeclaration): SchemaAction[] {
    const actions: SchemaAction[] = []

    const thisSchemaPAEs = this.getThisSchemaPropertyAccessExpressions(mdNode)

    thisSchemaPAEs.forEach((paeNode) => {
      const action = this.parseAction(paeNode)
      if (!action) return

      const properties = this.parseProperties(paeNode)
      Object.assign(action, properties)
      actions.push(action)
    })

    return actions
  }

  /**
   * Parse an action.
   */
  private static parseAction(paeNode: PropertyAccessExpression): SchemaAction | undefined {
    let currentNode = paeNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (ceNode === undefined) return undefined

      const paeChildren = currentNode.forEachChildAsArray()

      const identifierText = parseIdentifierNode(paeChildren[1])
      if (identifierText === undefined) return undefined

      const parser = this.findParserByIdentifier(identifierText, this.actionParsers)
      if (parser) return parser.parse(ceNode)

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return undefined
  }

  /**
   * Parse properties.
   */
  private static parseProperties(paeNode: PropertyAccessExpression): ISchemaProperties {
    const properties: ISchemaProperties = {}

    let currentNode = paeNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)

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
   * Get 'this.schema' property access expressions from the method declaration node.
   */
  private static getThisSchemaPropertyAccessExpressions(mdNode: MethodDeclaration): PropertyAccessExpression[] {
    const propertyAccessExpressions = mdNode.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)

    const thisSchemaPropertyAccessExpressions = propertyAccessExpressions.filter((paeNode) => {
      const paeChildren = paeNode.forEachChildAsArray()
      const isThis = isThisNode(paeChildren[0])
      const identifier = parseIdentifierNode(paeChildren[1])

      return isThis && identifier === 'schema'
    })

    return thisSchemaPropertyAccessExpressions
  }

  /**
   * Find a parser by identifier.
   */
  private static findParserByIdentifier<T extends typeof SchemaMemberParser>(
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
