import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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

@Component({
  selector: `${XFormPrefix}`,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFormComponent extends XFormProperty implements OnInit {
  controlsType: 'controls' | 'rows';
  controlComponents: { [property: string]: XFormControlComponent } = {};
  controlTypes: { [property: string]: XFormControlType } = {};

  constructor(public cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.disabled) && this.setDisabled();
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
        delete control.pattern;
        type.setValidators();
        control.formControlChanges();
      }
    } else {
      for (let key in this.controlComponents) {
        let [control, type] = [this.controlComponents[key], this.controlTypes[key]];
        control.disabled = type.disabled as XBoolean;
        control.required = type.required as XBoolean;
        control.pattern = type.pattern as RegExp | RegExp[];
        type.setValidators();
        control.formControlChanges();
      }
    }
    this.formGroup.updateValueAndValidity();
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
}
