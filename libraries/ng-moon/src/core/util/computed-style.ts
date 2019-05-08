export function computedStyle(element: HTMLElement, style: string) {
  let computed = getComputedStyle(element);
  let value = computed[style];
  if (value) {
    return value.replace(/px/g, "");
  } else {
    return null;
  }
}
