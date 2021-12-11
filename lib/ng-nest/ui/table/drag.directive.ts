import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[xDrag]' })
export class XDragDirective {
  @Output() draging = new EventEmitter<{ x: number; y: number }>();
  private _unSubject = new Subject<void>();
  doc: Document;

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) document: any, private renderer: Renderer2) {
    this.doc = document;
  }

  ngOnInit() {
    const mouseDown = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');

    mouseDown.subscribe((downMe: MouseEvent) => {
      let x = downMe.pageX;
      let y = downMe.pageY;
      let offsetX = 0;
      let offsetY = 0;
      const _unSub = new Subject<void>();
      this.renderer.setStyle(this.doc.documentElement, 'cursor', 'ew-resize');
      this.renderer.setStyle(this.doc.documentElement, 'user-select', 'none');
      fromEvent<MouseEvent>(this.doc.documentElement, 'mousemove')
        .pipe(takeUntil(_unSub))
        .subscribe((moveMe: MouseEvent) => {
          offsetX = moveMe.pageX - x;
          offsetY = moveMe.pageY - y;
          x = moveMe.pageX;
          y = moveMe.pageY;
          this.draging.emit({ x: offsetX, y: offsetY });
        });
      fromEvent<MouseEvent>(this.doc.documentElement, 'mouseup')
        .pipe(takeUntil(_unSub))
        .subscribe(() => {
          this.renderer.removeStyle(this.doc.documentElement, 'cursor');
          this.renderer.removeStyle(this.doc.documentElement, 'user-select');
          _unSub.next();
          _unSub.complete();
        });
    });

    // fromEvent(this.elementRef.nativeElement, 'mousedown')
    //   .pipe(
    //     tap((mouse: MouseEvent) => {
    //       return { startX: mouse.clientX, startY: mouse.clientY };
    //     }),
    //     tap((x) => {
    //       fromEvent(this.elementRef.nativeElement, 'mousemove').pipe()
    //     }),
    //     takeUntil(this._unSubject)
    //   )
    //   .subscribe((x) => {
    //     console.log(x);
    //   });
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }
}
