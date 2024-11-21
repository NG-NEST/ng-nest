import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputNumberComponent, XInputNumberPrefix } from '@ng-nest/ui/input-number';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XDirection, XIsNumber, XJustify, XNumber, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [XInputNumberComponent],
  template: ` <x-input-number> </x-input-number> `
})
class XTestInputNumberComponent {}

@Component({
  imports: [XInputNumberComponent, FormsModule],
  template: `
    <x-input-number
      [(ngModel)]="value"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [debounce]="debounce()"
      [precision]="precision()"
      [bordered]="bordered()"
      [formatter]="formatter()"
      [hiddenButton]="hiddenButton()"
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
      [pattern]="pattern()"
      [message]="message()"
      [inputValidator]="inputValidator()"
    >
    </x-input-number>

    <ng-template #valueTemplate let-value="$value">
      <div>{{ value }} tpl</div>
    </ng-template>
  `
})
class XTestInputNumberPropertyComponent {
  value = signal<number | null>(null);
  min = signal(Number.MIN_SAFE_INTEGER);
  max = signal(Number.MAX_SAFE_INTEGER);
  step = signal(1);
  debounce = signal(40);
  precision = signal(0);
  bordered = signal(true);
  formatter = signal<((value: number) => XNumber) | null>(null);
  hiddenButton = signal(false);
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
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  inputValidator = signal<((value: any) => boolean) | null>(null);
}

describe(XInputNumberPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestInputNumberComponent, XTestInputNumberPropertyComponent],
      providers: [provideAnimations, provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestInputNumberComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestInputNumberComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XInputNumberComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestInputNumberPropertyComponent>;
    let component: XTestInputNumberPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestInputNumberPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('min.', () => {
      component.min.set(10);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const min = Number(input.getAttribute('min'));
      expect(min).toBe(10);
    });
    it('max.', () => {
      component.max.set(10);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      const max = Number(input.getAttribute('max'));
      expect(max).toBe(10);
    });
    it('step.', () => {
      component.step.set(10);
      fixture.detectChanges();
      const plus = fixture.debugElement.query(By.css('.x-input-number-plus')).nativeElement;
      plus.click();
      plus.click();
      fixture.detectChanges();
      expect(component.value()).toBe(20);
    });
    it('debounce.', async () => {
      const plus = fixture.debugElement.query(By.css('.x-input-number-plus')).nativeElement;
      plus.dispatchEvent(new MouseEvent('mousedown'));
      await XSleep(550);
      plus.dispatchEvent(new MouseEvent('mouseup'));
      expect(component.value()).toBe(Math.floor((550 - 150) / 40) - 1);

      component.debounce.set(100);
      component.value.set(0);
      fixture.detectChanges();
      plus.dispatchEvent(new MouseEvent('mousedown'));
      await XSleep(550);
      plus.dispatchEvent(new MouseEvent('mouseup'));
      expect(component.value()).toBe(Math.floor((550 - 150) / 100) - 1);
    });
    it('precision.', () => {
      component.precision.set(2);
      component.step.set(0.1);
      fixture.detectChanges();
      const plus = fixture.debugElement.query(By.css('.x-input-number-plus')).nativeElement;
      plus.click();
      plus.click();
      fixture.detectChanges();
      expect(component.value()).toBe(0.2);
    });
    it('bordered.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-bordered');

      component.bordered.set(false);
      fixture.detectChanges();
      expect(input.nativeElement).not.toHaveClass('x-input-bordered');
    });
    it('formatter.', async () => {
      component.formatter.set((value: number): XNumber => `$ ${value}`);
      component.value.set(100);
      fixture.detectChanges();
      await XSleep(20);
      const input = fixture.debugElement.query(By.css('.x-input-frame')).nativeElement;
      expect(input.value).toBe('$ 100');
    });
    it('hiddenButton.', () => {
      component.hiddenButton.set(true);
      fixture.detectChanges();
      const reduce = fixture.debugElement.query(By.css('.x-input-number-reduce'));
      const plus = fixture.debugElement.query(By.css('.x-input-number-plus'));
      expect(reduce).toBeFalsy();
      expect(plus).toBeFalsy();
    });
    it('size.', () => {
      const input = fixture.debugElement.query(By.css('.x-input'));
      expect(input.nativeElement).toHaveClass('x-input-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-input-large');
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
    it('pattern.', () => {
      component.pattern.set(/^\d+$/);
      const com = fixture.debugElement.query(By.directive(XInputNumberComponent));
      const instance = com.componentInstance as XInputNumberComponent;
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
      const com = fixture.debugElement.query(By.directive(XInputNumberComponent));
      const instance = com.componentInstance as XInputNumberComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-input-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XInputNumberComponent));
      const instance = com.componentInstance as XInputNumberComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
  });
});
