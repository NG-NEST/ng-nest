export function XDrop<T>(array: Array<T>, n?: number): T[] {
  if (!n) return [...array];
  if (array.length < 1 || array.length <= Math.abs(n)) return [];
  return array.slice(n > 0 ? n : 0, n > 0 ? array.length : n);
}
