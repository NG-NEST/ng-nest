/**
 * @zh_CN 获取元素的指定样式的计算值
 * @en_US The calculation value of the specified style of the element
 */
export function XComputedStyle(element: HTMLElement, style: string): string {
  let computed = XComputed(element);
  let value = computed[style as any];
  return value.replace(/px/g, '');
}

/**
 * @zh_CN 获取元素的计算样式
 * @en_US Calculation style of obtaining elements
 */
export function XComputed(element: HTMLElement): CSSStyleDeclaration {
  if (typeof getComputedStyle === 'function') {
    return getComputedStyle(element);
  }
  return element.style;
}
