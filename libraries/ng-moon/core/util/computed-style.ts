export function computedStyle(element: HTMLElement, style: string) {
  let computed = getComputedStyle(element);
  let value = computed[style];
  return value.replace(/px/g, "");
}
