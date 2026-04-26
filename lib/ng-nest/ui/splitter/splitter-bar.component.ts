import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, ElementRef, output, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, takeUntil } from 'rxjs';
import { XSplitterBarPrefix } from './splitter.property';

/**
 * Splitter Bar
 * @selector x-splitter-bar
 * @decorator component
 */
@Component({
  selector: `${XSplitterBarPrefix}`,
  template: '',
  styleUrls: ['./splitter-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterBarComponent {
  @HostBinding('class') className = XSplitterBarPrefix;

  /**
   * @zh_CN 拖动开始事件
   * @en_US Drag start event
   */
  readonly dragStart = output<MouseEvent>();

  /**
   * @zh_CN 拖动中事件
   * @en_US Dragging event
   */
  readonly dragging = output<MouseEvent>();

  /**
   * @zh_CN 拖动结束事件
   * @en_US Drag end event
   */
  readonly dragEnd = output<MouseEvent>();

  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    this.initDrag();
  }

  private initDrag() {
    const element = this.elementRef.nativeElement;

    element.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.dragStart.emit(event);

      const mouseMoveSub = fromEvent(this.document, 'mousemove')
        .pipe(takeUntil(fromEvent(this.document, 'mouseup')))
        .subscribe((moveEvent: Event) => {
          this.dragging.emit(moveEvent as MouseEvent);
        });

      fromEvent(this.document, 'mouseup').subscribe((upEvent: Event) => {
        this.dragEnd.emit(upEvent as MouseEvent);
        mouseMoveSub.unsubscribe();
      });
    });
  }
}
