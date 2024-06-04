/**
 * @zh_CN 该函数将字符串中的减号命名法转换为驼峰命名法
 * - 使用正则表达式匹配所有连字符后的字母 ( `(\w)` )
 * - 用 `toUpperCase()` 将这些字母转换为大写
 * - 替换原字符串中的连字符和小写字母为大写字母
 * - 例如，`XKebabToCamel('hello-world')` 将返回 `helloWorld`
 * @en_US This function converts string minus nomenclature of hump nomenclature
 * - Use a regular expression match all the letter after a hyphen ( `(\w)` )
 * - Use `toUpperCase()` converts these letters to uppercase
 * - Replace the original string the hyphen and lowercase letters to uppercase
 * - For example, `XKebabToCamel('hello-world')` returns `helloWorld`
 */
export function XKebabToCamel(str: string) {
  return str.replace(/-(\w)/g, (_, char) => char.toUpperCase());
}
