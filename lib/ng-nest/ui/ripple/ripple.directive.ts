import { OnInit, Renderer2, ElementRef, Directive } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { XRipplePrefix, XRippleProperty } from './ripple.property';

@Directive({
  selector: '[x-ripple]'
})
export class XRippleDirective extends XRippleProperty implements OnInit {
  duration = 500;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    if (this.disabled) return;
    fromEvent(this.elementRef.nativeElement, 'mousedown').subscribe((event: MouseEvent) => {
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
      ripple.style.transitionDuration = `${this.duration}ms`;
      this.renderer.appendChild(this.elementRef.nativeElement, ripple);
      this.enforceStyleRecalculation(ripple);
      ripple.style.transform = 'scale(1)';

      of(true)
        .pipe(
          delay(this.duration),
          tap(() => {
            ripple.style.opacity = '0';
          }),
          delay(this.duration / 2),
          tap(() => {
            this.renderer.removeChild(this.elementRef.nativeElement, ripple);
          })
        )
        .subscribe();
    });
    this.setClassMap();
  }

  setClassMap() {
    this.renderer.addClass(this.elementRef.nativeElement, XRipplePrefix);
    this.renderer.addClass(this.elementRef.nativeElement, `${XRipplePrefix}-${this.type}`);
  }

  distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

  enforceStyleRecalculation(element: HTMLElement) {
    window.getComputedStyle(element).getPropertyValue('opacity');
  }
}
