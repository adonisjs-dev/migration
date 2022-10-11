import { SourceFile, SyntaxKind, MethodDeclaration } from '@adonis-dev/parser'
import SchemaParser from './SchemaParser'
import MigrationAction from '../actions/MigrationAction'

/**
 * Migration Parser works with the current migration file.
 * Extracts and changes table name.
 * Parses up and down methods.
 */
export default abstract class MigrationParser {
  /**
   * Extract the table name.
   * @throws There is absent a table name in the class.
   */
  public static extractTableName(sourceFile: SourceFile): string {
    const defaultClass = sourceFile.getClassOrThrow((c) => c.isDefaultExport())
    const tableNameProperty = defaultClass.getInstancePropertyOrThrow('tableName')
    const stringLiteral = tableNameProperty.getFirstChildByKindOrThrow(SyntaxKind.StringLiteral)
    return stringLiteral.getLiteralValue()
  }

  /**
   * Parse the up method.
   * @throws There is absent the up method.
   */
  public static parseUpMethod(sourceFile: SourceFile): MigrationAction[] {
    const upMethod = this.upMethod(sourceFile)
    return SchemaParser.parse(upMethod)
  }

  /**
   * Parse the down method.
   * @throws There is absent the down method.
   */
  public static parseDownMethod(sourceFile: SourceFile): MigrationAction[] {
    const downMethod = this.downMethod(sourceFile)
    return SchemaParser.parse(downMethod)
  }

  /**
   * Get the up method node.
   * @throws There is absent the up method.
   */
  private static upMethod(sourceFile: SourceFile): MethodDeclaration {
    const defaultClass = sourceFile.getClassOrThrow((c) => c.isDefaultExport())
    return defaultClass.getInstanceMethodOrThrow('up')
  }

  /**
   * Get the down method node.
   * @throws There is absent the down method.
   */
  private static downMethod(sourceFile: SourceFile): MethodDeclaration {
    const defaultClass = sourceFile.getClassOrThrow((c) => c.isDefaultExport())
    return defaultClass.getInstanceMethodOrThrow('down')
  }
}
