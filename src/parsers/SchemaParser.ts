import { SyntaxKind, MethodDeclaration, PropertyAccessExpression } from 'ts-morph'
import MigrationAction from '../actions/MigrationAction'
import SchemaMemberParser from './schema/SchemaMemberParser'
import CreatableActionParser from './schema/CreatableActionParser'
import PropertyParser from './schema/PropertyParser'
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
  private static readonly actionParsers: typeof CreatableActionParser[] = [
    AlterTableParser,
    CreateTableParser,
    DropTableParser,
    TableParser,
  ]

  /**
   * An array of the nested property parsers.
   */
  private static readonly propertyParsers: typeof PropertyParser[] = [WithSchemaParser]

  /**
   * Parse a method.
   */
  public static parse(mdNode: MethodDeclaration): MigrationAction[] {
    const actions: MigrationAction[] = []
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
  private static parseAction(paeNode: PropertyAccessExpression): MigrationAction | undefined {
    let currentNode = paeNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)

    while (currentNode) {
      const paeChildren = currentNode.forEachChildAsArray()

      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier)
      if (!identifier) return

      const identifierText = identifier.getText()

      const parser = this.findParserByIdentifier(identifierText, this.actionParsers)

      const ceNode = currentNode.getParentIfKind(SyntaxKind.CallExpression)
      if (!ceNode) return

      if (parser) {
        return parser.parse(ceNode)
      }

      currentNode = ceNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)
    }

    return undefined
  }

  /**
   * Parse properties.
   */
  private static parseProperties(paeNode: PropertyAccessExpression): { [name: string]: string } {
    const properties: { [name: string]: string } = {}
    let currentNode = paeNode.getParentIfKind(SyntaxKind.PropertyAccessExpression)

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
   * Get 'this.schema' property access expressions from the method declaration node.
   */
  private static getThisSchemaPropertyAccessExpressions(mdNode: MethodDeclaration): PropertyAccessExpression[] {
    const propertyAccessExpressions = mdNode.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
    const thisSchemaPropertyAccessExpressions = propertyAccessExpressions.filter((paeNode) => {
      const paeChildren = paeNode.forEachChildAsArray()
      const isThisKeyword = paeChildren[0].getKind() === SyntaxKind.ThisKeyword
      const identifier = paeChildren[1].asKind(SyntaxKind.Identifier)

      return isThisKeyword && identifier && identifier.getText() === 'schema'
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
