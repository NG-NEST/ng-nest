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
import { toObservable } from '@angular/core/rxjs-interop';

export function XValueAccessor<T>(component: Type<T>) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}

export function XFormInputValidator(func: (value: any) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = func ? !func(control.value) : null;
    return invalid ? { inputValidator: true } : null;
  };
}

export function XFormControlFunction<C extends XComponentConfigKey>(configName: C) {
  return class XFormControlFun extends XFormControlProp implements ControlValueAccessor {
    config = inject(XConfigService).getConfigForComponent(configName);
    cdr = inject(ChangeDetectorRef);
    invalid = computed(() => {
      return (
        this.validatorComputed() &&
        ((!XIsEmpty(this.value()) && this.invalidPattern()) || this.requiredIsEmpty() || this.invalidInputValidator())
      );
    });
    invalidPattern = computed(() => {
      const pattern = this.patternComputed();
      if (!this.validatorComputed() || XIsUndefined(pattern) || XIsNull(pattern)) return false;
      let result = false;

      if (pattern && pattern !== null) {
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
      return message as string;
    });
    value = signal<any | undefined>(undefined);
    valueObservable = toObservable(this.value);
    validatorSignal = signal(false);
    disabledSignal = signal(false);
    requiredSignal = signal(false);
    patternSignal = signal<any>(null);
    messageSignal = signal<string>('');

    requiredComputed = computed(() => this.requiredSignal() || this.required());
    disabledComputed = computed(() => this.disabledSignal() || this.disabled());
    validatorComputed = computed(() => this.validatorSignal() || this.validator());
    patternComputed = computed(() => {
      const pattern = this.pattern();

      if (Array.isArray(pattern) && pattern.length === 0) {
        return null;
      }

      if (XIsEmpty(this.patternSignal())) {
        if (Array.isArray(pattern)) {
          if (pattern.length === 1) {
            return pattern[0];
          } else if (pattern.length > 1) {
            const sources = pattern.map((regex) => `(${regex.source})`);
            const combinedPattern = sources.join('|');
            return new RegExp(combinedPattern);
          }
        }
        return pattern;
      } else {
        return this.patternSignal();
      }
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
