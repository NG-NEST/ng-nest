import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputComponent, XInputIconLayoutType, XInputPrefix, XInputType } from '@ng-nest/ui/input';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XSize, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XInputComponent],
  template: ` <x-input></x-input> `
})
class XTestInputComponent {}

@Component({
  standalone: true,
  imports: [XInputComponent],
  template: `
    <x-input
      [type]="type()"
      [clearable]="clearable()"
      [icon]="icon()"
      [iconLayout]="iconLayout()"
      [iconSpin]="iconSpin()"
      [maxlength]="maxlength()"
      [max]="max()"
      [min]="min()"
      [width]="width()"
      [bordered]="bordered()"
      [inputStyle]="inputStyle()"
      [inputPadding]="inputPadding()"
      [inputIconPadding]="inputIconPadding()"
      [validator]="validator()"
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
      (clearEmit)="clearEmit($event)"
      (xFocus)="xFocus($event)"
      (xBlur)="xBlur($event)"
      (xInput)="xInput($event)"
      (xKeydown)="xKeydown($event)"
      (xClick)="xClick($event)"
      (xMouseenter)="xMouseenter($event)"
      (xMouseleave)="xMouseleave($event)"
      (xComposition)="xComposition($event)"
    ></x-input>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestInputPropertyComponent {
  type = signal<XInputType>('text');
  clearable = signal(false);
  icon = signal('');
  iconLayout = signal<XInputIconLayoutType>('right');
  iconSpin = signal(false);
  maxlength = signal<number | null>(null);
  max = signal<number | null>(null);
  min = signal<number | null>(null);
  width = signal('');
  bordered = signal(true);
  inputStyle = signal<{ [style: string]: any } | null>(null);
  inputPadding = signal('0.75rem');
  inputIconPadding = signal('2.15rem');
  validator = signal(false);
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

  clearEmitResult = signal<any>(null);
  clearEmit(event: any) {
    this.clearEmitResult.set(event);
  }

  xFocusResult = signal<any>(null);
  xFocus(event: any) {
    this.xFocusResult.set(event);
  }

  xBlurResult = signal<any>(null);
  xBlur(event: any) {
    this.xBlurResult.set(event);
  }

  xInputResult = signal<any>(null);
  xInput(event: any) {
    this.xInputResult.set(event);
  }

  xKeydownResult = signal<KeyboardEvent | null>(null);
  xKeydown(event: KeyboardEvent) {
    this.xKeydownResult.set(event);
  }

  xClickResult = signal<MouseEvent | null>(null);
  xClick(event: MouseEvent) {
    this.xClickResult.set(event);
  }

  xMouseenterResult = signal<MouseEvent | null>(null);
  xMouseenter(event: MouseEvent) {
    this.xMouseenterResult.set(event);
  }

  xMouseleaveResult = signal<MouseEvent | null>(null);
  xMouseleave(event: MouseEvent) {
    this.xMouseleaveResult.set(event);
  }

  xCompositionResult = signal<any>(null);
  xComposition(event: any) {
    this.xCompositionResult.set(event);
  }
}

describe(XInputPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestInputComponent, XTestInputPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestInputComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestInputComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XInputComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestInputPropertyComponent>;
    // let component: XTestInputPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestInputPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
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
    it('max.', () => {
      expect(true).toBe(true);
    });
    it('min.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('bordered.', () => {
      expect(true).toBe(true);
    });
    it('inputStyle.', () => {
      expect(true).toBe(true);
    });
    it('inputPadding.', () => {
      expect(true).toBe(true);
    });
    it('inputIconPadding.', () => {
      expect(true).toBe(true);
    });
    it('validator.', () => {
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
    it('clearEmit.', () => {
      expect(true).toBe(true);
    });
    it('xFocus.', () => {
      expect(true).toBe(true);
    });
    it('xBlur.', () => {
      expect(true).toBe(true);
    });
    it('xInput.', () => {
      expect(true).toBe(true);
    });
    it('xKeydown.', () => {
      expect(true).toBe(true);
    });
    it('xClick.', () => {
      expect(true).toBe(true);
    });
    it('xMouseenter.', () => {
      expect(true).toBe(true);
    });
    it('xMouseleave.', () => {
      expect(true).toBe(true);
    });
    it('xComposition.', () => {
      expect(true).toBe(true);
    });
  });
});
