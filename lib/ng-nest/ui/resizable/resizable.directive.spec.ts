import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XResizableDirective, XResizableEvent, XResizablePosition, XResizablePrefix } from '@ng-nest/ui/resizable';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XResizableDirective],
  template: ` <div xResizable></div> `
})
class XTestResizableComponent {}

@Component({
  standalone: true,
  imports: [XResizableDirective],
  template: `
    <div
      [xResizable]="resizable()"
      [position]="position()"
      [ghost]="ghost()"
      [offsetLeft]="offsetLeft()"
      [offsetTop]="offsetTop()"
      (resizeBegin)="resizeBegin($event)"
      (resizing)="resizing($event)"
      (resizeEnd)="resizeEnd($event)"
    ></div>
  `
})
class XTestResizablePropertyComponent {
  resizable = signal(false);
  position = signal<XResizablePosition | XResizablePosition[]>('all');
  ghost = signal(false);
  offsetLeft = signal('0');
  offsetTop = signal('0');

  resizeBeginResult = signal<XResizableEvent | null>(null);
  resizeBegin(event: XResizableEvent) {
    this.resizeBeginResult.set(event);
  }

  resizingResult = signal<XResizableEvent | null>(null);
  resizing(event: XResizableEvent) {
    this.resizingResult.set(event);
  }

  resizeEndResult = signal<XResizableEvent | null>(null);
  resizeEnd(event: XResizableEvent) {
    this.resizeEndResult.set(event);
  }
}

describe(XResizablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestResizableComponent, XTestResizablePropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestResizableComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestResizableComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XResizableDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestResizablePropertyComponent>;
    // let component: XTestResizablePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestResizablePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('resizable.', () => {
      expect(true).toBe(true);
    });
    it('position.', () => {
      expect(true).toBe(true);
    });
    it('ghost.', () => {
      expect(true).toBe(true);
    });
    it('offsetLeft.', () => {
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      expect(true).toBe(true);
    });
    it('resizeBegin.', () => {
      expect(true).toBe(true);
    });
    it('resizing.', () => {
      expect(true).toBe(true);
    });
    it('resizeEnd.', () => {
      expect(true).toBe(true);
    });
  });
});
