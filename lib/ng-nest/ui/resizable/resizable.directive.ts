import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { XIsArray, XIsString } from '@ng-nest/ui/core';
import { fromEvent, Subscription, takeUntil } from 'rxjs';
import { XResizablePosition, XResizablePrefix, XResizableProperty } from './resizable.property';

@Directive({ selector: '[x-resizable]' })
export class XResizableDirective extends XResizableProperty implements OnInit, OnDestroy {
  document!: Document;
  ele!: HTMLElement;
  allPositions: XResizablePosition[] = ['left', 'right', 'top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end'];
  direction?: XResizablePosition | null;
  newBox = { clientWidth: 0, clientHeight: 0, offsetLeft: 0, offsetTop: 0 };
  mouseUpSub?: Subscription;

  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) doc: any) {
    super();
    this.document = doc;
    this.ele = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.setMapClass();
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  ngOnDestroy() {
    this.destroySubscription();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  mousedown(event: MouseEvent | TouchEvent) {
    const classList = (event.target as HTMLElement).classList;
    let direction: XResizablePosition | null = null;
    for (let pos of this.allPositions) {
      if (classList.contains(`x-resizable-${pos}`)) {
        direction = pos;
        break;
      }
    }
    if (!direction) return;

    const evt = event.type.startsWith('touch') ? (event as TouchEvent).targetTouches[0] : (event as MouseEvent);
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = this.ele;
    const { screenX, screenY } = evt;
    const isTouchEvent = event.type.startsWith('touch');
    const moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
    const upEvent = isTouchEvent ? 'touchend' : 'mouseup';

    this.initResize(event, direction);

    const mouseup = fromEvent(this.document, upEvent);
    this.mouseUpSub = mouseup.subscribe((ev) => {
      this.mouseup(ev as MouseEvent | TouchEvent);
    });
    const mouseMoveSub = fromEvent(document, moveEvent)
      .pipe(takeUntil(mouseup))
      .subscribe((ev) => this.move(ev as MouseEvent | TouchEvent, clientWidth, clientHeight, offsetTop, offsetLeft, screenX, screenY));

    this.mouseUpSub.add(mouseMoveSub);
  }

  setMapClass() {
    this.renderer.addClass(this.ele, XResizablePrefix);
  }

  setPosition() {
    let positions: XResizablePosition[] = [];
    if (XIsString(this.position)) {
      positions.push(this.position as XResizablePosition);
    } else if (XIsArray(this.position)) {
      positions = this.position as XResizablePosition[];
    }

    if (positions.includes('all')) {
      this.createNode(...this.allPositions);
    } else {
      this.createNode(...positions);
    }

    const computedStyle = window.getComputedStyle(this.ele);
    this.minWidth = parseFloat(computedStyle.minWidth);
    this.maxWidth = parseFloat(computedStyle.maxWidth);
    this.minHeight = parseFloat(computedStyle.minHeight);
    this.maxHeight = parseFloat(computedStyle.maxHeight);
  }

  createNode(...classes: XResizablePosition[]) {
    for (let cla of classes) {
      const pos = this.renderer.createElement('div');
      this.renderer.addClass(pos, `x-resizable-${cla}`);
      this.renderer.appendChild(this.ele, pos);
    }
  }

  initResize(event: MouseEvent | TouchEvent, direction: XResizablePosition) {
    this.direction = direction;
    this.renderer.addClass(this.ele, `x-resizable-resizing`);
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = this.ele;
    this.newBox = { clientWidth, clientHeight, offsetLeft, offsetTop };
    event.stopPropagation();
    this.resizeBegin.emit();
  }

  mouseup(event: MouseEvent | TouchEvent) {
    this.endResize(event);
    this.destroySubscription();
  }

  endResize(event: MouseEvent | TouchEvent) {
    const evt = event.type.startsWith('touch') ? (event as TouchEvent).targetTouches[0] : (event as MouseEvent);
    this.direction = null;
    this.renderer.removeClass(this.ele, `x-resizable-resizing`);
    this.resizeEnd.emit({ event: evt, ...this.newBox });
  }

  move(event: MouseEvent | TouchEvent, width: number, height: number, top: number, left: number, screenX: number, screenY: number) {
    const evt = event.type.startsWith('touch') ? (event as TouchEvent).targetTouches[0] : (event as MouseEvent);
    const movementX = evt.screenX - screenX;
    const movementY = evt.screenY - screenY;

    this.newBox = {
      clientWidth: width - (['bottom-start', 'left', 'top-start'].includes(this.direction as string) ? movementX : -movementX),
      clientHeight: height - (['top-start', 'top', 'top-end'].includes(this.direction as string) ? movementY : -movementY),
      offsetLeft: left + movementX,
      offsetTop: top + movementY
    };

    this.resizeWidth(evt);
    this.resizeHeight(evt);
  }

  resizeWidth(event: MouseEvent | Touch): void {
    const overMinWidth = !this.minWidth || this.newBox.clientWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || this.newBox.clientWidth <= this.maxWidth;

    if (['bottom-end', 'right', 'top-end'].includes(this.direction as string)) {
      if (overMinWidth && underMaxWidth) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'width', `${this.newBox.clientWidth}px`);
        }
        this.resizing.emit({ event, clientWidth: this.newBox.clientWidth });
      }
    }
    if (['bottom-start', 'left', 'top-start'].includes(this.direction as string)) {
      if (overMinWidth && underMaxWidth) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'left', `${this.newBox.offsetLeft}px`);
          this.renderer.setStyle(this.ele, 'width', `${this.newBox.clientWidth}px`);
        }
        this.resizing.emit({ event, clientWidth: this.newBox.clientWidth, offsetLeft: this.newBox.offsetLeft });
      }
    }
  }

  resizeHeight(event: MouseEvent | Touch): void {
    const overMinHeight = !this.minHeight || this.newBox.clientHeight >= this.minHeight;
    const underMaxHeight = !this.maxHeight || this.newBox.clientHeight <= this.maxHeight;
    if (['bottom-end', 'bottom', 'bottom-start'].includes(this.direction as string)) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'height', `${this.newBox.clientHeight}px`);
        }
        this.resizing.emit({ event, clientHeight: this.newBox.clientHeight });
      }
    }

    if (['top-start', 'top', 'top-end'].includes(this.direction as string)) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'top', `${this.newBox.offsetTop}px`);
          this.renderer.setStyle(this.ele, 'height', `${this.newBox.clientHeight}px`);
        }
        this.resizing.emit({ event, offsetTop: this.newBox.offsetTop, clientHeight: this.newBox.clientHeight });
      }
    }
  }

  private destroySubscription() {
    if (this.mouseUpSub) {
      this.mouseUpSub.unsubscribe();
      this.mouseUpSub = undefined;
    }
  }
}
