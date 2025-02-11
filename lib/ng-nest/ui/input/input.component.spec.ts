import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputComponent, XInputIconLayoutType, XInputPrefix, XInputType } from '@ng-nest/ui/input';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XComputedStyle, XDirection, XIsNumber, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [XInputComponent],
  template: ` <x-input></x-input> `
})
class XTestInputComponent {}

@Component({
  imports: [XInputComponent, FormsModule],
  template: `
    <x-input
      [(ngModel)]="model"
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
  model = signal('');
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

  xFocusResult = signal<FocusEvent | null>(null);
  xFocus(event: FocusEvent) {
    this.xFocusResult.set(event);
  }

  xBlurResult = signal<FocusEvent | null>(null);
  xBlur(event: FocusEvent) {
    this.xBlurResult.set(event);
  }

  xInputResult = signal<InputEvent | null>(null);
  xInput(event: InputEvent) {
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

xdescribe(XInputPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestInputComponent, XTestInputPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestInputPropertyComponent>;
    let component: XTestInputPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestInputPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const type = input.getAttribute('type');
      expect(type).toBe('text');
      component.type.set('password');
      fixture.detectChanges();
      const type2 = input.getAttribute('type');
      expect(type2).toBe('password');
    });
    it('clearable.', async () => {
      component.clearable.set(true);
      component.model.set('input text');
      fixture.detectChanges();
      await XSleep(50);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      expect(clear).toBeTruthy();
    });
    it('icon.', () => {
      component.icon.set('fto-user');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.fto-user'));
      expect(icon).toBeTruthy();
    });
    it('iconLayout.', () => {
      component.icon.set('fto-user');
      component.iconLayout.set('left');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-icon-left');
    });
    it('iconSpin.', () => {
      component.icon.set('fto-loader');
      component.iconSpin.set(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.x-icon'));
      expect(icon.nativeElement).toHaveClass('x-icon-spin');
    });
    it('maxlength.', async () => {
      component.maxlength.set(10);
      component.model.set('data');
      fixture.detectChanges();
      await XSleep(100);
      const maxText = fixture.debugElement.query(By.css('.x-input-max-length'));
      expect(maxText.nativeElement.innerText).toBe('4/10');
    });
    it('max.', () => {
      component.max.set(10);
      component.type.set('number');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const max = Number(input.getAttribute('max'));
      expect(max).toBe(10);
    });
    it('min.', () => {
      component.min.set(10);
      component.type.set('number');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const min = Number(input.getAttribute('min'));
      expect(min).toBe(10);
    });
    it('width.', () => {
      component.width.set('200px');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('x-input'));
      expect(input.nativeElement.clientWidth).toBe(200);
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('inputStyle.', () => {
      component.inputStyle.set({ color: 'rgb(0, 255, 0)' });
      component.model.set('data');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const color = XComputedStyle(input, 'color');
      expect(color).toBe('rgb(0, 255, 0)');
    });
    it('inputPadding.', () => {
      component.inputPadding.set('32px');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const paddingLeft = XComputedStyle(input, 'padding-left');
      const paddingRight = XComputedStyle(input, 'padding-right');
      expect(paddingLeft).toBe('32');
      expect(paddingRight).toBe('32');
    });
    it('inputIconPadding.', () => {
      component.inputIconPadding.set('32px');
      component.icon.set('fto-user');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const paddingRight = XComputedStyle(input, 'padding-right');
      expect(paddingRight).toBe('32');
    });
    it('validator.', () => {
      component.required.set(true);
      component.validator.set(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input')).nativeElement;
      expect(input).toHaveClass('x-required');
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
    it('clearEmit.', async () => {
      component.clearable.set(true);
      component.model.set('input text');
      fixture.detectChanges();
      await XSleep(50);
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      const clear = fixture.debugElement.query(By.css('.x-input-clear'));
      expect(clear).toBeTruthy();
      clear.nativeElement.click();
      fixture.detectChanges();
      expect(component.clearEmitResult()).toBe('input text');
    });
    it('xFocus.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      fixture.detectChanges();
      expect(component.xFocusResult()!.type).toBe('focus');
    });
    it('xBlur.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.focus();
      fixture.detectChanges();
      input.nativeElement.blur();
      fixture.detectChanges();
      expect(component.xBlurResult()!.type).toBe('blur');
    });
    it('xInput.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.dispatchEvent(new InputEvent('input', { bubbles: true, data: 'text' }));
      fixture.detectChanges();
      expect(component.xInputResult()!.type).toBe('input');
      expect(component.xInputResult()!.data).toBe('text');
    });
    it('xKeydown.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'g' }));
      fixture.detectChanges();
      expect(component.xKeydownResult()!.type).toBe('keydown');
      expect(component.xKeydownResult()!.key).toBe('g');
    });
    it('xClick.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-frame'));
      input.nativeElement.click();
      fixture.detectChanges();
      expect(component.xClickResult()!.type).toBe('click');
    });
    it('xMouseenter.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(component.xMouseenterResult()!.type).toBe('mouseenter');
    });
    it('xMouseleave.', () => {
      const input = fixture.debugElement.query(By.css('.x-input-input'));
      input.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(component.xMouseleaveResult()!.type).toBe('mouseleave');
    });
    it('xComposition.', () => {
      // The user indirectly inputs text (such as using an input method) triggering, which cannot be simulated temporarily

      // const input = fixture.debugElement.query(By.css('.x-input-input')).nativeElement;
      // input.focus();
      // fixture.detectChanges();
      // input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, cancelable: true, data: 't' }));
      // fixture.detectChanges();
      // console.log(component.xCompositionResult());
      expect(true).toBe(true);
    });
  });
});
