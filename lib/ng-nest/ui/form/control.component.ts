import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Host, Optional, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  constructor(@Host() @Optional() public form: XFormComponent, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.option.label = `${this.option.label}${this.form.labelSuffix}`;
    Object.assign(this.control.valueAccessor, this.option);
    if (this.option.disabled) this.control.control.disable();
    if (this.option.required) this.control.control.setValidators(Validators.required);
    this.control.control.updateValueAndValidity();
    (this.control.valueAccessor as XFormControlType).formControlChanges();
  }

  
}
