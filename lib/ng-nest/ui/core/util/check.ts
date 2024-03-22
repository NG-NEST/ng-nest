/**
 * @zh_CN 判断值不为 null 或 undefined
 * @en_US The judgment value is not null or undefined
 */
export function XIsNotNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null;
}

/**
 * @zh_CN 判断值为 null 或 undefined
 * @en_US The judgment value is null or undefined
 */
export function XIsNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null;
}
