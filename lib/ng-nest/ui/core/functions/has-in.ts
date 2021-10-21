export function XHasIn(object: Object, key: string) {
  return object != null && key in Object(object);
}
