import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSwitchComponent, XSwitchPrefix } from '@ng-nest/ui/switch';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XSwitchComponent],
  template: ` <x-switch></x-switch> `
})
class XTestSwitchComponent {}

@Component({
  standalone: true,
  imports: [XSwitchComponent],
  template: `
    <x-switch
      [loading]="loading()"
      [manual]="manual()"
      [checkedText]="checkedText()"
      [unCheckedText]="unCheckedText()"
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
    ></x-switch>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestSwitchPropertyComponent {
  loading = signal(false);
  manual = signal(false);
  checkedText = signal<XTemplate | null>(null);
  unCheckedText = signal<XTemplate | null>(null);
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

describe(XSwitchPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSwitchComponent, XTestSwitchPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestSwitchComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSwitchComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSwitchComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSwitchPropertyComponent>;
    // let component: XTestSwitchPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSwitchPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('loading.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('checkedText.', () => {
      expect(true).toBe(true);
    });
    it('unCheckedText.', () => {
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
