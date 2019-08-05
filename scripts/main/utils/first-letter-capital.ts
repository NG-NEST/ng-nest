/**
 * 首字母大写
 *
 * @export
 * @param {*} string
 * @returns
 */
export function firstLetterCapital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
