/**
 * 生成随机的字母字符串
 *
 * @export
 * @param {number} [num=4]
 * @returns
 */
export function randomString(num: number = 6) {
  if (num < 0) return '';
  var result = [];
  for (var i = 0; i < num; i++) {
    var ranXm = Math.ceil(Math.random() * 25);
    result.push(String.fromCharCode(65 + ranXm));
  }
  return result.join('');
}
