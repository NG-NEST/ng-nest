/**
 * @zh_CN 根据属性 name 来对数组分组
 * @en_US Based on the array according to the attribute name
 */
export function XGroupBy<T>(array: T[], name: string): Array<Array<T>> {
  const groups: any = {};
  array.forEach((obj: any) => {
    const group = JSON.stringify(obj[name]);
    groups[group] = groups[group] || [];
    groups[group].push(obj);
  });
  return Object.keys(groups).map((group) => groups[group]);
}
