import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTextareaComponent, XTextareaIconLayoutType, XTextareaPrefix } from '@ng-nest/ui/textarea';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XComputedStyle, XDirection, XIsNumber, XJustify, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [XTextareaComponent],
  template: ` <x-textarea></x-textarea> `
})
class XTestTextareaComponent {}

@Component({
  imports: [XTextareaComponent, FormsModule],
  template: `
    <x-textarea
      [(ngModel)]="model"
      [clearable]="clearable()"
      [icon]="icon()"
      [iconLayout]="iconLayout()"
      [iconSpin]="iconSpin()"
      [maxlength]="maxlength()"
      [height]="height()"
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
      [pattern]="pattern()"
      [message]="message()"
      [inputValidator]="inputValidator()"
    ></x-textarea>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestTextareaPropertyComponent {
  model = signal('');
  clearable = signal(false);
  icon = signal('');
  iconLayout = signal<XTextareaIconLayoutType>('right');
  iconSpin = signal(false);
  maxlength = signal<number | null>(null);
  height = signal('6rem');
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
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  inputValidator = signal<((value: any) => boolean) | null>(null);

  clearEmitResult = signal<string | null>(null);
  clearEmit(value: string) {
    this.clearEmitResult.set(value);
  }
}

xdescribe(XTextareaPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTextareaComponent, XTestTextareaPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTextareaPropertyComponent>;
    let component: XTestTextareaPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTextareaPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('clearable.', async () => {
      component.clearable.set(true);
      component.model.set('input text');
      fixture.detectChanges();
      await XSleep(100);
      const clear = fixture.debugElement.query(By.css('.x-textarea-clear'));
      expect(clear).toBeTruthy();
    });
    it('icon.', () => {
      component.icon.set('ado-user');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.x-textarea-icon-in'));
      expect(icon).toBeTruthy();
    });
    it('iconLayout.', () => {
      component.icon.set('ado-user');
      component.iconLayout.set('left');
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('.x-textarea'));
      expect(textarea.nativeElement).toHaveClass('x-textarea-icon-left');
      const icon = fixture.debugElement.query(By.css('.x-textarea-icon-in'));
      expect(icon).toBeTruthy();
    });
    it('iconSpin.', () => {
      component.icon.set('ado-user');
      component.iconSpin.set(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.x-textarea-icon-in'));
      expect(icon.nativeElement).toHaveClass('x-icon-spin');
    });
    it('maxlength.', async () => {
      component.maxlength.set(100);
      fixture.detectChanges();
      const maxlength = fixture.debugElement.query(By.css('.x-textarea-max-length'));
      expect(maxlength).toBeTruthy();
      expect(maxlength.nativeElement.innerText).toBe('0/100');

      component.model.set('hello world!');
      fixture.detectChanges();
      await XSleep(100);
      expect(maxlength.nativeElement.innerText).toBe('12/100');
    });
    it('height.', () => {
      component.height.set('100px');
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('.x-textarea textarea'));
      expect(XComputedStyle(textarea.nativeElement, 'height')).toBe('100');
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
      const textarea = fixture.debugElement.query(By.css('.x-textarea'));
      expect(textarea.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('.x-textarea'));
      expect(textarea.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('.x-textarea'));
      expect(textarea.nativeElement).toHaveClass('x-direction-row');
    });
    it('placeholder.', () => {
      component.placeholder.set('placeholder');
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.getAttribute('placeholder')).toBe('placeholder');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('.x-textarea'));
      expect(textarea.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.required.set(true);
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.required).toBe(true);
    });
    it('readonly.', () => {
      component.readonly.set(true);
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.readOnly).toBe(true);
    });
    it('pattern.', () => {
      component.pattern.set(/^\d+$/);
      const com = fixture.debugElement.query(By.directive(XTextareaComponent));
      const instance = com.componentInstance as XTextareaComponent;
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
      const com = fixture.debugElement.query(By.directive(XTextareaComponent));
      const instance = com.componentInstance as XTextareaComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const message = fixture.debugElement.query(By.css('.x-textarea-error-message'));
      expect(message.nativeElement.innerText).toBe('It must be a number');
    });
    it('inputValidator.', () => {
      component.inputValidator.set((val: string | number) => XIsNumber(val));
      const com = fixture.debugElement.query(By.directive(XTextareaComponent));
      const instance = com.componentInstance as XTextareaComponent;
      // Manually triggering verification, usually triggered by inputting values
      instance.value.set('aa');
      instance.validatorSignal.set(true);
      fixture.detectChanges();
      const borderError = fixture.debugElement.query(By.css('.x-border-error'));
      expect(borderError).toBeDefined();
    });
  });
});
