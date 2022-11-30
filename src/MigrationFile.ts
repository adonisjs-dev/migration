import { SourceFile } from '@adonis-dev/parser'
import MigrationParser from './parsers/MigrationParser'
import SchemaAction from './actions/SchemaAction'

/**
 * Migration file is the migration file object that located in the file system.
 * It performs actions relative to the current migration file.
 */
export default class MigrationFile {
  /**
   * Table name.
   */
  public tableName = ''

  /**
   * Method up.
   */
  public up: SchemaAction[] = []

  /**
   * Method down.
   */
  public down: SchemaAction[] = []

  /**
   * Source file.
   */
  public sourceFile: SourceFile

  /**
   * The constructor.
   */
  public constructor(sourceFile: SourceFile) {
    this.sourceFile = sourceFile
    this.parse()
  }

  /**
   * Parse the file.
   */
  public parse() {
    this.tableName = MigrationParser.extractTableName(this.sourceFile)
    this.up = MigrationParser.parseUpMethod(this.sourceFile)
    this.down = MigrationParser.parseDownMethod(this.sourceFile)
  }

  /**
   * Get the file path.
   */
  public get filePath() {
    return this.sourceFile.getFilePath()
  }
}
