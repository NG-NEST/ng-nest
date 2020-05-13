import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Host, Optional, ViewChild } from '@angular/core';
import { XControlProperty, XFormControlOption, XFormControlType } from './form.property';
import { XFormComponent } from './form.component';
import { FormControlName, Validators } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: 'x-control',
  templateUrl: './control.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent extends XControlProperty {
  @Input() option: XFormControlOption;
  @ViewChild(FormControlName, { static: false }) control: FormControlName;
  constructor(@Host() @Optional() public form: XFormComponent) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setProps('disabled', 'required', 'direction', 'justify', 'align');
    this.option.label = `${this.option.label}${this.form.labelSuffix}`;
    Object.assign(this.control.valueAccessor, this.option);
    if (this.option.disabled) this.control.control.disable();
    if (this.option.required) this.control.control.setValidators(Validators.required);
    this.control.control.updateValueAndValidity();
    (this.control.valueAccessor as XFormControlType).formControlChanges();
  }

  setProps(...props: string[]) {
    for (let prop of props) {
      if (XIsEmpty(this.option[prop])) this.option[prop] = (this.form as any)[prop];
    }
  }
}
