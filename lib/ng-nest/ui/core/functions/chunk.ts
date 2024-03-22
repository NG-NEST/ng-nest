/**
 * @zh_CN
 * 该函数是一个通用函数，用于将给定的数组拆分成多个小数组，
 * 每个小数组的长度由函数的第二个参数指定，默认为 1。
 * 如果给定的数组为空或者小数组长度小于等于 0，则函数返回一个空数组。
 * 函数通过循环遍历给定的数组，并使用 slice 方法将数组拆分成小数组，然后将小数组添加到结果数组中，最后返回结果数组。
 * @en_US
 * This function is a general function that is used to split the given array into multiple decimal arrays.
 * The length of each decimal array is specified by the second parameter of the function, and the default is 1.
 * If the given array is empty or the length of the decimal array is less than equal to 0, the function returns a empty array.
 * The function traverses the given array by circulating, and uses the Slice method to split the array into a decimal array,
 * then add the decimal array to the result array, and finally return the result array.
 */
export function XChunk<T>(array: T[], size = 1): T[][] {
  const len = array == null ? 0 : array.length;
  if (!len || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(len / size));

  while (index < len) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}
