import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XIconComponent, XIconPrefix } from '@ng-nest/ui/icon';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XIconComponent],
  template: ` <x-icon></x-icon> `
})
class XTestIconComponent {}

@Component({
  standalone: true,
  imports: [XIconComponent],
  template: ` <x-icon> </x-icon> `
})
class XTestIconPropertyComponent {
  href = signal('https://ngnest.com/static/icons/');
  type = signal('');
  color = signal('');
  spin = signal(false);
}

describe(XIconPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestIconComponent, XTestIconPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestIconComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestIconComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XIconComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestIconPropertyComponent>;
    // let component: XTestIconPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestIconPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('href.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('spin.', () => {
      expect(true).toBe(true);
    });
  });
});
