import {
  Component,
  input,
  model,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XFormControlFunction, XFormInputValidator, XValueAccessor } from './base-form.component';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  XAlign,
  XBoolean,
  XDirection,
  XIsString,
  XJustify,
  XNumber,
  XSize,
  XTemplate,
  XToBoolean,
  XToCssPixelValue
} from '@ng-nest/ui/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: `x-test-base-form`,
  imports: [],
  template: ``
})
export class XTestBaseFormComponent {}

@Component({
  selector: `x-test-base-form-input`,
  imports: [],
  template: `{{ value() }} {{ requiredIsEmpty() }} {{ invalid() }} {{ invalidMessage() }} {{ invalidIndex() }}
    {{ messageComputed() }} {{ disabledComputed() }}`,
  providers: [XValueAccessor(XTestBaseFormInputComponent)]
})
export class XTestBaseFormInputComponent extends XFormControlFunction('input') {
  override readonly validator = input<boolean, XBoolean>(false, { transform: XToBoolean });
  override readonly size = input<XSize>(this.config?.size ?? 'medium');
  override readonly pointer = input<boolean, XBoolean>(false, { transform: XToBoolean });
  override readonly label = input<string>('');
  override readonly labelWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  override readonly labelAlign = input<XAlign>('start');
  override readonly justify = input<XJustify>('start');
  override readonly align = input<XAlign>('start');
  override readonly direction = input<XDirection>('column');
  override readonly placeholder = input<string | string[]>('');
  override readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  override readonly required = input<boolean, XBoolean>(false, { transform: XToBoolean });
  override readonly readonly = input<boolean, XBoolean>(false, { transform: XToBoolean });
  override readonly valueTpl = input<TemplateRef<any>>();
  override readonly valueTplContext = input();
  override readonly before = input<XTemplate>();
  override readonly after = input<XTemplate>();
  override readonly pattern = input<RegExp | RegExp[] | any>(null);
  override readonly message = input<string | string[]>([]);
  override readonly active = model<boolean>(false);
  override readonly inputValidator = input<(value: any) => boolean>();

  valueChange = toObservable(this.value);

  ngOnInit() {
    this.valueChange.subscribe(() => {
      this.formControlValidator();
    });
  }
}

@Component({
  selector: `x-test-base-form-input-ex`,
  imports: [FormsModule, XTestBaseFormInputComponent],
  template: `<x-test-base-form-input
    [(ngModel)]="value"
    [disabled]="true"
    [required]="true"
    [pattern]="pattern()"
    [message]="message()"
  ></x-test-base-form-input>`
})
export class XTestBaseFormInputExComponent {
  value = signal<any>('');
  pattern = signal<any>(null);
  message = signal<any>(null);
}

xdescribe('x-base-form', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestBaseFormComponent, XTestBaseFormInputComponent],
      providers: [provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestBaseFormComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestBaseFormComponent);
      fixture.detectChanges();
    });
    it('XValueAccessor.', () => {
      const valueAccessor = XValueAccessor(XTestBaseFormComponent);
      expect(valueAccessor.provide).toBe(NG_VALUE_ACCESSOR);
      expect(valueAccessor.useExisting.toString()).toBe('XTestBaseFormComponent');
      expect(valueAccessor.multi).toBe(true);
    });
    it('XFormInputValidator.', () => {
      const inputValidator = XFormInputValidator((x) => {
        return XIsString(x);
      });
      const formcontrol1 = new FormControl('');
      const valid1 = inputValidator(formcontrol1);
      expect(valid1).toBe(null);

      const formcontrol2 = new FormControl(1);
      const valid2 = inputValidator(formcontrol2);
      expect(JSON.stringify(valid2)).toBe(`{"inputValidator":true}`);
    });
  });

  xdescribe('input control', () => {
    let fixture: ComponentFixture<XTestBaseFormInputExComponent>;
    let component: XTestBaseFormInputExComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestBaseFormInputExComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('pattern array.', () => {
      component.value.set('123');
      component.pattern.set([/^\d+$/, /^(?:[0-9]|[1-9][0-9])$/]);
      component.message.set(['number', 'between 0 and 99']);
      fixture.detectChanges();
      expect(true).toBeTrue();
    });

    it('pattern single.', () => {
      component.value.set('123');
      component.pattern.set(/^\d+$/);
      component.message.set('number');
      fixture.detectChanges();
      expect(true).toBeTrue();
    });

    it('pattern lenght.', () => {
      component.value.set('123');
      component.pattern.set([/^\d+$/, /^(?:[0-9]|[1-9][0-9])$/]);
      component.message.set(['number']);
      fixture.detectChanges();
      expect(true).toBeTrue();
    });

    it('pattern null.', () => {
      component.value.set('123');
      component.pattern.set(null);
      component.message.set(null);
      fixture.detectChanges();
      expect(true).toBeTrue();
    });

    it('value null.', () => {
      component.pattern.set([/^\d+$/, /^(?:[0-9]|[1-9][0-9])$/]);
      component.message.set(['number', 'between 0 and 99']);
      fixture.detectChanges();
      expect(true).toBeTrue();
    });
  });
});
