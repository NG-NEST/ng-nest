import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRippleDirective, XRipplePrefix, XRippleType } from '@ng-nest/ui/ripple';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XSleep } from '@ng-nest/ui/core';

@Component({
  imports: [XRippleDirective],
  template: ` <div x-ripple></div> `
})
class XTestRippleComponent {}

@Component({
  imports: [XRippleDirective],
  template: `
    <div
      #rippleRef
      style="width: 100px; height: 100px; background: #f00; position: absolute; left: 0; top: 0;"
      x-ripple
      [type]="type()"
      [duration]="duration()"
      [disabled]="disabled()"
    ></div>
  `
})
class XTestRipplePropertyComponent {
  rippleRef = viewChild.required<ElementRef<HTMLDivElement>>('rippleRef');
  type = signal<XRippleType>('initial');
  duration = signal(500);
  disabled = signal(false);
}

xdescribe(XRipplePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestRippleComponent, XTestRipplePropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestRipplePropertyComponent>;
    let component: XTestRipplePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestRipplePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('type.', () => {
      component.type.set('primary');
      fixture.detectChanges();
      expect(component.rippleRef().nativeElement).toHaveClass('x-ripple-primary');
    });
    it('duration.', async () => {
      component.type.set('primary');
      fixture.detectChanges();
      component.rippleRef().nativeElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
      fixture.detectChanges();
      document.documentElement.dispatchEvent(
        new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true })
      );
      fixture.detectChanges();
      let rippleElement = fixture.debugElement.query(By.css('.x-ripple-element'));
      expect(rippleElement).toBeTruthy();
      await XSleep(600);
      rippleElement = fixture.debugElement.query(By.css('.x-ripple-element'));
      expect(rippleElement).toBeFalsy();
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      component.rippleRef().nativeElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 50, clientY: 50 }));
      fixture.detectChanges();
      document.documentElement.dispatchEvent(
        new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true })
      );
      fixture.detectChanges();
      let rippleElement = fixture.debugElement.query(By.css('.x-ripple-element'));
      expect(rippleElement).toBeFalsy();
    });
  });
});
