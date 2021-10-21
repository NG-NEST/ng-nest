export function XOrderBy<T>(collection: Array<T>, iteratees: Array<string>, orders?: Array<'asc' | 'desc'>): T[] {
  if (!iteratees) return collection;
  if (!orders) orders = [];

  function compare(a: any, b: any, prop: any, order: 'asc' | 'desc' | undefined, idex: number): number {
    if (a[prop] == b[prop]) {
      ++idex;
      if (iteratees.length > idex) {
        const odr = orders && orders.length > idex ? orders[idex] : 'asc';
        return compare(a, b, iteratees[idex], odr, idex);
      } else {
        return 0;
      }
    }
    if (order === 'desc') {
      return (b[prop] - a[prop]) as number;
    } else {
      return (a[prop] - b[prop]) as number;
    }
  }

  const iterate = iteratees.shift();
  const order = orders.shift() || 'asc';

  if (!iterate) return collection;

  collection.sort((a: any, b: any) => compare(a, b, iterate, order, -1));

  return collection;
}
