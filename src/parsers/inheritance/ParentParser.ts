import MemberParser from './MemberParser'

/**
 * Exposes functionality for parsers which include other parsers inside.
 */
export default abstract class ParentParser {
  /**
   * Find a parser by identifier.
   */
  protected static findParserByIdentifier<T extends typeof MemberParser>(
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
