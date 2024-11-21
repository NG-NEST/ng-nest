import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStatisticComponent, XStatisticPrefix } from '@ng-nest/ui/statistic';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XSleep, XStyle, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XStatisticComponent],
  template: ` <x-statistic> </x-statistic> `
})
class XTestStatisticComponent {}

@Component({
  imports: [XStatisticComponent],
  template: `
    <x-statistic
      [value]="value()"
      [label]="label()"
      [prefix]="prefix()"
      [suffix]="suffix()"
      [valueStyle]="valueStyle()"
    >
    </x-statistic>
  `
})
class XTestStatisticPropertyComponent {
  value = signal<XTemplate | null>(null);
  label = signal<XTemplate | null>(null);
  prefix = signal<XTemplate | null>(null);
  suffix = signal<XTemplate | null>(null);
  valueStyle = signal<XStyle>({});
}

describe(XStatisticPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestStatisticComponent, XTestStatisticPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestStatisticComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestStatisticComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XStatisticComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestStatisticPropertyComponent>;
    let component: XTestStatisticPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestStatisticPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('value.', async () => {
      component.value.set('99.99');
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-statistic-value'));
      expect(value.nativeElement.innerText).toBe('99.99');
    });
    it('label.', () => {
      component.label.set('Label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.x-statistic-label'));
      expect(label.nativeElement.innerText).toBe('Label');
    });
    it('prefix.', () => {
      component.value.set('99.99');
      component.prefix.set('Time');
      fixture.detectChanges();
      const prefix = fixture.debugElement.query(By.css('.x-statistic-value-prefix'));
      expect(prefix.nativeElement.innerText).toBe('Time');
    });
    it('suffix.', () => {
      component.value.set('99.99');
      component.suffix.set('*');
      fixture.detectChanges();
      const suffix = fixture.debugElement.query(By.css('.x-statistic-value-suffix'));
      expect(suffix.nativeElement.innerText).toBe('*');
    });
    it('valueStyle.', async () => {
      component.value.set('99.99');
      component.valueStyle.set({ color: 'rgb(0, 255, 0)' });
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-statistic-value'));
      expect(value.nativeElement.style.color).toBe('rgb(0, 255, 0)');
    });
  });
});
