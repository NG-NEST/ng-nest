import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ChangeDetectorRef, computed, forwardRef, inject, signal, Type } from '@angular/core';
import { XIsEmpty, XIsUndefined, XComponentConfigKey, XConfigService, XIsNull } from '@ng-nest/ui/core';
import { XFormControlProp } from './base-form.property';

export function XValueAccessor<T>(component: Type<T>) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}

export function XFormInputValidator(func: (value: any) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
        this.validatorComputed() && ((!XIsEmpty(this.value()) && this.invalidPattern()) || this.invalidInputValidator())
      );
    });
    invalidPattern = computed(() => {
      const pattern = this.patternComputed();
      if (!this.validatorComputed() || XIsUndefined(pattern) || XIsNull(pattern)) return false;
      let result = false;
      let index = 0;

      if (Array.isArray(pattern)) {
        for (const pt of pattern) {
          result = !new RegExp(pt).test(this.value() as any);
          if (result) {
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
      return this.validatorComputed() && this.requiredComputed() && XIsEmpty(this.value());
    });
    invalidMessage = computed(() => {
      if (!this.validatorComputed()) return '';
      const message = this.messageComputed();
      if (Array.isArray(message)) {
        return message.length > this.invalidIndex() ? message[this.invalidIndex()] : '';
      } else {
        return message as string;
      }
    });
    invalidIndex = computed(() => {
      let res = 0;
      let index = 0;
      const pattern = this.patternComputed();
      if (!this.validatorComputed() || XIsUndefined(pattern) || XIsNull(pattern)) return 0;
      if (Array.isArray(pattern)) {
        for (const pt of pattern) {
          const result = !new RegExp(pt).test(this.value() as any);
          if (result) {
            res = index;
            break;
          }
          index++;
        }
        return res;
      } else {
        return 0;
      }
    });
    value = signal<any | undefined>(undefined);
    validatorSignal = signal(false);
    disabledSignal = signal(false);
    requiredSignal = signal(false);
    patternSignal = signal<any>([]);
    messageSignal = signal<string | string[]>([]);

    requiredComputed = computed(() => this.requiredSignal() || this.required());
    disabledComputed = computed(() => this.disabledSignal() || this.disabled());
    validatorComputed = computed(() => this.validatorSignal() || this.validator());
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
