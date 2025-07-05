import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { XDragProperty } from './drag.property';

@Directive({ selector: '[x-drag]' })
export class XDragDirective extends XDragProperty implements OnInit, OnDestroy {
  private unSubject = new Subject<void>();
  private doc = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const mouseDown = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(takeUntil(this.unSubject));
    mouseDown.subscribe((downMe: MouseEvent) => {
      downMe.stopPropagation();
      let x = downMe.pageX;
      let y = downMe.pageY;
      let offsetX = 0;
      let offsetY = 0;
      const _unSub = new Subject<void>();
      this.renderer.setStyle(this.doc.documentElement, 'cursor', 'ew-resize');
      this.renderer.setStyle(this.doc.documentElement, 'user-select', 'none');
      this.dragStarted.emit({ x, y });
      fromEvent<MouseEvent>(this.doc.documentElement, 'mousemove')
        .pipe(takeUntil(_unSub))
        .subscribe((moveMe: MouseEvent) => {
          moveMe.stopPropagation();
          offsetX = moveMe.pageX - x;
          offsetY = moveMe.pageY - y;
          x = moveMe.pageX;
          y = moveMe.pageY;

          this.dragMoved.emit({ x, y, offsetX, offsetY });
        });
      fromEvent<MouseEvent>(this.doc.documentElement, 'mouseup')
        .pipe(takeUntil(_unSub))
        .subscribe(() => {
          this.renderer.removeStyle(this.doc.documentElement, 'cursor');
          this.renderer.removeStyle(this.doc.documentElement, 'user-select');
          this.dragEnded.emit({ x, y });
          _unSub.next();
          _unSub.complete();
        });
    });
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }
}
