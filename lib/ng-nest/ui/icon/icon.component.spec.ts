import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XIconComponent } from './icon.component';
import { XIconPrefix } from './icon.property';

@Component({
  selector: 'test-icon',
  standalone: true,
  imports: [XIconComponent],
  template: `<x-icon type="fto-user"></x-icon>`
})
class XTestIconComponent {}

@Component({
  selector: 'test-icon-property',
  standalone: true,
  imports: [XIconComponent],
  template: `<x-icon [type]="type()" [color]="color()" [spin]="spin()"></x-icon>`
})
class XTestIconPropertyComponent {
  type = signal('fto-user');
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
    let icon: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestIconComponent);
      icon = fixture.debugElement.query(By.directive(XIconComponent));
      fixture.detectChanges();
    });
    it('define.', () => {
      expect(icon).toBeDefined();
    });
    it('property.', () => {
      expect(icon.nativeElement).toHaveClass('x-icon');
      expect(icon.nativeElement).toHaveClass('fto-user');
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestIconPropertyComponent>;
    let component: XTestIconPropertyComponent;
    let icon: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestIconPropertyComponent);
      component = fixture.componentInstance;
      icon = fixture.debugElement.query(By.directive(XIconComponent));
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(icon.nativeElement).toHaveClass('fto-user');

      component.type.set('fto-x');
      fixture.detectChanges();
      expect(icon.nativeElement).toHaveClass('fto-x');
    });
    it('color.', () => {
      expect(icon.nativeElement.style.color).toBe('');

      component.color.set('rgb(255, 0, 0)');
      fixture.detectChanges();
      expect(icon.nativeElement.style.color).toBe('rgb(255, 0, 0)');
    });
    it('spin.', () => {
      expect(icon.nativeElement).not.toHaveClass('x-icon-spin');

      component.spin.set(true);
      fixture.detectChanges();
      expect(icon.nativeElement).toHaveClass('x-icon-spin');
    });
  });
});
