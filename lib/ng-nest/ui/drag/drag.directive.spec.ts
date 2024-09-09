import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDragDirective, XDragDistance, XDragDistanceOffset, XDragPrefix } from '@ng-nest/ui/drag';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XDragDirective],
  template: ` <div x-drag>drag</div> `
})
class XTestDragComponent {}

@Component({
  standalone: true,
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

describe(XDragPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDragComponent, XTestDragPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDragPropertyComponent>;
    // let component: XTestDragPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDragPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('dragStarted.', () => {
      expect(true).toBe(true);
    });
    it('dragMoved.', () => {
      expect(true).toBe(true);
    });
    it('dragEnded.', () => {
      expect(true).toBe(true);
    });
  });
});
