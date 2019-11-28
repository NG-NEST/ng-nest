import { Subject, Subscription } from "rxjs";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { forwardRef, Input, HostBinding } from "@angular/core";

export abstract class XControlValueAccessor implements ControlValueAccessor {
  valueChange: Subject<any> = new Subject();
  disabledChange: Subject<boolean | string> = new Subject();
  valueChange$: Subscription | null = null;
  disabledChange$: Subscription | null = null;
  private _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.valueChange.next(value);
      if (this.onChange) this.onChange(this.value);
    }
  }
  private _disabled: boolean | string;
  @Input()
  public get disabled(): boolean | string {
    return this._disabled;
  }
  public set disabled(value: boolean | string) {
    if (value !== this._disabled) {
      this._disabled = value;
      this.disabledChange.next(value);
    }
  }
  @HostBinding("class.x-disabled") get getDisabled() {
    return this.disabled;
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
