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
