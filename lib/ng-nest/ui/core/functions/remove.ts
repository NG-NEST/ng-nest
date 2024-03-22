/**
 * @zh_CN 从数组中移除满足条件的元素，并返回被移除的元素组成的数组
 * @en_US Remove elements that meet the conditions from the array and return the array of the removal element
 */
export function XRemove<T>(array: Array<T>, predicate?: (value: T) => boolean): T[] {
  if (typeof predicate === 'undefined') return [];
  let result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i]);
    }
  }
  for (let item of result) {
    array.splice(array.indexOf(item), 1);
  }
  return result;
}
