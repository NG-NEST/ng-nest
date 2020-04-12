import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XFormProperty, XControl, XFormRow, XFormPrefix } from './form.property';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: `${XFormPrefix}`,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFormComponent extends XFormProperty implements OnInit {
  formGroup: FormGroup;
  controlsType: 'controls' | 'rows';
  private _controls: XControl[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.getControlsType();
    this.createFormGroup();
  }

  getControlsType() {
    if (this.controls && this.controls.length > 0) {
      this.controlsType = this.controls[0] instanceof XControl ? 'controls' : 'rows';
      if (this.controlsType === 'controls') {
        this._controls = this.controls as XControl[];
      } else if (this.controlsType === 'rows') {
        for (let row of this.controls as XFormRow[]) {
          this._controls = [...this._controls, ...row.controls];
        }
      }
    }
  }

  createFormGroup() {
    let group: { [property: string]: FormControl } = {};
    this._controls.forEach((x) => {
      group[x.id] = new FormControl(x.value);
    });
    this.formGroup = new FormGroup(group);
  }

  submit() {}
}
