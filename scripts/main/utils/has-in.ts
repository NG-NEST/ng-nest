export function hasIn(object: Object, key: string) {
  return object != null && key in Object(object);
}
