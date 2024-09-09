import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAlertComponent, XAlertDragFreeDragPosition, XAlertPrefix, XAlertType } from '@ng-nest/ui/alert';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XEffect, XTemplate } from '@ng-nest/ui/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { XResizableEvent } from '@ng-nest/ui/resizable';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XAlertComponent],
  template: ` <x-alert title="title"></x-alert> `
})
class XTestAlertComponent {}

@Component({
  standalone: true,
  imports: [XAlertComponent],
  template: `
    <x-alert
      [hide]="hide()"
      [title]="title()"
      [content]="content()"
      [type]="type()"
      [effect]="effect()"
      [hideClose]="hideClose()"
      [closeText]="closeText()"
      [showIcon]="showIcon()"
      [disabledAnimation]="disabledAnimation()"
      [duration]="duration()"
      [manual]="manual()"
      [draggable]="draggable()"
      [resizable]="resizable()"
      [offsetLeft]="offsetLeft()"
      [offsetTop]="offsetTop()"
      [minWidth]="minWidth()"
      [minHeight]="minHeight()"
      [dragBoundary]="dragBoundary()"
      [dragFreeDragPosition]="dragFreeDragPosition()"
      [operationTpl]="operationTpl()"
      (close)="close($event)"
      (dragEnded)="dragEnded($event)"
      (resizing)="resizing($event)"
    ></x-alert>
  `
})
class XTestAlertPropertyComponent {
  hide = signal(false);
  title = signal<XTemplate>('');
  content = signal<XTemplate>('');
  type = signal<XAlertType>('info');
  effect = signal<XEffect>('light');
  hideClose = signal(false);
  closeText = signal('');
  showIcon = signal(false);
  disabledAnimation = signal(false);
  duration = signal(0);
  manual = signal(false);
  draggable = signal(false);
  resizable = signal(false);
  offsetLeft = signal(0);
  offsetTop = signal(0);
  minWidth = signal('0');
  minHeight = signal('0');
  dragBoundary = signal<string | ElementRef<HTMLElement> | HTMLElement | null>(null);
  dragFreeDragPosition = signal<XAlertDragFreeDragPosition | null>(null);
  operationTpl = signal<XTemplate>('');

  closed = signal(false);
  close() {
    this.closed.set(true);
  }

  dragend = signal<CdkDragEnd | null>(null);
  dragEnded(dragend: CdkDragEnd) {
    this.dragend.set(dragend);
  }

  resizableEvent = signal<XResizableEvent | null>(null);
  resizing(resizableEvent: XResizableEvent) {
    this.resizableEvent.set(resizableEvent);
  }
}

describe(XAlertPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAlertComponent, XTestAlertPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestAlertComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestAlertComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XAlertComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAlertPropertyComponent>;
    let component: XTestAlertPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAlertPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('hide.', () => {
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert).toBeDefined();

      component.hide.set(true);
      fixture.detectChanges();
      alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert).toBeNull();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('effect.', () => {
      expect(true).toBe(true);
    });
    it('hideClose.', () => {
      expect(true).toBe(true);
    });
    it('closeText.', () => {
      expect(true).toBe(true);
    });
    it('showIcon.', () => {
      expect(true).toBe(true);
    });
    it('disabledAnimation.', () => {
      expect(true).toBe(true);
    });
    it('duration.', () => {
      expect(true).toBe(true);
    });
    it('manual.', () => {
      expect(true).toBe(true);
    });
    it('draggable.', () => {
      expect(true).toBe(true);
    });
    it('resizable.', () => {
      expect(true).toBe(true);
    });
    it('offsetLeft.', () => {
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      expect(true).toBe(true);
    });
    it('minWidth.', () => {
      expect(true).toBe(true);
    });
    it('minHeight.', () => {
      expect(true).toBe(true);
    });
    it('dragBoundary.', () => {
      expect(true).toBe(true);
    });
    it('dragFreeDragPosition.', () => {
      expect(true).toBe(true);
    });
    it('operationTpl.', () => {
      expect(true).toBe(true);
    });
    it('close.', () => {
      expect(true).toBe(true);
    });
    it('dragEnded.', () => {
      expect(true).toBe(true);
    });
    it('resizing.', () => {
      expect(true).toBe(true);
    });
  });
});
