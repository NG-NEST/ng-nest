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
