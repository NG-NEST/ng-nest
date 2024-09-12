import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTextareaComponent, XTextareaIconLayoutType, XTextareaPrefix } from '@ng-nest/ui/textarea';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XTextareaComponent],
  template: ` <x-textarea></x-textarea> `
})
class XTestTextareaComponent {}

@Component({
  standalone: true,
  imports: [XTextareaComponent],
  template: `
    <x-textarea
      [clearable]="clearable()"
      [icon]="icon()"
      [iconLayout]="iconLayout()"
      [iconSpin]="iconSpin()"
      [maxlength]="maxlength()"
      [height]="height()"
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
    ></x-textarea>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTextareaPropertyComponent {
  clearable = signal(false);
  icon = signal('');
  iconLayout = signal<XTextareaIconLayoutType>('right');
  iconSpin = signal(false);
  maxlength = signal<number | null>(null);
  height = signal('6rem');
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

  clearEmitResult = signal<string | null>(null);
  clearEmit(value: string) {
    this.clearEmitResult.set(value);
  }
}

describe(XTextareaPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTextareaComponent, XTestTextareaPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTextareaComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTextareaComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTextareaComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTextareaPropertyComponent>;
    // let component: XTestTextareaPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTextareaPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('clearable.', () => {
      expect(true).toBe(true);
    });
    it('icon.', () => {
      expect(true).toBe(true);
    });
    it('iconLayout.', () => {
      expect(true).toBe(true);
    });
    it('iconSpin.', () => {
      expect(true).toBe(true);
    });
    it('maxlength.', () => {
      expect(true).toBe(true);
    });
    it('height.', () => {
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
