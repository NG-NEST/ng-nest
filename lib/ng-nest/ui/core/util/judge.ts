export function isEmpty(obj: any) {
  return typeof obj === "undefined" || obj === null || obj === "" || obj.length === 0;
}
