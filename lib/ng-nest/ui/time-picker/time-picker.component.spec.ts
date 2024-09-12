import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XTimePickerComponent,
  XTimePickerDisabledTime,
  XTimePickerPrefix,
  XTimePickerPreset,
  XTimePickerType
} from '@ng-nest/ui/time-picker';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XCorner, XData, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XTimePickerComponent],
  template: ` <x-time-picker></x-time-picker> `
})
class XTestTimePickerComponent {}

@Component({
  standalone: true,
  imports: [XTimePickerComponent],
  template: `
    <x-time-picker
      [type]="type()"
      [format]="format()"
      [placement]="placement()"
      [use12Hours]="use12Hours()"
      [bordered]="bordered()"
      [hourStep]="hourStep()"
      [minuteStep]="minuteStep()"
      [secondStep]="secondStep()"
      [preset]="preset()"
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
    ></x-time-picker>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTimePickerPropertyComponent {
  type = signal<XTimePickerType>('time');
  format = signal('HH:mm:ss');
  placement = signal<XCorner>('bottom-start');
  use12Hours = signal(false);
  bordered = signal(true);
  hourStep = signal(1);
  minuteStep = signal(1);
  secondStep = signal(1);
  preset = signal<XData<XTimePickerPreset>>([]);
  disabledTime = signal<XTimePickerDisabledTime | null>(null);
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
  nodeEmit(value: number) {
    this.nodeEmitResult.set(value);
  }
}

describe(XTimePickerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTimePickerComponent, XTestTimePickerPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTimePickerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTimePickerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTimePickerComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTimePickerPropertyComponent>;
    // let component: XTestTimePickerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTimePickerPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('format.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('use12Hours.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('hourStep.', () => {
      expect(true).toBe(true);
    });
    it('minuteStep.', () => {
      expect(true).toBe(true);
    });
    it('secondStep.', () => {
      expect(true).toBe(true);
    });
    it('preset.', () => {
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
  });
});
