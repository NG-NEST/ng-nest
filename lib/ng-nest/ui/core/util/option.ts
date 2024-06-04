/**
 * @zh_CN 填充默认值
 * @en_US Fill default values
 */
export function XFillDefault(option: { [property: string]: any }, def: { [property: string]: any }) {
  if (option && def) {
    for (const key in def) {
      if (typeof option[key] === 'undefined') {
        option[key] = def[key];
      }
    }
  }
}
