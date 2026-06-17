import { InjectionToken, InputSignal, InputSignalWithTransform } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { XControl, XFormControlComponent } from './form.property';
import type { XBoolean } from '@ng-nest/ui/core';

export interface XFormContext {
  formGroup: InputSignal<UntypedFormGroup>;
  controlComponents: { [property: string]: XFormControlComponent };
  controlTypes: { [property: string]: XControl };
  disabled: InputSignalWithTransform<boolean, XBoolean>;
  labelSuffix: InputSignal<string>;
}

export const X_FORM_CONTEXT = new InjectionToken<XFormContext>('X_FORM_CONTEXT');
