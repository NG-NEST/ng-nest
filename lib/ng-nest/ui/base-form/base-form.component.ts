import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ChangeDetectorRef, computed, forwardRef, inject, signal, Type } from '@angular/core';
import { XIsEmpty, XIsUndefined, XIsFunction, XComponentConfigKey, XConfigService } from '@ng-nest/ui/core';
import { XFormControlProp } from './base-form.property';

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
      const pattern = this.patternComputed();
      if (!this.validatorSignal() || XIsUndefined(pattern)) return false;
      let result = false;
      let index = 0;
      if (Array.isArray(pattern)) {
        for (const pt of pattern) {
          result = !new RegExp(pt).test(this.value() as any);
          if (result) {
            this.invalidIndex.set(index);
            break;
          }
          index++;
        }
      } else {
        result = !new RegExp(pattern as RegExp).test(this.value() as any);
      }
      return result;
    });
    requiredIsEmpty = computed(() => {
      return this.validatorSignal() && this.requiredComputed() && XIsEmpty(this.value());
    });
    invalidMessage = computed(() => {
      if (!this.validatorSignal()) return '';
      const message = this.messageComputed();
      if (Array.isArray(message)) {
        return message.length > this.invalidIndex() ? message[this.invalidIndex()] : '';
      } else {
        return message as string;
      }
    });
    invalidIndex = signal(0);
    value = signal<any | undefined>(undefined);
    validatorSignal = signal(false);
    disabledSignal = signal(false);
    requiredSignal = signal(false);
    patternSignal = signal<any>([]);
    messageSignal = signal<string | string[]>([]);

    requiredComputed = computed(() => this.requiredSignal() || this.required());
    disabledComputed = computed(() => this.disabledSignal() || this.disabled());
    patternComputed = computed(() => {
      if (XIsEmpty(this.patternSignal())) return this.pattern();
      else return this.patternSignal();
    });
    messageComputed = computed(() => {
      if (XIsEmpty(this.messageSignal())) return this.message();
      else return this.messageSignal();
    });

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
    formControlValidator() {
      this.validatorSignal.set(true);
    }
  };
}
