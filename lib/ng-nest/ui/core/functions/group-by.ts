/**
 * @zh_CN 根据属性 name 或迭代函数来对数组分组
 * @en_US Groups the elements of an array based on a property name or iteratee function
 * @param array 需要分组的数组
 * @param key 属性名或迭代函数
 * @returns 分组后的对象，键为分组依据的值，值为属于该组的元素数组
 */
export function XGroupBy<T>(array: T[], key: string | ((item: T) => string | number)): Record<string, T[]> {
  const groups: Record<string, T[]> = {};

  array.forEach((item) => {
    const groupKey = typeof key === 'function' ? String(key(item)) : String((item as any)[key]);

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item);
  });

  return groups;
}
