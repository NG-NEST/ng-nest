import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  inject,
  OnChanges,
  AfterViewInit
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
import { XIsChange, XBoolean, XConfigService } from '@ng-nest/ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XControlComponent } from './control.component';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XFormPrefix}`,
  standalone: true,
  imports: [
    CommonModule,
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
export class XFormComponent extends XFormProperty implements OnInit, OnChanges, AfterViewInit {
  controlsType!: 'controls' | 'rows';
  controlComponents: { [property: string]: XFormControlComponent } = {};
  controlTypes: { [property: string]: XFormControlType } = {};
  formId = Number(Math.random().toString().substring(2, 6) + Date.now()).toString(36);
  configService = inject(XConfigService);

  ngOnChanges(changes: SimpleChanges) {
    const { disabled } = changes;
    XIsChange(disabled) && this.setDisabled();
  }

  ngOnInit() {
    this.setControls();
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.setDisabled();
  }

  setControls() {
    if (this.controls && this.controls.length > 0) {
      this.controlsType = this.controls[0].controls ? 'rows' : 'controls';
    }
  }

  setClassMap() {
    this.classMap[`${XFormPrefix}-${this.controlsType}`] = true;
  }

  setDisabled() {
    if (Object.keys(this.controlComponents).length === 0) return;
    if (this.disabled) {
      for (let key in this.controlComponents) {
        let [control, type] = [this.controlComponents[key], this.controlTypes[key]];
        control.disabled = true;
        control.required = false;
        delete (control as any).pattern;
        type.setValidators && type.setValidators();
        control.formControlChanges();
      }
    } else {
      for (let key in this.controlComponents) {
        let [control, type] = [this.controlComponents[key], this.controlTypes[key]];
        control.disabled = type.disabled as XBoolean;
        control.required = type.required as XBoolean;
        control.pattern = type.pattern as RegExp | RegExp[];
        type.setValidators && type.setValidators();
        control.formControlChanges();
      }
    }
    this.formGroup.updateValueAndValidity();
  }

  setValidator() {
    for (let key in this.controlComponents) {
      let [control, type] = [this.controlComponents[key], this.controlTypes[key]];
      control.formControlValidator();
      type.setValidators && type.setValidators();
      control.cdr.detectChanges();
    }
  }

  resetValidator() {
    for (let key in this.controlComponents) {
      let [control] = [this.controlComponents[key]];
      control.validator = false;
      control.cdr.detectChanges();
    }
  }

  getValidatorMessages(): string[] {
    let result: string[] = [];
    if (this.formGroup.valid) return result;
    else {
      const eachControls = (array: XFormControlOption[]) => {
        for (const ctr of array) {
          const formCtr = this.formGroup.controls[ctr.id] as XFormControl;
          if (formCtr && formCtr.invalid) {
            result = [...result, ...(formCtr.messages as string[])];
          }
        }
      };
      if (this.controlsType === 'rows') {
        for (const row of this.controls as XFormRow[]) {
          eachControls(row.controls);
        }
      } else {
        eachControls(this.controls as XFormControlOption[]);
      }
    }
    return result;
  }

  onSubmit(event: SubmitEvent) {
    this.setValidator();
    this.xSubmit.emit(event);
  }

  trackByControl(_index: number, item: XFormControlOption) {
    return item.id;
  }
}
