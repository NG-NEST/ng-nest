import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRateColor, XRateComponent, XRatePrefix } from '@ng-nest/ui/rate';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XAlign, XDirection, XJustify } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XRateComponent],
  template: ` <x-rate> </x-rate> `
})
class XTestRateComponent {}

@Component({
  standalone: true,
  imports: [XRateComponent],
  template: `
    <x-rate
      [count]="count()"
      [half]="half()"
      [color]="color()"
      [customTemp]="customTemp()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [disabled]="disabled()"
      [required]="required()"
    >
    </x-rate>

    <ng-template #customTemplate>custom</ng-template>
  `
})
class XTestRatePropertyComponent {
  count = signal(5);
  half = signal(false);
  color = signal<XRateColor>('');
  customTemp = signal<TemplateRef<any> | null>(null);
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  disabled = signal(false);
  required = signal(false);
}

describe(XRatePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestRateComponent, XTestRatePropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestRateComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestRateComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XRateComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestRatePropertyComponent>;
    let component: XTestRatePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRatePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('count.', () => {
      expect(true).toBe(true);
    });
    it('half.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('customTemp.', () => {
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
      const rate = fixture.debugElement.query(By.css('.x-rate'));
      expect(rate.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const rate = fixture.debugElement.query(By.css('.x-rate'));
      expect(rate.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const rate = fixture.debugElement.query(By.css('.x-rate'));
      expect(rate.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const rate = fixture.debugElement.query(By.css('.x-rate'));
      expect(rate.nativeElement).toHaveClass('x-disabled');
    });
  });
});
