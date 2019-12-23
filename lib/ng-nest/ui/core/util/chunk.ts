export const chunk = (array: any[], size = 1) => {
  const len = array == null ? 0 : array.length;
  if (!len || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(len / size));

  while (index < len) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
};
