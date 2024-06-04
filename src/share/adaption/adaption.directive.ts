import { Directive, ElementRef, OnDestroy, AfterViewInit, Renderer2, inject, input } from '@angular/core';
import { Subject } from 'rxjs';
import { XResize, XResizeObserver } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ns-adaption]',
  standalone: true
})
export class NsAdaptionDirective implements AfterViewInit, OnDestroy {
  outerHeight = input<number>(0);
  outerElement = input<HTMLElement>();
  container = input<HTMLElement>();

  private doc = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;

  ngAfterViewInit() {
    this.setSubject();
  }
  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  setSubject() {
    XResize(this.container()!, this.doc.documentElement)
      .pipe(takeUntil(this.unSubject))
      .subscribe((x) => {
        this.resizeObserver = x.resizeObserver;
        this.setAdaptionHeight();
      });
  }

  setAdaptionHeight() {
    const outerHeight = this.outerElement() ? this.outerElement()!.clientHeight : this.outerHeight();
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${this.doc.documentElement.clientHeight - outerHeight}px`
    );
  }
}
