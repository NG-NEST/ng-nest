/**
 * @zh_CN 通过参数 n 来截取数组
 * 如果 n 未定义或为 0，则返回与原数组相同的数组
 * 如果原数组长度小于 1 或小于等于 n 的绝对值，则返回一个空数组
 * 如果 n 大于 0，则截取从第 n 个元素开始到数组末尾的子数组
 * 如果 n 小于等于 0，则截取从第 0 个元素到倒数第 n 个元素
 * @en_US Send the array by parameter n
 * If n is not defined or 0, returns the same array as the original array
 * If the original array length is less than 1 or less than equal to N, return a empty array
 * If n is greater than 0, cut off the sub-array starting from the nn element to the end of the array
 * If n is less than or equal to 0, cut off from the 0th element to the countless nary element
 */
export function XDrop<T>(array: Array<T>, n?: number): Array<T> {
  if (!n) return [...array];
  if (array.length < 1 || array.length <= Math.abs(n)) return [];
  return array.slice(n > 0 ? n : 0, n > 0 ? array.length : n);
}
