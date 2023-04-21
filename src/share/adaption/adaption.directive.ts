import { Directive, ElementRef, OnDestroy, Input, AfterViewInit, Renderer2, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { XResize, XResizeObserver } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ns-adaption]'
})
export class NsAdaptionDirective implements AfterViewInit, OnDestroy {
  @Input() outerHeight: number = 0;
  @Input() outerElement!: HTMLElement;
  @Input() container!: HTMLElement;

  private doc = inject(DOCUMENT);
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setSubject();
  }
  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  setSubject() {
    XResize(this.container, this.doc.documentElement)
      .pipe(takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.setAdaptionHeight();
      });
  }

  setAdaptionHeight() {
    const outerHeight = this.outerElement ? this.outerElement.clientHeight : this.outerHeight;
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.doc.documentElement.clientHeight - outerHeight}px`);
  }
}
