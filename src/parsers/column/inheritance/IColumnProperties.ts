export default interface IColumnProperties {
  isAlter?: boolean
  isNullable?: boolean
  isUnique?: boolean
  isUnsigned?: boolean
  default?: string
  references?: string
  inTable?: string
  onUpdate?: string
  onDelete?: string
}
