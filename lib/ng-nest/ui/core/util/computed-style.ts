export function XComputedStyle(element: HTMLElement, style: string) {
  let computed = XComputed(element);
  let value = computed[style as any];
  return value.replace(/px/g, '');
}

export function XComputed(element: HTMLElement) {
  if (typeof getComputedStyle === 'function') {
    return getComputedStyle(element);
  }
  return element.style;
}
