import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Input, Renderer2 } from "@angular/core";
import { XInputBoolean } from "./convert";
import { XJustify, XAlign, XDirection } from "../interfaces";

export abstract class XControlValueAccessor implements ControlValueAccessor {
  constructor(public renderer: Renderer2) {}
  value?: any;
  @Input() justify?: XJustify;
  @Input() align?: XAlign;
  @Input() direction?: XDirection;
  @Input() label?: string;
  @Input() placeholder: string = "";
  @Input() @XInputBoolean() required?: boolean;
  @Input() @XInputBoolean() disabled?: boolean;
  onChange: (value: any) => void;
  onTouched: () => void;
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  setFlex(ele: Element, justify: XJustify, align: XAlign, direction: XDirection) {
    if (justify) this.renderer.addClass(ele, `x-flex-justity-${this.justify}`);
    if (align) this.renderer.addClass(ele, `x-flex-align-${this.align}`);
    if (direction) this.renderer.addClass(ele, `x-flex-direction-${this.direction}`);
  }
}

export function XValueAccessor(component) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}
