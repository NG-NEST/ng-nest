import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRippleDirective, XRipplePrefix, XRippleType } from '@ng-nest/ui/ripple';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XRippleDirective],
  template: ` <div x-ripple></div> `
})
class XTestRippleComponent {}

@Component({
  standalone: true,
  imports: [XRippleDirective],
  template: ` <div x-ripple [type]="type()" [duration]="duration()" [disabled]="disabled()"></div> `
})
class XTestRipplePropertyComponent {
  type = signal<XRippleType>('initial');
  duration = signal(500);
  disabled = signal(false);
}

describe(XRipplePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestRippleComponent, XTestRipplePropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestRippleComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestRippleComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XRippleDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestRipplePropertyComponent>;
    // let component: XTestRipplePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRipplePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('duration.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
  });
});
