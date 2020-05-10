import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Host,
  Optional,
  ViewChild,
  ContentChild,
  ComponentRef
} from '@angular/core';
import { XControlProperty, XFormControlOption, XFormControlType } from './form.property';
import { XFormComponent } from './form.component';
import { FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'x-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
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
    Object.assign(this.control.valueAccessor, this.option);
    if (this.option.disabled) this.control.control.disable();
    if (this.option.required) this.control.control.setValidators(Validators.required);
    this.control.control.updateValueAndValidity();
    (this.control.valueAccessor as XFormControlType).formControlChanges();
  }
}
