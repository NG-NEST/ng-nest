import { Renderer2 } from '@angular/core';
import { XAlign, XDirection, XIsEmpty, XJustify } from '../interfaces';

export function setFlex(ele: Element, renderer: Renderer2, justify?: XJustify, align?: XAlign, direction?: XDirection) {
  let result: string[] = [];
  if (!XIsEmpty(justify)) {
    const justifyStr = `x-justify-${justify}`;
    result.push(justifyStr)
    renderer.addClass(ele, justifyStr);
  }
  if (!XIsEmpty(align)) {
    const alignStr = `x-align-${align}`;
    result.push(alignStr)
    renderer.addClass(ele, alignStr);
  }
  if (!XIsEmpty(direction)) {
    const directionStr = `x-direction-${direction}`;
    result.push(directionStr)
    renderer.addClass(ele, directionStr);
  }
  return result;
}
