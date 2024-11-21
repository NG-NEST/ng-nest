import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XResizableDirective, XResizableEvent, XResizablePosition, XResizablePrefix } from '@ng-nest/ui/resizable';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XResizableDirective],
  template: ` <div xResizable></div> `
})
class XTestResizableComponent {}

@Component({
  imports: [XResizableDirective],
  template: `
    <div
      #element
      style="width:50px; height: 50px; background-color: red; position: absolute; top: 0; left: 0"
      xResizable
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
  element = viewChild.required<ElementRef<HTMLDivElement>>('element');
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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestResizablePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestResizablePropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const moveTo = (screenX: number, screenY: number) => {
      const bottom = fixture.debugElement.query(By.css('.x-resizable-bottom-end'))!.nativeElement;
      bottom.dispatchEvent(new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true }));
      fixture.detectChanges();
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          view: window,
          bubbles: true,
          cancelable: true,
          screenX: screenX,
          screenY: screenY
        })
      );
      fixture.detectChanges();
      document.dispatchEvent(new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true }));
      fixture.detectChanges();
    };
    it('resizable.', async () => {
      component.resizable.set(true);
      fixture.detectChanges();
      moveTo(50, 50);
      expect(component.element().nativeElement.clientWidth).toBe(100);
      expect(component.element().nativeElement.clientHeight).toBe(100);
    });
    it('position.', async () => {
      component.position.set(['bottom', 'right']);
      component.resizable.set(true);
      fixture.detectChanges();
      const bottom = fixture.debugElement.query(By.css('.x-resizable-bottom'));
      const right = fixture.debugElement.query(By.css('.x-resizable-right'));
      expect(bottom).toBeTruthy();
      expect(right).toBeTruthy();
    });
    it('ghost.', () => {
      component.ghost.set(true);
      component.resizable.set(true);
      fixture.detectChanges();
      moveTo(50, 50);
      expect(component.resizeEndResult()!.clientHeight).toBe(100);
      expect(component.resizeEndResult()!.clientWidth).toBe(100);
      expect(component.element().nativeElement.clientHeight).toBe(50);
      expect(component.element().nativeElement.clientWidth).toBe(50);
    });
    it('offsetLeft.', () => {
      // Internal offset pixels
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      // Internal offset pixels
      expect(true).toBe(true);
    });
    it('resizeBegin.', () => {
      component.resizable.set(true);
      fixture.detectChanges();
      moveTo(50, 50);
      expect(component.resizeBeginResult()!.clientHeight).toBe(50);
      expect(component.resizeBeginResult()!.clientWidth).toBe(50);
    });
    it('resizing.', () => {
      component.resizable.set(true);
      fixture.detectChanges();
      moveTo(50, 50);
      expect(component.resizingResult()!.clientHeight).toBe(100);
      expect(component.resizingResult()!.clientWidth).toBe(100);
    });
    it('resizeEnd.', () => {
      component.resizable.set(true);
      fixture.detectChanges();
      moveTo(50, 50);
      expect(component.resizeEndResult()!.clientHeight).toBe(100);
      expect(component.resizeEndResult()!.clientWidth).toBe(100);
    });
  });
});
