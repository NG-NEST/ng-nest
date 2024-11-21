import {
  Renderer2,
  ElementRef,
  Directive,
  OnDestroy,
  inject,
  HostBinding,
  ChangeDetectorRef,
  effect
} from '@angular/core';
import { delay, fromEvent, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { XRipplePrefix, XRippleProperty } from './ripple.property';
import { XComputed } from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: `[${XRipplePrefix}]`
})
export class XRippleDirective extends XRippleProperty implements OnDestroy {
  @HostBinding('class') get className() {
    return `${XRipplePrefix} ${XRipplePrefix}-${this.type()}`;
  }

  private unsub = new Subject<void>();
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private document = inject(DOCUMENT);
  downEvent: Subscription | null = null;
  upEvent: Subscription | null = null;

  constructor() {
    super();
    effect(() => {
      if (this.disabled()) {
        this.downEvent?.unsubscribe();
        this.upEvent?.unsubscribe();
      } else {
        this.downEvent?.unsubscribe();
        this.upEvent?.unsubscribe();
        this.setEvent();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }

  setEvent() {
    this.downEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown')
      .pipe(takeUntil(this.unsub))
      .subscribe((event) => {
        const eleRect = this.elementRef.nativeElement.getBoundingClientRect();
        const radius = this.distanceToFurthestCorner(event.x, event.y, eleRect);
        const offsetX = event.x - eleRect.left;
        const offsetY = event.y - eleRect.top;
        const ripple = this.renderer.createElement('div');
        this.renderer.addClass(ripple, 'x-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        ripple.style.transitionDuration = `${this.duration()}ms`;
        this.renderer.appendChild(this.elementRef.nativeElement, ripple);
        this.enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0.3';
        const downTime = new Date().getTime();

        this.upEvent = fromEvent<MouseEvent>(this.document.documentElement, 'mouseup')
          .pipe(takeUntil(this.unsub))
          .subscribe(() => {
            const upTime = new Date().getTime();
            of(true)
              .pipe(
                delay(upTime - downTime > this.duration() ? 0 : this.duration() - (upTime - downTime)),
                tap(() => {
                  if (this.renderer.parentNode(ripple)) {
                    this.renderer.removeChild(this.elementRef.nativeElement, ripple);
                  }
                  // TODO: use zoneless, renderer removeChild will not take effect immediately
                  this.cdr.markForCheck();
                  this.upEvent?.unsubscribe();
                }),
                takeUntil(this.unsub)
              )
              .subscribe();
          });
      });
  }

  distanceToFurthestCorner(x: number, y: number, rect: DOMRect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

  enforceStyleRecalculation(element: HTMLElement) {
    XComputed(element).getPropertyValue('opacity');
  }
}
