import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRateColor, XRateComponent, XRatePrefix } from '@ng-nest/ui/rate';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XAlign, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XRateComponent],
  template: ` <x-rate> </x-rate> `
})
class XTestRateComponent {}

@Component({
  standalone: true,
  imports: [XRateComponent],
  template: `
    <x-rate
      [count]="count()"
      [half]="half()"
      [color]="color()"
      [customTemp]="customTemp()"
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
    >
    </x-rate>

    <ng-template #customTemplate>custom</ng-template>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestRatePropertyComponent {
  count = signal(5);
  half = signal(false);
  color = signal<XRateColor>('');
  customTemp = signal<TemplateRef<any> | null>(null);
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
}

describe(XRatePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestRateComponent, XTestRatePropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestRateComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestRateComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XRateComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestRatePropertyComponent>;
    // let component: XTestRatePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRatePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('count.', () => {
      expect(true).toBe(true);
    });
    it('half.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('customTemp.', () => {
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
