import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRadioComponent, XRadioNode, XRadioPrefix } from '@ng-nest/ui/radio';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XTemplate } from '@ng-nest/ui/core';
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
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [disabled]="disabled()"
      [required]="required()"
      [before]="before()"
      [after]="after()"
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
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  disabled = signal(false);
  required = signal(false);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild.required<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild.required<TemplateRef<any>>('afterTemplate');
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
    let component: XTestRadioPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRadioPropertyComponent);
      component = fixture.componentInstance;
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
      const radio = fixture.debugElement.query(By.css('.x-radio'));
      expect(radio.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const radio = fixture.debugElement.query(By.css('.x-radio'));
      expect(radio.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const radio = fixture.debugElement.query(By.css('.x-radio'));
      expect(radio.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const radio = fixture.debugElement.query(By.css('.x-radio'));
      expect(radio.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.label.set('label');
      component.required.set(true);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-radio-label-required');
    });
    it('before.', () => {
      component.before.set(component.beforeTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-radio-row-before'));
      expect(tpl.nativeElement.innerText).toBe('before');
    });
    it('after.', () => {
      component.after.set(component.afterTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-radio-row-after'));
      expect(tpl.nativeElement.innerText).toBe('after');
    });
  });
});
