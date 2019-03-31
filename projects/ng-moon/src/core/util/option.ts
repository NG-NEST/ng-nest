/**
 * Fill default values
 * @param option
 * @param def
 */
export function fillDefault(option: { [prop: string]: any }, def: { [prop: string]: any }) {
  if (option && def) {
    for (let key in def) {
      if (typeof option[key] === "undefined") option[key] = def[key];
    }
  }
}