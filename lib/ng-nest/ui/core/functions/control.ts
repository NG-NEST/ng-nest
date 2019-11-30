import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

export abstract class XControlValueAccessor implements ControlValueAccessor {
  value: any;
  disabled: boolean | string;
  onChange: (_: any) => void;
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
  setDisabledState(disabled: boolean | string) {
    this.disabled = disabled;
  }
}

export function XValueAccessor(component) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}
