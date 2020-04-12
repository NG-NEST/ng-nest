import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Renderer2, Type } from '@angular/core';
import { XJustify, XAlign, XDirection, XIsEmpty } from '../interfaces';
import { XFormProp } from './property';

export abstract class XControlValueAccessor<T> extends XFormProp implements ControlValueAccessor {
  constructor(public renderer: Renderer2) {
    super();
  }
  value: T;
  onChange: (value: T) => void;
  onTouched: () => void;
  writeValue(value: T): void {
    this.value = value;
  }
  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  setFlex(ele: Element, justify: XJustify, align: XAlign, direction: XDirection) {
    if (!XIsEmpty(justify)) this.renderer.addClass(ele, `x-justify-${this.justify}`);
    if (!XIsEmpty(align)) this.renderer.addClass(ele, `x-align-${this.align}`);
    if (!XIsEmpty(direction)) this.renderer.addClass(ele, `x-direction-${this.direction}`);
  }
}

export function XValueAccessor<T>(component: Type<T>) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}
