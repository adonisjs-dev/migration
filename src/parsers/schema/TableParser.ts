import AlterTableParser from './AlterTableParser'

/**
 * Table Parser parses the table method.
 */
export default abstract class TableParser extends AlterTableParser {
  /**
   * Identifier.
   */
  public static identifier = 'table'
}
