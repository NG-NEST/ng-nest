import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XDateRangeComponent,
  XDatePickerDisabledDate,
  XDatePickerDisabledTime,
  XDatePickerPreset,
  XDatePickerType,
  XDateRangePrefix
} from '@ng-nest/ui/date-picker';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XCorner, XData, XDirection, XIsNumber, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XDateRangeComponent],
  template: ` <x-date-range></x-date-range> `
})
class XTestDateRangeComponent {}

@Component({
  imports: [XDateRangeComponent],
  template: `
    <x-date-range
      [type]="type()"
      [format]="format()"
      [clearable]="clearable()"
      [placement]="placement()"
      [bordered]="bordered()"
      [preset]="preset()"
      [extraFooter]="extraFooter()"
      [disabledDate]="disabledDate()"
      [disabledTime]="disabledTime()"
      [size]="size()"
      [pointer]="pointer()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [required]="required()"
      [readonly]="readonly()"
      [before]="before()"
      [after]="after()"
      [pattern]="pattern()"
      [message]="message()"
      [inputValidator]="inputValidator()"
      (nodeEmit)="nodeEmit($event)"
    >
    </x-date-range>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>

    <ng-template #nodeTemplate let-node="$node">
      <div>{{ node.label }} tpl</div>
    </ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestDateRangePropertyComponent {
  type = signal<XDatePickerType>('date');
  format = signal('yyyy-MM-dd');
  clearable = signal(true);
  placement = signal<XCorner>('bottom-start');
  bordered = signal(true);
  preset = signal<XData<XDatePickerPreset>>([]);
  extraFooter = signal<XTemplate | null>(null);
  disabledDate = signal<XDatePickerDisabledDate | null>(null);
  disabledTime = signal<XDatePickerDisabledTime | null>(null);
  size = signal<XSize>('medium');
  pointer = signal(false);
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  placeholder = signal<string | string[]>('');
  disabled = signal(false);
  required = signal(false);
  readonly = signal(false);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild.required<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild.required<TemplateRef<any>>('afterTemplate');
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  inputValidator = signal<((value: any) => boolean) | null>(null);

  nodeEmitResult = signal<number | null>(null);
  nodeEmit(event: number) {
    this.nodeEmitResult.set(event);
  }
}

xdescribe(XDateRangePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDateRangeComponent, XTestDateRangePropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestDateRangeComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDateRangeComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDateRangeComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDateRangePropertyComponent>;
    let component: XTestDateRangePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDateRangePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('format.', () => {
      expect(true).toBe(true);
    });
    it('clearable.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('preset.', () => {
      expect(true).toBe(true);
    });
    it('extraFooter.', () => {
      expect(true).toBe(true);
    });
    it('disabledDate.', () => {
      expect(true).toBe(true);
    });
    it('disabledTime.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      const input = fixture.debugElement.query(By.css('.x-date-range'));
      expect(input.nativeElement).toHaveClass('x-date-range-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-date-range-large');
    });
    it('pointer.', () => {
      component.pointer.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-pointer');
    });
    it('label.', async () => {
      component.label.set('label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.innerText).toBe('label');
    });
    it('labelWidth.', () => {
      component.label.set('label');
      component.labelWidth.set('100px');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.style.width).toBe('100px');
    });
    it('labelAlign.', () => {
      component.label.set('label');
      component.labelAlign.set('end');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-text-align-end');
    });
    it('justify.', () => {
      component.label.set('label');
      component.justify.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-date-range'));
      expect(input.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-date-range'));
      expect(input.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-date-range'));
      expect(input.nativeElement).toHaveClass('x-direction-row');
    });
    it('placeholder.', () => {
      component.placeholder.set(['start', 'end']);
      fixture.detectChanges();
      const inputs = fixture.debugElement.queryAll(By.css('.x-input-frame'));
      expect(inputs[0].nativeElement.getAttribute('placeholder')).toBe('start');
      expect(inputs[1].nativeElement.getAttribute('placeholder')).toBe('end');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-date-range'));
      expect(input.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.label.set('label');
      component.required.set(true);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-date-range-label-required');
    });
    it('readonly.', () => {
      component.readonly.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.readOnly).toBe(true);
    });
    it('before.', () => {
      component.before.set(component.beforeTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-before'));
      expect(tpl.nativeElement.innerText).toBe('before');
    });
    it('after.', () => {
      component.after.set(component.afterTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-row-after'));
      expect(tpl.nativeElement.innerText).toBe('after');
    });
    it('pattern.', () => {
      component.pattern.set(/^\d+$/);
      const com = fixture.debugElement.query(By.directive(XDateRangeComponent));
      const instance = com.componentInstance as XDateRangeComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('message.', async () => {
      component.pattern.set(/^\d+$/);
      component.message.set('It must be a number');
      const com = fixture.debugElement.query(By.directive(XDateRangeComponent));
      const instance = com.componentInstance as XDateRangeComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-date-range-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XDateRangeComponent));
      const instance = com.componentInstance as XDateRangeComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
    it('nodeEmit.', () => {
      expect(true).toBe(true);
    });
  });
});
