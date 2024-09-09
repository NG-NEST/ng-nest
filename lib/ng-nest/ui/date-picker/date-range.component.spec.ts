import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
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
import { XAlign, XCorner, XData, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XDateRangeComponent],
  template: ` <x-date-range></x-date-range> `
})
class XTestDateRangeComponent {}

@Component({
  standalone: true,
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
      [valueTpl]="valueTpl()"
      [valueTplContext]="valueTplContext()"
      [before]="before()"
      [after]="after()"
      [pattern]="pattern()"
      [message]="message()"
      [active]="active()"
      [inputValidator]="inputValidator()"
      (nodeEmit)="nodeEmit($event)"
    >
    </x-date-range>
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
  placeholder = signal('');
  disabled = signal(false);
  required = signal(false);
  readonly = signal(false);
  valueTpl = signal<TemplateRef<any> | null>(null);
  valueTplContext = signal(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild<TemplateRef<any>>('afterTemplate');
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  active = signal(false);
  inputValidator = signal<((value: any) => boolean) | null>(null);

  nodeEmitResult = signal<number | null>(null);
  nodeEmit(event: number) {
    this.nodeEmitResult.set(event);
  }
}

describe(XDateRangePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDateRangeComponent, XTestDateRangePropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDateRangePropertyComponent>;
    // let component: XTestDateRangePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDateRangePropertyComponent);
      // component = fixture.componentInstance;
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
      expect(true).toBe(true);
    });
    it('pointer.', () => {
      expect(true).toBe(true);
    });
    it('label.', () => {
      expect(true).toBe(true);
    });
    it('labelWidth.', () => {
      expect(true).toBe(true);
    });
    it('labelAlign.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('align.', () => {
      expect(true).toBe(true);
    });
    it('direction.', () => {
      expect(true).toBe(true);
    });
    it('placeholder.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('required.', () => {
      expect(true).toBe(true);
    });
    it('readonly.', () => {
      expect(true).toBe(true);
    });
    it('valueTpl.', () => {
      expect(true).toBe(true);
    });
    it('valueTplContext.', () => {
      expect(true).toBe(true);
    });
    it('before.', () => {
      expect(true).toBe(true);
    });
    it('after.', () => {
      expect(true).toBe(true);
    });
    it('pattern.', () => {
      expect(true).toBe(true);
    });
    it('message.', () => {
      expect(true).toBe(true);
    });
    it('active.', () => {
      expect(true).toBe(true);
    });
    it('inputValidator.', () => {
      expect(true).toBe(true);
    });
    it('nodeEmit.', () => {
      expect(true).toBe(true);
    });
  });
});
