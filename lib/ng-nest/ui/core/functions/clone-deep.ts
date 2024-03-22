/**
 * @zh_CN
 * 该函数是一个深拷贝函数，用于克隆一个对象或数组。
 * 它会递归地复制对象的所有属性，包括嵌套对象和数组，生成一个全新的独立副本。
 * 对于非对象和非数组类型的值，直接返回该值。
 * 函数接受一个参数 value，表示需要进行深拷贝的值。
 * 首先创建一个空的结果对象 result，如果 value 是数组，则 result 也是一个空数组。
 * 遍历 value 的所有属性，如果属性是对象，则递归调用 XCloneDeep 函数进行深拷贝，并将结果赋值给 result 对应的属性。
 * 最后返回 result，即深拷贝后的对象或数组。
 * @en_US
 * This function is a deep copy function that is used for a cloning object or array.
 * It will recover all the attributes of the object, including nested objects and array, and generate a new independent copy.
 * For non -object and non -array type values, return that value directly.
 * The function accepts a parameter Value, indicating that the value of deep copy needs to be performed.
 * First create a empty result object Result. If Value is an array, Result is also an empty array.
 * It traverses all the attributes of Value. If the attribute is an object, the recursively calls the XCLONEDEEP function for deep copy, and assign the result to the corresponding attributes corresponding to Result.
 * Finally return to Result, that is, the object or array after the deep copy.
 */
export function XCloneDeep(value: any): any {
  let result: any = Array.isArray(value) ? [] : {};
  if (value && typeof value === 'object') {
    for (let key in value) {
      if ((value as Object).hasOwnProperty(key)) {
        result[key] = value && typeof value[key] === 'object' ? XCloneDeep(value[key]) : value[key];
      }
    }
  }
  return result;
}
