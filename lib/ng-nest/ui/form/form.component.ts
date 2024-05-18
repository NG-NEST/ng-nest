import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  signal,
  computed
} from '@angular/core';
import {
  XFormProperty,
  XFormRow,
  XFormPrefix,
  XFormControlOption,
  XFormControl,
  XFormControlComponent,
  XFormControlType
} from './form.property';
import { XIsChange } from '@ng-nest/ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XControlComponent } from './control.component';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XFormPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    XRowComponent,
    XColComponent,
    XOutletDirective,
    XIconComponent,
    XControlComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFormComponent extends XFormProperty implements OnChanges, AfterViewInit {
  controlsType = computed(() => {
    const controls = this.controls();
    return controls && controls.length > 0 && (controls[0] as XFormRow).controls ? 'rows' : 'controls';
  });
  controlComponents = signal<{ [property: string]: XFormControlComponent }>({});
  controlTypes = signal<{ [property: string]: XFormControlType }>({});
  formId = Number(Math.random().toString().substring(2, 6) + Date.now()).toString(36);
  classMap = computed(() => ({
    [`${XFormPrefix}-${this.controlsType()}`]: true
  }));

  ngOnChanges(changes: SimpleChanges) {
    const { disabled } = changes;
    XIsChange(disabled) && this.setDisabled();
  }

  ngAfterViewInit() {
    this.setDisabled();
  }

  setDisabled() {
    if (Object.keys(this.controlComponents()).length === 0) return;
    if (this.disabled()) {
      for (let key in this.controlComponents()) {
        let [control, type] = [this.controlComponents()[key], this.controlTypes()[key]];
        control.disabledSignal.set(true);
        control.requiredSignal.set(false);
        control.patternSignal.set([]);
        type.setValidators && type.setValidators();
        control.formControlChanges();
      }
    } else {
      for (let key in this.controlComponents()) {
        let [control, type] = [this.controlComponents()[key], this.controlTypes()[key]];
        control.disabledSignal.set(type.disabled!);
        control.requiredSignal.set(type.required!);
        control.patternSignal.set(type.pattern as RegExp | RegExp[]);
        type.setValidators && type.setValidators();
        control.formControlChanges();
      }
    }
    this.formGroup().updateValueAndValidity();
  }

  setValidator() {
    for (let key in this.controlComponents()) {
      let [control, type] = [this.controlComponents()[key], this.controlTypes()[key]];
      control.formControlValidator();
      type.setValidators && type.setValidators();
      control.cdr.detectChanges();
    }
  }

  resetValidator() {
    for (let key in this.controlComponents()) {
      let [control] = [this.controlComponents()[key]];
      control.validatorSignal.set(false);
      control.cdr.detectChanges();
    }
  }

  getValidatorMessages(): string[] {
    let result: string[] = [];
    if (this.formGroup().valid) return result;
    else {
      const eachControls = (array: XFormControlOption[]) => {
        for (const ctr of array) {
          const formCtr = this.formGroup().controls[ctr.id] as XFormControl;
          if (formCtr && formCtr.invalid) {
            result = [...result, ...(formCtr.messages as string[])];
          }
        }
      };
      if (this.controlsType() === 'rows') {
        for (const row of this.controls() as XFormRow[]) {
          eachControls(row.controls);
        }
      } else {
        eachControls(this.controls() as XFormControlOption[]);
      }
    }
    return result;
  }

  onSubmit(event: SubmitEvent) {
    this.setValidator();
    this.xSubmit.emit(event);
  }
}
