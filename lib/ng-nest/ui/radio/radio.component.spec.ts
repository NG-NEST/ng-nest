import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRadioComponent, XRadioNode, XRadioPrefix } from '@ng-nest/ui/radio';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';
import { XButtonType } from '@ng-nest/ui/button';

@Component({
  standalone: true,
  imports: [XRadioComponent],
  template: ` <x-radio> </x-radio> `
})
class XTestRadioComponent {}

@Component({
  standalone: true,
  imports: [XRadioComponent],
  template: `
    <x-radio
      [data]="data()"
      [button]="button()"
      [icon]="icon()"
      [tag]="tag()"
      [type]="type()"
      [tagBordered]="tagBordered()"
      [tagDark]="tagDark()"
      [allowCancel]="allowCancel()"
      [vertical]="vertical()"
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
    </x-radio>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestRadioPropertyComponent {
  data = signal<XData<XRadioNode>>([]);
  button = signal(false);
  icon = signal(false);
  tag = signal(false);
  type = signal<XButtonType>('initial');
  tagBordered = signal(true);
  tagDark = signal(false);
  allowCancel = signal(false);
  vertical = signal(false);
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

describe(XRadioPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestRadioComponent, XTestRadioPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestRadioComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestRadioComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XRadioComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestRadioPropertyComponent>;
    // let component: XTestRadioPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRadioPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('button.', () => {
      expect(true).toBe(true);
    });
    it('icon.', () => {
      expect(true).toBe(true);
    });
    it('tag.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('tagBordered.', () => {
      expect(true).toBe(true);
    });
    it('tagDark.', () => {
      expect(true).toBe(true);
    });
    it('allowCancel.', () => {
      expect(true).toBe(true);
    });
    it('vertical.', () => {
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
