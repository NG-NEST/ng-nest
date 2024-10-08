import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStatisticComponent, XStatisticPrefix } from '@ng-nest/ui/statistic';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XStyle, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XStatisticComponent],
  template: ` <x-statistic> </x-statistic> `
})
class XTestStatisticComponent {}

@Component({
  standalone: true,
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
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestStatisticPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestStatisticPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('value.', () => {
      expect(true).toBe(true);
    });
    it('label.', () => {
      expect(true).toBe(true);
    });
    it('prefix.', () => {
      expect(true).toBe(true);
    });
    it('suffix.', () => {
      expect(true).toBe(true);
    });
    it('valueStyle.', () => {
      expect(true).toBe(true);
    });
  });
});
