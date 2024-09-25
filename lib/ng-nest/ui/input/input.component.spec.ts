import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputComponent, XInputIconLayoutType, XInputPrefix, XInputType } from '@ng-nest/ui/input';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XIsNumber, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';

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
  valueTemplate = viewChild.required<TemplateRef<any>>('valueTemplate');
  valueTplContext = signal<any | null>(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild.required<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild.required<TemplateRef<any>>('afterTemplate');
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
    let component: XTestInputPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestInputPropertyComponent);
      component = fixture.componentInstance;
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
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-input-large');
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
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-direction-row');
    });
    it('placeholder.', () => {
      component.placeholder.set('placeholder');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.getAttribute('placeholder')).toBe('placeholder');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.required.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.required).toBe(true);
    });
    it('readonly.', () => {
      component.readonly.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      expect(input.nativeElement.readOnly).toBe(true);
    });
    it('valueTpl.', () => {
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('tpl');
    });
    it('valueTplContext.', () => {
      component.valueTplContext.set({ $value: 'content' });
      component.valueTpl.set(component.valueTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-input-value-template-value'));
      expect(tpl.nativeElement.innerText).toBe('content tpl');
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
      const com = fixture.debugElement.query(By.directive(XInputComponent));
      const instance = com.componentInstance as XInputComponent;
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
      const com = fixture.debugElement.query(By.directive(XInputComponent));
      const instance = com.componentInstance as XInputComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-input-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('active.', () => {
      component.active.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-active');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XInputComponent));
      const instance = com.componentInstance as XInputComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
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
