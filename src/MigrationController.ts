import fs from 'fs'
import path from 'path'
import { Project, SourceFile } from '@adonis-dev/parser'
import { string as strHelp } from '@poppinss/utils/build/helpers'
import MigrationFile from './MigrationFile'

/**
 * Migration controller is top-level abstraction for working with migrations.
 * It performs various actions on migration files such as creating a migration file,
 * changing a column name or column type, etc.
 */
export default class MigrationController {
  /**
   * A relative path to the create table template.
   */
  private templateCreateTablePath = 'templates/create-table.txt'

  /**
   * Default create table name.
   */
  private templateCreateTableName = 'tablenames'

  /**
   * A relative path to the alter table template.
   */
  private templateAlterTablePath = 'templates/alter-table.txt'

  /**
   * Ts-morph project.
   */
  private project = new Project()

  /**
   * An array of the migration files.
   */
  private migrations: MigrationFile[] = []

  /**
   * Migration directory.
   */
  private migrationDir = ''

  /**
   * The constructor.
   */
  public constructor(migrationDir: string) {
    this.migrationDir = migrationDir
  }

  /**
   * A fullpath of the create table template.
   */
  private get templateCreateTableFullPath() {
    return path.join(__dirname, this.templateCreateTablePath)
  }

  /**
   * A fullpath of the alter table template.
   */
  private get templateAlterTableFullPath() {
    return path.join(__dirname, this.templateAlterTablePath)
  }

  /**
   * Create a create table file.
   */
  public async createTable() {
    const sourceFile = await this.generateCreateTableFile()
    const migration = new MigrationFile(sourceFile)
    this.migrations.push(migration)
  }

  /**
   * Generate a create table file with a timestamp filename.
   */
  private async generateCreateTableFile(): Promise<SourceFile> {
    const code = fs.readFileSync(this.templateCreateTableFullPath, { encoding: 'utf8' })
    const filePath = path.join(this.migrationDir, this.generateFileName(this.templateCreateTableName))
    const sourceFile = this.project.createSourceFile(filePath, code)
    await sourceFile.save()
    return sourceFile
  }

  /**
   * Generate a filename with a timestamp prefix.
   */
  private generateFileName(tableName: string): string {
    tableName = strHelp.pascalCase(tableName)
    return `${Date.now()}_${tableName}.ts`
  }
}
