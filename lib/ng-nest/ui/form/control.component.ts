import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  XControlProperty,
  XFormControlOption,
  XFormControlComponent,
  XFormControlType,
  XCascadeControl,
  XCascadeControlOption,
  XInputControl,
  XInputControlOption,
  XSelectControl,
  XSelectControlOption,
  XCheckboxControl,
  XCheckboxControlOption,
  XRadioControl,
  XRadioControlOption,
  XDatePickerControlOption,
  XDatePickerControl,
  XInputNumberControl,
  XInputNumberControlOption,
  XSwitchControl,
  XSwitchControlOption,
  XRateControl,
  XRateControlOption,
  XSliderSelectControl,
  XSliderSelectControlOption,
  XTimePickerControl,
  XTimePickerControlOption,
  XColorPickerControl,
  XColorPickerControlOption,
  XFormControl,
  XFindControl,
  XFindControlOption,
  XTextareaControlOption,
  XTextareaControl,
  XAutoCompleteControl,
  XAutoCompleteControlOption
} from './form.property';
import { FormControlName, Validators, UntypedFormControl, ValidatorFn, ControlValueAccessor, FormControlStatus } from '@angular/forms';
import { XIsEmpty, XConfigService, XIsFunction } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { XI18nForm, XI18nService } from '@ng-nest/ui/i18n';
import { XFormInputValidator } from '@ng-nest/ui/base-form';

@Component({
  selector: 'x-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent extends XControlProperty implements OnInit, AfterViewInit, OnDestroy {
  @Input() override option!: XFormControlOption;
  @Input() form: any;
  @ViewChild(FormControlName) control!: FormControlName;
  locale: XI18nForm = {};
  private _sharedProps = ['span', 'direction', 'justify', 'align', 'labelWidth', 'labelAlign'];
  private _changeProps = ['label', ...this._sharedProps];
  private _control!: XFormControlType;
  private _validatorFns: ValidatorFn[] = [];
  private _unSubject = new Subject<void>();
  private _formControl!: UntypedFormControl;

  constructor(
    // @Host() @Optional() public form: XFormComponent,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.option = { ...this.option };
    this.setProps();
    if (XIsEmpty(this.option.label)) this.option.label = '';
    this.option.label = `${this.option.label}${this.form.labelSuffix}`;
    this._control = this.createControl(this.option);
    this._formControl = new UntypedFormControl(this._control.value, { nonNullable: this._control.nonNullable });
    this.setValidators();
    this._formControl.statusChanges.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.setMessages(x);
    });
    this._control.setValidators = () => this.setValidators();
    this.form.formGroup.addControl(this._control.id, this._formControl);
    this.option.change = () => {
      this._changeProps.forEach((x: string) => {
        if (this.control.valueAccessor && this.option[x]) {
          (this.control.valueAccessor as any)[x] = this.option[x];
        }
      });
      this.form.controlComponents[this._control.id].formControlChanges();
    };
    this.i18n.localeChange
      .pipe(
        map((x) => x.form as XI18nForm),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    Object.assign(this.control.valueAccessor!, this._control as ControlValueAccessor);
    this.form.controlTypes[this._control.id] = this._control;
    this.form.controlComponents[this._control.id] = this.control.valueAccessor as XFormControlComponent;
    this.form.controlComponents[this._control.id].formControlChanges();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setValidators() {
    this._validatorFns = [];
    if (this._control.disabled || this.form.disabled) {
      this._formControl.disable();
    } else {
      this._formControl.enable();
    }
    if (this._control.required && !this.form.disabled) {
      this._validatorFns = [...this._validatorFns, Validators.required];
    }
    if (this._control.pattern) {
      this.setPattern();
    }
    if (XIsFunction(this._control.inputValidator)) {
      this._validatorFns = [...this._validatorFns, XFormInputValidator(this._control.inputValidator!)];
    }
    this._formControl.setValidators(this._validatorFns);
    this._formControl.updateValueAndValidity();
  }

  setProps() {
    for (let prop of this._sharedProps) {
      if (XIsEmpty(this.option[prop])) this.option[prop] = (this.form as any)[prop];
    }
  }

  setPattern() {
    if (Array.isArray(this._control.pattern)) {
      for (const pt of this._control.pattern) {
        this._validatorFns = [...this._validatorFns, Validators.pattern(pt)];
      }
    } else {
      this._validatorFns = [...this._validatorFns, Validators.pattern(this._control.pattern as RegExp)];
    }
  }

  getPatternMsg(pattern: string) {
    if (Array.isArray(this._control.pattern)) {
      return (this._control.message as Array<any>)[this._control.pattern.findIndex((x) => String(x) === pattern)];
    } else {
      return this._control.message;
    }
  }

  setMessages(state: FormControlStatus) {
    let control: XFormControl = this._formControl;
    if (state === 'INVALID' && this._formControl.errors !== null) {
      let messages: string[] = [];
      for (const key in control.errors) {
        const label = this._control.label || this._control.id;
        if (key === 'required') {
          messages = [...messages, `${label} ${this.locale?.required || 'required'}`];
        } else if (key === 'pattern') {
          messages = [...messages, `${label} ${this.getPatternMsg(control.errors[key].requiredPattern)}`];
        } else if (key === 'inputValidator') {
          messages = [...messages, `${label} ${this._control.message}`];
        }
      }
      control.messages = messages;
    } else if (state === 'VALID') {
      control.messages = [];
    }
  }

  createControl(option: XFormControlOption) {
    switch (option.control) {
      case 'input':
        return new XInputControl(option as XInputControlOption);
      case 'select':
        return new XSelectControl(option as XSelectControlOption);
      case 'checkbox':
        return new XCheckboxControl(option as XCheckboxControlOption);
      case 'radio':
        return new XRadioControl(option as XRadioControlOption);
      case 'switch':
        return new XSwitchControl(option as XSwitchControlOption);
      case 'rate':
        return new XRateControl(option as XRateControlOption);
      case 'date-picker':
        return new XDatePickerControl(option as XDatePickerControlOption);
      case 'time-picker':
        return new XTimePickerControl(option as XTimePickerControlOption);
      case 'input-number':
        return new XInputNumberControl(option as XInputNumberControlOption);
      case 'slider-select':
        return new XSliderSelectControl(option as XSliderSelectControlOption);
      case 'cascade':
        return new XCascadeControl(option as XCascadeControlOption);
      case 'color-picker':
        return new XColorPickerControl(option as XColorPickerControlOption);
      case 'textarea':
        return new XTextareaControl(option as XTextareaControlOption);
      case 'find':
        return new XFindControl(option as XFindControlOption);
      case 'auto-complete':
        return new XAutoCompleteControl(option as XAutoCompleteControlOption);
      default:
        return new XInputControl(option as XInputControlOption);
    }
  }
}
