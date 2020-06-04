import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XFormProperty, XControl, XFormRow, XFormPrefix, XFormControlOption, XFormControl } from './form.property';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XFormPrefix}`,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFormComponent extends XFormProperty implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  controlsType: 'controls' | 'rows';

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setControls();
    this.setClassMap();
  }

  ngAfterViewInit() {}

  setControls() {
    if (this.controls && this.controls.length > 0) {
      this.controlsType = this.controls[0].controls ? 'rows' : 'controls';
    }
  }

  setClassMap() {
    this.classMap[`${XFormPrefix}-${this.controlsType}`] = true;
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

  submit() {}
}
