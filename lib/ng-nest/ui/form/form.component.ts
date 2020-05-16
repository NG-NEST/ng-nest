import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XFormProperty, XControl, XFormRow, XFormPrefix } from './form.property';
import { FormGroup, FormControl } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';

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
  private _sharedProps = ['span', 'disabled', 'required', 'direction', 'justify', 'align', 'labelWidth', 'labelAlign'];

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setControls();
    this.createFormGroup();
  }

  setControls() {
    if (this.controls && this.controls.length > 0) {
      this.controlsType = this.controls[0] instanceof XControl ? 'controls' : 'rows';
      if (this.controlsType === 'controls') {
        this._controls = (this.controls as XControl[]).map((x) => this.setProps(x));
      } else if (this.controlsType === 'rows') {
        for (let row of this.controls as XFormRow[]) {
          this._controls = [...this._controls, ...row.controls.map((x) => this.setProps(x))];
        }
      }
    }
  }

  setProps(control: XControl) {
    for (let prop of this._sharedProps) {
      if (XIsEmpty(control[prop])) control[prop] = (this as any)[prop];
    }
    return control;
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
