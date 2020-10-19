/**
 * Fill default values
 * @param option option
 * @param def default
 */
export function fillDefault(option: { [property: string]: any }, def: { [property: string]: any }) {
  if (option && def) {
    for (const key in def) {
      if (typeof option[key] === 'undefined') {
        option[key] = def[key];
      }
    }
  }
}
