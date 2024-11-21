import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRadioComponent, XRadioNode, XRadioPrefix } from '@ng-nest/ui/radio';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XData, XDirection, XJustify, XTemplate } from '@ng-nest/ui/core';
import { XButtonType } from '@ng-nest/ui/button';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XRadioComponent],
  template: ` <x-radio> </x-radio> `
})
class XTestRadioComponent {}

@Component({
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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const items = fixture.debugElement.queryAll(By.css('.x-radio-row-item'));
      expect(items.length).toBe(2);
    });
    it('button.', () => {
      component.button.set(true);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('.x-radio-row-list x-button'));
      expect(buttons.length).toBe(2);
    });
    it('icon.', () => {
      component.icon.set(true);
      component.data.set([
        { label: 'aa', icon: 'ado-qq' },
        { label: 'bb', icon: 'ado-wechat' }
      ]);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('.x-radio-row-list .x-button'));
      for (let button of buttons) {
        expect(button.nativeElement).toHaveClass('x-button-icon');
      }
    });
    it('tag.', () => {
      component.tag.set(true);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const tags = fixture.debugElement.queryAll(By.css('.x-radio-row-list x-tag'));
      expect(tags.length).toBe(2);
    });
    it('type.', () => {
      component.button.set(true);
      component.type.set('danger');
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('.x-radio-row-list .x-button'));
      for (let button of buttons) {
        expect(button.nativeElement).toHaveClass('x-button-danger-plain');
      }
    });
    it('tagBordered.', () => {
      component.tag.set(true);
      component.tagBordered.set(false);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const tags = fixture.debugElement.queryAll(By.css('.x-radio-row-list .x-tag'));
      for (let tag of tags) {
        expect(tag.nativeElement).not.toHaveClass('x-tag-bordered');
      }
    });
    it('tagDark.', () => {
      component.tag.set(true);
      component.tagDark.set(true);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const tags = fixture.debugElement.queryAll(By.css('.x-radio-row-list .x-tag'));
      for (let tag of tags) {
        expect(tag.nativeElement).toHaveClass('x-tag-dark');
      }
    });
    it('allowCancel.', async () => {
      component.tag.set(true);
      component.allowCancel.set(true);
      component.data.set(['aa', 'bb']);
      fixture.detectChanges();
      const tag = fixture.debugElement.query(By.css('.x-radio-row-list .x-tag')).nativeElement;
      tag.click();
      fixture.detectChanges();
      expect(tag).toHaveClass('x-tag-selected');
      tag.click();
      fixture.detectChanges();
      expect(tag).not.toHaveClass('x-tag-selected');
    });
    it('vertical.', () => {
      component.data.set(['aa', 'bb']);
      component.vertical.set(true);
      fixture.detectChanges();
      const radio = fixture.debugElement.query(By.css('.x-radio')).nativeElement;
      expect(radio).toHaveClass('x-radio-vertical');
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
