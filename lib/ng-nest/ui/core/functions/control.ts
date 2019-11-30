import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { Input, forwardRef } from "@angular/core";

export abstract class XControlValueAccessor {
  valueChange: Subject<any> = new Subject();
  disabledChange: Subject<boolean | string> = new Subject();
  valueChange$: Subscription | null = null;
  disabledChange$: Subscription | null = null;
  private _value: any;
  public get value(): any {
    return this._value;
  }
  @Input()
  public set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.valueChange.next(value);
      if (this.onChange) this.onChange(this.value);
    }
  }
  private _disabled: boolean | string;
  public get disabled(): boolean | string {
    return this._disabled || this._disabled === "";
  }
  @Input()
  public set disabled(value: boolean | string) {
    if (value !== this._disabled) {
      this._disabled = value;
      this.disabledChange.next(value);
    }
  }
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
