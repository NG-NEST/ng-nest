import { Renderer2 } from '@angular/core';
import { XAlign, XDirection, XIsEmpty, XJustify } from '../interfaces';

export function setFlex(ele: Element, renderer: Renderer2, justify?: XJustify, align?: XAlign, direction?: XDirection) {
  if (!XIsEmpty(justify)) renderer.addClass(ele, `x-justify-${justify}`);
  if (!XIsEmpty(align)) renderer.addClass(ele, `x-align-${align}`);
  if (!XIsEmpty(direction)) renderer.addClass(ele, `x-direction-${direction}`);
}
