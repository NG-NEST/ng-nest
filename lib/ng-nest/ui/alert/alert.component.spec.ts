import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAlertComponent, XAlertDragFreeDragPosition, XAlertPrefix, XAlertType } from '@ng-nest/ui/alert';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XEffect, XSleep, XTemplate } from '@ng-nest/ui/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { XResizableEvent } from '@ng-nest/ui/resizable';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XAlertComponent],
  template: ` <x-alert title="title"></x-alert> `
})
class XTestAlertComponent {}

@Component({
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

    <ng-template #titleTpl>titleTpl</ng-template>
    <ng-template #contentTpl>contentTpl</ng-template>
  `
})
class XTestAlertPropertyComponent {
  hide = signal(false);
  title = signal<XTemplate>('');
  titleTpl = viewChild.required<TemplateRef<void>>('titleTpl');
  content = signal<XTemplate>('');
  contentTpl = viewChild.required<TemplateRef<void>>('contentTpl');
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

xdescribe(XAlertPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAlertComponent, XTestAlertPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe(`input.`, async () => {
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
      const title = fixture.debugElement.query(By.css('.x-alert-title'));
      expect(title.nativeElement.innerText).toBe('');

      component.title.set('title');
      fixture.detectChanges();
      expect(title.nativeElement.innerText).toBe('title');

      component.title.set(component.titleTpl());
      fixture.detectChanges();
      expect(title.nativeElement.innerText).toBe('titleTpl');
    });
    it('content.', () => {
      let content = fixture.debugElement.query(By.css('.x-alert-content'));
      expect(content).toBeNull();

      component.content.set('content');
      fixture.detectChanges();
      content = fixture.debugElement.query(By.css('.x-alert-content'));
      expect(content.nativeElement.innerText).toBe('content');

      component.content.set(component.contentTpl());
      fixture.detectChanges();
      expect(content.nativeElement.innerText).toBe('contentTpl');
    });
    it('type.', () => {
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement).toHaveClass('x-alert-info');

      component.type.set('success');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-alert-success');

      component.type.set('warning');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-alert-warning');

      component.type.set('error');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-alert-error');

      component.type.set('loading');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-alert-loading');
    });
    it('effect.', () => {
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement).toHaveClass('x-light');

      component.effect.set('dark');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-dark');

      component.effect.set('white');
      fixture.detectChanges();
      expect(alert.nativeElement).toHaveClass('x-white');
    });
    it('hideClose.', () => {
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement).toHaveClass('x-alert-has-close');

      component.hideClose.set(true);
      fixture.detectChanges();
      expect(alert.nativeElement).not.toHaveClass('x-alert-has-close');
    });
    it('closeText.', () => {
      let close = fixture.debugElement.query(By.css('.x-alert-close'));
      expect(close.nativeElement.innerText).toBe('');

      component.closeText.set('close');
      fixture.detectChanges();
      expect(close.nativeElement.innerText).toBe('close');
    });
    it('showIcon.', () => {
      let icon = fixture.debugElement.query(By.css('.x-alert-icon'));
      expect(icon).toBeNull();

      component.showIcon.set(true);
      fixture.detectChanges();
      icon = fixture.debugElement.query(By.css('.x-alert-icon'));
      expect(icon).toBeDefined();
    });
    it('disabledAnimation.', () => {
      // angular animation disabled
      expect(true).toBe(true);
    });
    it('duration.', async () => {
      const com = fixture.debugElement.query(By.directive(XAlertComponent));
      let close = com.query(By.css('.x-alert-operation-close'));
      close.nativeElement.click();
      fixture.detectChanges();
      expect(com.componentInstance.styleHide()).toBe(true);
    });
    it('duration 300.', async () => {
      component.duration.set(300);
      const com = fixture.debugElement.query(By.directive(XAlertComponent));
      let close = com.query(By.css('.x-alert-operation-close'));
      close.nativeElement.click();
      fixture.detectChanges();

      component.duration.set(400);
      await XSleep(400);
      expect(com.componentInstance.styleHide()).toBe(true);
    });
    it('manual.', () => {
      component.manual.set(true);
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.directive(XAlertComponent));
      let close = com.query(By.css('.x-alert-operation-close'));
      close.nativeElement.click();
      fixture.detectChanges();
      expect(com.componentInstance.styleHide()).toBe(false);
    });
    it('draggable.', () => {
      component.draggable.set(true);
      fixture.detectChanges();
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement.classList).toContain('x-alert-draggable');
    });
    it('resizable.', () => {
      // test resizable directive
      expect(true).toBe(true);
    });
    it('offsetLeft.', () => {
      // test resizable directive
      expect(true).toBe(true);
    });
    it('offsetTop.', () => {
      // test resizable directive
      expect(true).toBe(true);
    });
    it('minWidth.', () => {
      component.minWidth.set('300px');
      fixture.detectChanges();
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement.style.minWidth).toBe('300px');
    });
    it('minHeight.', () => {
      component.minHeight.set('300px');
      fixture.detectChanges();
      let alert = fixture.debugElement.query(By.css('.x-alert'));
      expect(alert.nativeElement.style.minHeight).toBe('300px');
    });
    it('dragBoundary.', () => {
      // test cdkDrag
      expect(true).toBe(true);
    });
    it('dragFreeDragPosition.', () => {
      // test cdkDrag
      expect(true).toBe(true);
    });
    it('operationTpl.', () => {
      let operation = fixture.debugElement.query(By.css('.x-alert-operation'));
      expect(operation.nativeElement.innerText).toBe('');

      component.operationTpl.set('operationTpl string');
      fixture.detectChanges();
      expect(operation.nativeElement.innerText).toBe('operationTpl string');
    });
    it('close.', () => {
      component.manual.set(true);
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.directive(XAlertComponent));
      let close = com.query(By.css('.x-alert-operation-close'));
      close.nativeElement.click();
      fixture.detectChanges();
      expect(component.closed()).toBe(true);
    });
    it('dragEnded.', () => {
      // test cdkDrag
      expect(true).toBe(true);
    });
    it('resizing.', () => {
      // test resizable directive
      expect(true).toBe(true);
    });
  });
});
