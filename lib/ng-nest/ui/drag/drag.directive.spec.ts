import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDragDirective, XDragDistance, XDragDistanceOffset, XDragPrefix } from '@ng-nest/ui/drag';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XDragDirective],
  template: ` <div x-drag>drag</div> `
})
class XTestDragComponent {}

@Component({
  imports: [XDragDirective],
  template: `
    <div x-drag (dragStarted)="dragStarted($event)" (dragMoved)="dragMoved($event)" (dragEnded)="dragEnded($event)">
      drag
    </div>
  `
})
class XTestDragPropertyComponent {
  dragStartedResult = signal<XDragDistance | null>(null);
  dragStarted(distance: XDragDistance) {
    this.dragStartedResult.set(distance);
  }

  dragMovedResult = signal<XDragDistanceOffset | null>(null);
  dragMoved(distance: XDragDistanceOffset) {
    this.dragMovedResult.set(distance);
  }

  dragEndedResult = signal<XDragDistance | null>(null);
  dragEnded(distance: XDragDistance) {
    this.dragEndedResult.set(distance);
  }
}

xdescribe(XDragPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDragComponent, XTestDragPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestDragComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDragComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDragDirective));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDragPropertyComponent>;
    let component: XTestDragPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDragPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('dragStarted.', () => {
      const com = fixture.debugElement.query(By.directive(XDragDirective));
      com.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      fixture.detectChanges();
      expect(component.dragStartedResult()).not.toBe(null);
      com.nativeElement.dispatchEvent(new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true }));
    });
    it('dragMoved.', () => {
      const com = fixture.debugElement.query(By.directive(XDragDirective));
      com.nativeElement.dispatchEvent(new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true }));
      fixture.detectChanges();
      com.nativeElement.dispatchEvent(
        new MouseEvent('mousemove', { view: window, bubbles: true, cancelable: true, clientX: 100, clientY: 100 })
      );
      fixture.detectChanges();
      expect(component.dragMovedResult()).not.toBe(null);
      com.nativeElement.dispatchEvent(new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true }));
    });
    it('dragEnded.', () => {
      const com = fixture.debugElement.query(By.directive(XDragDirective));
      com.nativeElement.dispatchEvent(new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true }));
      fixture.detectChanges();
      com.nativeElement.dispatchEvent(
        new MouseEvent('mousemove', { view: window, bubbles: true, cancelable: true, clientX: 100, clientY: 100 })
      );
      fixture.detectChanges();
      com.nativeElement.dispatchEvent(new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true }));
      expect(component.dragEndedResult()).not.toBe(null);
    });
  });
});
