/**
 * @zh_CN 判断一个对象是否包含指定的属性
 * @en_US Determine whether an object contains the specified attribute
 */
export function XHasIn(object: Object, key: string) {
  return object != null && key in Object(object);
}
