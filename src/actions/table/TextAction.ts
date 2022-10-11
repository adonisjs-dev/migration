import ColumnAction from '../ColumnAction'

/**
 * Text action is an object containing information to create or alter a text column.
 */
export default class TextAction extends ColumnAction {
  /**
   * Text type.
   * Mediumtext or longtext, otherwise defaults to text.
   * The second argument.
   */
  public textType: string | undefined
}
