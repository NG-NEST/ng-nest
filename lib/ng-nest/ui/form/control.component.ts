import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  viewChild,
  signal,
  ViewContainerRef,
  ComponentRef,
  OutputEmitterRef,
  effect
} from '@angular/core';
import { XControlProperty, XFormControlOption, XFormControlComponent, XFormControl } from './form.property';
import {
  Validators,
  UntypedFormControl,
  ValidatorFn,
  FormControlStatus,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { XIsEmpty, XIsFunction } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { XI18nForm, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { XFormInputValidator } from '@ng-nest/ui/base-form';
import { XFormComponent } from './form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CdkPortalOutlet, ComponentPortal, Portal, PortalModule } from '@angular/cdk/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XCascadeComponent } from '@ng-nest/ui/cascade';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XFindComponent } from '@ng-nest/ui/find';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XRateComponent } from '@ng-nest/ui/rate';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XTextareaComponent } from '@ng-nest/ui/textarea';
import { XTimePickerComponent, XTimePickerModule } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'x-control',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PortalModule,

    XInputComponent,
    XSelectComponent,
    XCascadeComponent,
    XCheckboxComponent,
    XColorPickerComponent,
    XDatePickerComponent,
    XInputNumberComponent,
    XRadioComponent,
    XRateComponent,
    XSliderSelectComponent,
    XSwitchComponent,
    XTimePickerModule,
    XTextareaComponent,
    XFindComponent,
    XAutoCompleteComponent
  ],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent extends XControlProperty implements OnInit, AfterViewInit, OnDestroy {
  private i18n = inject(XI18nService);
  private viewContainerRef = inject(ViewContainerRef);
  private _sharedProps = signal(['span', 'direction', 'justify', 'align', 'labelWidth', 'labelAlign']);
  private validatorFns = signal<ValidatorFn[]>([]);
  private formControl = signal<UntypedFormControl | null>(null);
  private _unSubject = new Subject<void>();
  value = signal<any>(null);

  form = inject(XFormComponent, { optional: true })!;
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.form as XI18nForm)), { initialValue: zh_CN.form });
  portal = signal<Portal<any> | null>(null);
  componentPortal!: ComponentPortal<XFormControlComponent>;
  componentRef!: ComponentRef<XFormControlComponent>;
  portalOutlet = viewChild.required(CdkPortalOutlet);

  constructor() {
    super();

    effect(
      () => {
        this.formControl()!.patchValue(this.value());
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.setOption();

    this.formControl.set(
      new UntypedFormControl(this.option().value, {
        nonNullable: this.option().nonNullable
      })
    );
    this.setValidators();
    this.formControl()!
      .statusChanges.pipe(takeUntil(this._unSubject))
      .subscribe((x) => {
        this.setMessages(x);
      });
    this.formControl()!
      .valueChanges.pipe(takeUntil(this._unSubject))
      .subscribe((x) => {
        this.componentRef.instance.writeValue(x);
      });
    this.option().setValidators = () => this.setValidators();
    this.form.formGroup().addControl(this.option().id, this.formControl());
  }

  ngAfterViewInit() {
    this.componentPortal = this.createComponentPortal(this.option());
    this.componentRef = this.portalOutlet().attachComponentPortal(this.componentPortal);

    for (let key in this.option()) {
      if (key in this.componentRef.instance) {
        const val = (this.componentRef.instance as any)[key];
        if (XIsFunction(val)) {
          const valSymbols = Object.getOwnPropertySymbols(val);
          if (valSymbols.length !== 1) break;
          const valSymbol = val[valSymbols[0]];
          if (valSymbol.hasOwnProperty('transformFn')) {
            // input
            this.componentRef.setInput(key, this.option()[key]);
          } else {
            // signal
            val.set(this.option()[key]);
          }
        } else if (val instanceof OutputEmitterRef) {
          // output
          val.subscribe((x) => this.option()[key](x));
        }
      }
    }

    // value
    if (this.option().value !== undefined) {
      this.componentRef.instance.writeValue(this.option().value);
    }

    this.value = this.componentRef.instance.value;

    this.form.controlTypes[this.option().id] = this.option();
    this.form.controlComponents[this.option().id] = this.componentRef.instance;
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setValidators() {
    this.validatorFns.set([]);
    if (this.option().disabled || this.form.disabled()) {
      this.formControl()!.disable();
    } else {
      this.formControl()!.enable();
    }
    if (this.option().required && !this.form.disabled()) {
      this.validatorFns.update((x) => [...x, Validators.required]);
    }
    if (this.option().pattern) {
      this.setPattern();
    }
    if (XIsFunction(this.option().inputValidator)) {
      this.validatorFns.update((x) => [...x, XFormInputValidator(this.option().inputValidator!)]);
    }
    this.formControl()!.setValidators(this.validatorFns());
    this.formControl()!.updateValueAndValidity();
  }

  setOption() {
    for (let prop of this._sharedProps()) {
      if (XIsEmpty(this.option()[prop])) {
        this.option.update((x) => {
          x[prop] = (this.form as any)[prop]();
          return x;
        });
      }
    }
    if (XIsEmpty(this.option().label)) {
      this.option.update((x) => {
        x.label = '';
        return x;
      });
    }
    this.option.update((x) => {
      x.label = `${this.option().label}${this.form.labelSuffix()}`;
      return x;
    });
  }

  setPattern() {
    const pattern = this.option().pattern;
    if (Array.isArray(pattern)) {
      for (const pt of pattern) {
        this.validatorFns.update((x) => [...x, Validators.pattern(pt)]);
      }
    } else {
      this.validatorFns.update((x) => [...x, Validators.pattern(pattern as RegExp)]);
    }
  }

  getPatternMsg(pattern: string) {
    const controlPattern = this.option().pattern;
    if (Array.isArray(controlPattern)) {
      return (this.option().message as Array<any>)[controlPattern.findIndex((x) => String(x) === pattern)];
    } else {
      return this.option().message;
    }
  }

  setMessages(state: FormControlStatus) {
    let control = this.formControl()! as XFormControl;
    if (state === 'INVALID' && this.formControl()!.errors !== null) {
      let messages: string[] = [];
      for (const key in control.errors) {
        const label = this.option().label || this.option().id;
        if (key === 'required') {
          messages = [...messages, `${label} ${this.locale().required || 'required'}`];
        } else if (key === 'pattern') {
          messages = [...messages, `${label} ${this.getPatternMsg(control.errors[key].requiredPattern)}`];
        } else if (key === 'inputValidator') {
          messages = [...messages, `${label} ${this.option().message}`];
        }
      }
      control.messages = messages;
    } else if (state === 'VALID') {
      control.messages = [];
    }
  }

  createComponentPortal(option: XFormControlOption) {
    switch (option.control) {
      case 'input':
        return new ComponentPortal(XInputComponent, this.viewContainerRef);
      case 'select':
        return new ComponentPortal(XSelectComponent, this.viewContainerRef);
      case 'checkbox':
        return new ComponentPortal(XCheckboxComponent, this.viewContainerRef);
      case 'radio':
        return new ComponentPortal(XRadioComponent, this.viewContainerRef);
      case 'switch':
        return new ComponentPortal(XSwitchComponent, this.viewContainerRef);
      case 'rate':
        return new ComponentPortal(XRateComponent, this.viewContainerRef);
      case 'date-picker':
        return new ComponentPortal(XDatePickerComponent, this.viewContainerRef);
      case 'time-picker':
        return new ComponentPortal(XTimePickerComponent, this.viewContainerRef);
      case 'input-number':
        return new ComponentPortal(XInputNumberComponent, this.viewContainerRef);
      case 'slider-select':
        return new ComponentPortal(XSliderSelectComponent, this.viewContainerRef);
      case 'cascade':
        return new ComponentPortal(XCascadeComponent, this.viewContainerRef);
      case 'color-picker':
        return new ComponentPortal(XColorPickerComponent, this.viewContainerRef);
      case 'textarea':
        return new ComponentPortal(XTextareaComponent, this.viewContainerRef);
      case 'find':
        return new ComponentPortal(XFindComponent, this.viewContainerRef);
      case 'auto-complete':
        return new ComponentPortal(XAutoCompleteComponent, this.viewContainerRef);
      default:
        return new ComponentPortal(XInputComponent, this.viewContainerRef);
    }
  }
}
