import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ChangeDetectorRef, Component, computed, forwardRef, inject, Renderer2, signal, Type } from '@angular/core';
import {
  XJustify,
  XAlign,
  XDirection,
  XIsEmpty,
  XClassMap,
  XSetFlex,
  XBoolean,
  XIsUndefined,
  XIsFunction,
  XComponentConfigKey,
  XConfigService
} from '@ng-nest/ui/core';
import { XFormControlProp, XFormProp } from './base-form.property';

@Component({
  selector: 'x-control-value-accessor',
  standalone: true,
  template: ''
})
export class XControlValueAccessor<T> extends XFormProp implements ControlValueAccessor {
  cdr = inject(ChangeDetectorRef);
  get invalid() {
    return this.validator && ((!XIsEmpty(this.value) && this.invalidPattern) || this.invalidInputValidator);
  }
  get invalidPattern(): boolean {
    if (!this.validator || XIsUndefined(this.pattern)) return false;
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
  invalidIndex: number = 0;
  labelMap: XClassMap = {};
  value!: T;
  validator: XBoolean = false;
  invalidInputValidator = false;
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
    this.cdr.markForCheck();
  }
  setFlex(ele: Element, renderer: Renderer2, justify?: XJustify, align?: XAlign, direction?: XDirection) {
    return XSetFlex(ele, renderer, justify, align, direction);
  }
  formControlValidator() {
    this.validator = true;
  }
}

export function XValueAccessor<T>(component: Type<T>) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}

export function XFormInputValidator(func: (value: any) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!XIsFunction(func)) return null;
    const invalid = !func(control.value);
    return invalid ? { inputValidator: true } : null;
  };
}

export function XFormControlFunction<C extends XComponentConfigKey>(configName: C) {
  return class XFormControlFun extends XFormControlProp implements ControlValueAccessor {
    config = inject(XConfigService).getConfigForComponent(configName);
    cdr = inject(ChangeDetectorRef);
    invalid = computed(() => {
      return (
        this.validatorSignal() && ((!XIsEmpty(this.value()) && this.invalidPattern()) || this.invalidInputValidator())
      );
    });
    invalidPattern = computed(() => {
      if (!this.validatorSignal() || XIsUndefined(this.pattern())) return false;
      let result = false;
      let index = 0;
      if (Array.isArray(this.pattern())) {
        for (const pt of this.pattern()) {
          result = !new RegExp(pt).test(this.value() as any);
          if (result) {
            this.invalidIndex.set(index);
            break;
          }
          index++;
        }
      } else {
        result = !new RegExp(this.pattern() as RegExp).test(this.value() as any);
      }
      return result;
    });
    requiredIsEmpty = computed(() => {
      return this.validatorSignal() && this.required() && XIsEmpty(this.value());
    });
    invalidMessage = computed(() => {
      if (!this.validatorSignal()) return '';
      const message = this.message();
      if (Array.isArray(message)) {
        return message.length > this.invalidIndex() ? message[this.invalidIndex()] : '';
      } else {
        return message as string;
      }
    });
    invalidIndex = signal(0);
    labelMap = signal<XClassMap>({});
    value = signal<any | undefined>(undefined);
    validatorSignal = signal(false);
    disabledSignal = signal(false);
    invalidInputValidator = signal(false);
    onChange!: (value: any) => void;
    onTouched!: () => void;
    writeValue(value: any): void {
      this.value.set(value);
    }
    registerOnChange(fn: (value: any) => void): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
    setDisabledState(disabled: boolean) {
      this.disabledSignal.set(disabled);
    }
    setFlex(ele: Element, renderer: Renderer2, justify?: XJustify, align?: XAlign, direction?: XDirection) {
      return XSetFlex(ele, renderer, justify, align, direction);
    }
    formControlValidator() {
      this.validatorSignal.set(true);
    }
  };
}
