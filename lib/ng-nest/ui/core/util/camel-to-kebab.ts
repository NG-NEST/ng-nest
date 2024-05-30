/**
 * @zh_CN 该函数将字符串中的驼峰命名法转换为减号命名法
 * - 采用正则表达式匹配字符串中每个连续的大小写字母边界
 * - 将其替换为小写字母和连字符的组合
 * - 最后将整个字符串转换为小写
 * - 例如，`XCamelToKebab('helloWorld')` 将返回 `hello-world`
 * @en_US This function converts string of hump nomenclature kebab nomenclature
 * - Use regular expression match each successive lowercase letters in the string boundary
 * - Replace it with a lower case letters and hyphens
 * - Finally the whole string converted to lowercase
 * - For example, `XCamelToKebab('helloWorld')` returns the `hello-world`
 */
export function XCamelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
