import { Renderer2 } from '@angular/core';
import { XAlign, XDirection, XIsEmpty, XJustify } from '../interfaces';

/**
 * @zh_CN 用于设置元素的 flex 样式
 * @en_US Flex style for setting elements
 */
export function XSetFlex(
  ele: Element,
  renderer: Renderer2,
  justify?: XJustify,
  align?: XAlign,
  direction?: XDirection
) {
  let result: string[] = [];
  if (!XIsEmpty(justify)) {
    const justifyStr = `x-justify-${justify}`;
    result.push(justifyStr);
    renderer.addClass(ele, justifyStr);
  }
  if (!XIsEmpty(align)) {
    const alignStr = `x-align-${align}`;
    result.push(alignStr);
    renderer.addClass(ele, alignStr);
  }
  if (!XIsEmpty(direction)) {
    const directionStr = `x-direction-${direction}`;
    result.push(directionStr);
    renderer.addClass(ele, directionStr);
  }
  return result;
}
