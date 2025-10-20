import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSwitchComponent, XSwitchPrefix } from '@ng-nest/ui/switch';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XSize, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [XSwitchComponent],
  template: ` <x-switch></x-switch> `
})
class XTestSwitchComponent {}

@Component({
  imports: [XSwitchComponent, FormsModule],
  template: `
    <x-switch
      [(ngModel)]="value"
      [loading]="loading()"
      [manual]="manual()"
      [checkedText]="checkedText()"
      [unCheckedText]="unCheckedText()"
      [size]="size()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [disabled]="disabled()"
      [required]="required()"
    ></x-switch>
  `
})
class XTestSwitchPropertyComponent {
  value = signal(false);
  loading = signal(false);
  manual = signal(false);
  checkedText = signal<XTemplate | null>(null);
  unCheckedText = signal<XTemplate | null>(null);
  size = signal<XSize>('medium');
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  disabled = signal(false);
  required = signal(false);
}

xdescribe(XSwitchPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSwitchComponent, XTestSwitchPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestSwitchComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSwitchComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSwitchComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSwitchPropertyComponent>;
    let component: XTestSwitchPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSwitchPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('loading.', async () => {
      component.loading.set(true);
      component.value.set(true);
      fixture.detectChanges();
      const st = fixture.debugElement.query(By.css('.x-switch'));
      expect(st.nativeElement).toHaveClass('x-switch-loading');
      await XSleep(300);
      component.loading.set(false);
      fixture.detectChanges();
      expect(st.nativeElement).not.toHaveClass('x-switch-loading');
    });
    it('manual.', async () => {
      const st = fixture.debugElement.query(By.css('.x-switch')).nativeElement;
      const slider = fixture.debugElement.query(By.css('.x-switch-slider')).nativeElement;
      slider.click();
      fixture.detectChanges();
      expect(st).toHaveClass('x-checked');
      slider.click();
      fixture.detectChanges();
      expect(st).not.toHaveClass('x-checked');

      component.manual.set(true);
      fixture.detectChanges();
      slider.click();
      fixture.detectChanges();
      expect(st).not.toHaveClass('x-checked');

      component.value.set(true);
      fixture.detectChanges();
      await XSleep(100);
      expect(st).toHaveClass('x-checked');
    });
    it('checkedText.', async () => {
      component.value.set(true);
      component.checkedText.set('yes');
      fixture.detectChanges();
      await XSleep(100);
      const text = fixture.debugElement.query(By.css('.x-switch-text')).nativeElement;
      expect(text.innerText).toBe('yes');
    });
    it('unCheckedText.', () => {
      component.unCheckedText.set('no');
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-switch-text')).nativeElement;
      expect(text.innerText).toBe('no');
    });
    it('size.', () => {
      const input = fixture.debugElement.query(By.css('.x-switch'));
      expect(input.nativeElement).toHaveClass('x-switch-medium');
      component.size.set('large');
      fixture.detectChanges();
      expect(input.nativeElement).toHaveClass('x-switch-large');
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
      const sw = fixture.debugElement.query(By.css('.x-switch'));
      expect(sw.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const sw = fixture.debugElement.query(By.css('.x-switch'));
      expect(sw.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const sw = fixture.debugElement.query(By.css('.x-switch'));
      expect(sw.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const sw = fixture.debugElement.query(By.css('.x-switch'));
      expect(sw.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.label.set('label');
      component.required.set(true);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-switch-label-required');
    });
  });
});
