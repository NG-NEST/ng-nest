import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCheckboxComponent, XCheckboxNode, XCheckboxPrefix } from '@ng-nest/ui/checkbox';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XTemplate } from '@ng-nest/ui/core';
import { XButtonType } from '@ng-nest/ui/button';

@Component({
  standalone: true,
  imports: [XCheckboxComponent],
  template: ` <x-checkbox></x-checkbox> `
})
class XTestCheckboxComponent {}

@Component({
  standalone: true,
  imports: [XCheckboxComponent],
  template: `
    <x-checkbox
      [data]="data()"
      [button]="button()"
      [icon]="icon()"
      [tag]="tag()"
      [indeterminate]="indeterminate()"
      [type]="type()"
      [tagBordered]="tagBordered()"
      [tagDark]="tagDark()"
      [single]="single()"
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
    </x-checkbox>

    <ng-template #beforeTemplate>before</ng-template>
    <ng-template #afterTemplate>after</ng-template>
  `
})
class XTestCheckboxPropertyComponent {
  data = signal<XData<XCheckboxNode>>([]);
  button = signal(false);
  icon = signal(false);
  tag = signal(false);
  indeterminate = signal(false);
  type = signal<XButtonType>('initial');
  tagBordered = signal(true);
  tagDark = signal(false);
  single = signal(false);
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

describe(XCheckboxPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCheckboxComponent, XTestCheckboxPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestCheckboxComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCheckboxComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCheckboxComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCheckboxPropertyComponent>;
    let component: XTestCheckboxPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCheckboxPropertyComponent);
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
    it('indeterminate.', () => {
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
    it('single.', () => {
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
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-disabled');
    });
    it('before.', () => {
      component.before.set(component.beforeTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-checkbox-row-before'));
      expect(tpl.nativeElement.innerText).toBe('before');
    });
    it('after.', () => {
      component.after.set(component.afterTemplate());
      fixture.detectChanges();
      const tpl = fixture.debugElement.query(By.css('.x-checkbox-row-after'));
      expect(tpl.nativeElement.innerText).toBe('after');
    });
  });
});
