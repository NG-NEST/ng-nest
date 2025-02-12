import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCheckboxComponent, XCheckboxNode, XCheckboxPrefix } from '@ng-nest/ui/checkbox';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XSleep, XTemplate } from '@ng-nest/ui/core';
import { XButtonType } from '@ng-nest/ui/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'x-test-checkbox',
  imports: [XCheckboxComponent],
  template: ` <x-checkbox></x-checkbox> `
})
class XTestCheckboxComponent {}

@Component({
  selector: 'x-test-checkbox-property',
  imports: [FormsModule, XCheckboxComponent],
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
      [(ngModel)]="value"
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

  value = signal<string | boolean | null>(null);
}

xdescribe(XCheckboxPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCheckboxComponent, XTestCheckboxPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCheckboxPropertyComponent>;
    let component: XTestCheckboxPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCheckboxPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement.innerText).toBe('aa\nbb');
    });
    it('button.', () => {
      component.data.set(['aa', 'bb']);
      component.button.set(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.css('x-buttons'));
      expect(buttons).toBeTruthy();
    });
    it('icon.', () => {
      component.data.set(['aa', 'bb']);
      component.icon.set(true);
      fixture.detectChanges();
      const buttons = fixture.debugElement.query(By.css('x-buttons'));
      expect(buttons).toBeTruthy();
    });
    it('tag.', () => {
      component.data.set(['aa', 'bb']);
      component.tag.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('x-tag'));
      expect(tag).toBeTruthy();
    });
    it('indeterminate.', () => {
      component.data.set(['aa', 'bb']);
      component.indeterminate.set(true);
      fixture.detectChanges();
      const item = fixture.debugElement.query(By.css('.x-checkbox-row-item'));
      expect(item.nativeElement).toHaveClass('x-indeterminate');
    });
    it('type.', () => {
      component.data.set(['aa', 'bb']);
      component.button.set(true);
      component.type.set('danger');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.x-button'));
      expect(button.nativeElement).toHaveClass('x-button-danger-plain');
    });
    it('tagBordered.', () => {
      component.data.set(['aa', 'bb']);
      component.tag.set(true);
      component.tagBordered.set(false);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).not.toHaveClass('x-tag-bordered');
    });
    it('tagDark.', () => {
      component.data.set(['aa', 'bb']);
      component.tag.set(true);
      component.tagDark.set(true);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-tag'));
      expect(tag.nativeElement).toHaveClass('x-tag-dark');
    });
    it('single.', () => {
      component.data.set(['aa']);
      component.single.set(true);
      fixture.detectChanges();
      const item = fixture.debugElement.query(By.css('.x-checkbox-row-item'));
      item.nativeElement.dispatchEvent(new Event('click'));
      expect(component.value()).toBe(true);
      item.nativeElement.dispatchEvent(new Event('click'));
      expect(component.value()).toBe(false);
    });
    it('vertical.', () => {
      component.data.set(['aa', 'bb']);
      component.vertical.set(true);
      fixture.detectChanges();
      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-checkbox-vertical');
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
    it('disabled click.', () => {
      component.data.set(['aa', 'bb']);
      component.disabled.set(true);
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.x-checkbox-row-item'));
      item.nativeElement.click();

      const checkbox = fixture.debugElement.query(By.css('.x-checkbox'));
      expect(checkbox.nativeElement).toHaveClass('x-disabled');
    });
    it('checkbox click.', async () => {
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.x-checkbox-row-item'));
      for (let item of items) {
        item.nativeElement.click();
      }
      fixture.detectChanges();
      await XSleep(100);
      items[1].nativeElement.click();

      expect(component.value()?.toString()).toBe('aa');
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
