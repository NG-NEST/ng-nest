export function XGroupBy<T>(array: T[], name: string): T[][] {
  const groups: any = {};
  array.forEach((obj: any) => {
    const group = JSON.stringify(obj[name]);
    groups[group] = groups[group] || [];
    groups[group].push(obj);
  });
  return Object.keys(groups).map((group) => groups[group]);
}
