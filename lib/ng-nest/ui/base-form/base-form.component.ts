import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectorRef, Component, forwardRef, Renderer2, Type } from '@angular/core';
import { XJustify, XAlign, XDirection, XIsEmpty, XClassMap, setFlex } from '@ng-nest/ui/core';
import { XFormProp } from './base-form.property';

@Component({ template: '' })
export class XControlValueAccessor<T> extends XFormProp implements ControlValueAccessor {
  get invalid() {
    return this.validator && !XIsEmpty(this.value) && this.invalidPattern;
  }
  get invalidPattern(): boolean {
    if (!this.validator) return false;
    let result = false;
    let index = 0;
    if (Array.isArray(this.pattern)) {
      for (const pt of this.pattern) {
        result = !new RegExp(pt).test(this.value as any);
        if (result) {
          this.invalidIndex = index;
          break;
        }
        index++;
      }
    } else {
      result = !new RegExp(this.pattern as RegExp).test(this.value as any);
    }
    return result;
  }
  get requiredIsEmpty() {
    return this.validator && this.required && XIsEmpty(this.value);
  }
  get invalidMessage(): string {
    if (!this.validator) return '';
    if (Array.isArray(this.message)) {
      return this.message.length > this.invalidIndex ? this.message[this.invalidIndex] : '';
    } else {
      return this.message as string;
    }
  }
  cdr!: ChangeDetectorRef;
  invalidIndex: number = 0;
  labelMap: XClassMap = {};
  value!: T;
  validator = false;
  onChange!: (value: T) => void;
  onTouched!: () => void;
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
  setFlex(ele: Element, renderer: Renderer2, justify?: XJustify, align?: XAlign, direction?: XDirection) {
    return setFlex(ele, renderer, justify, align, direction);
  }
  formControlValidator() {
    this.validator = true;
  }
}

export function XValueAccessor<T>(component: Type<T>) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}
