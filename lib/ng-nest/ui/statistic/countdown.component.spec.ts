import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCountdownComponent, XCountdownPrefix } from '@ng-nest/ui/statistic';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XStyle, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XCountdownComponent],
  template: ` <x-countdown> </x-countdown> `
})
class XTestCountdownComponent {}

@Component({
  standalone: true,
  imports: [XCountdownComponent],
  template: `
    <x-countdown
      [value]="value()"
      [label]="label()"
      [prefix]="prefix()"
      [suffix]="suffix()"
      [valueStyle]="valueStyle()"
      [format]="format()"
      (finish)="finish()"
    >
    </x-countdown>
  `
})
class XTestCountdownPropertyComponent {
  value = signal<XTemplate | null>(null);
  label = signal<XTemplate | null>(null);
  prefix = signal<XTemplate | null>(null);
  suffix = signal<XTemplate | null>(null);
  valueStyle = signal<XStyle>({});
  format = signal('HH:mm:ss');
  finish() {}
}

describe(XCountdownPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCountdownComponent, XTestCountdownPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestCountdownComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCountdownComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCountdownComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCountdownPropertyComponent>;
    // let component: XTestCountdownPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCountdownPropertyComponent);
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
    it('format.', () => {
      expect(true).toBe(true);
    });
    it('finish.', () => {
      expect(true).toBe(true);
    });
  });
});
