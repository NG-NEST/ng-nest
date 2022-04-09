import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { XIsArray, XIsString } from '@ng-nest/ui/core';
import { fromEvent, Subscription, takeUntil } from 'rxjs';
import { XResizablePosition, XResizablePrefix, XResizableProperty } from './resizable.property';

@Directive({ selector: '[xResizable]' })
export class XResizableDirective extends XResizableProperty implements OnInit, OnDestroy {
  document!: Document;
  ele!: HTMLElement;
  cornerPositions: XResizablePosition[] = ['top-start', 'top-end', 'bottom-start', 'bottom-end'];
  allPositions: XResizablePosition[] = ['left', 'right', 'top', 'bottom', ...this.cornerPositions];
  positions: XResizablePosition[] = [];
  direction?: XResizablePosition | null;
  newBox = { clientWidth: 0, clientHeight: 0, offsetLeft: 0, offsetTop: 0 };
  mouseUpSub?: Subscription;

  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;

  positionNodes: { [key: string]: HTMLElement } = {};
  activatingNodes: HTMLElement[] = [];

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
    if (!this.xResizable) return;
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

    this.setActivatingNodes(direction);
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
    if (!this.xResizable) return;
    let positions: XResizablePosition[] = [];
    if (XIsString(this.position)) {
      positions.push(this.position as XResizablePosition);
    } else if (XIsArray(this.position)) {
      positions = this.position as XResizablePosition[];
    }

    if (positions.includes('all')) {
      this.positions = this.allPositions;
    } else {
      this.positions = positions;
    }
    this.createNode(...this.positions);

    const computedStyle = window.getComputedStyle(this.ele);
    this.minWidth = parseFloat(computedStyle.minWidth);
    this.maxWidth = parseFloat(computedStyle.maxWidth);
    this.minHeight = parseFloat(computedStyle.minHeight);
    this.maxHeight = parseFloat(computedStyle.maxHeight);
  }

  setActivatingNodes(direction: XResizablePosition) {
    if (!this.positions.includes(direction)) return;
    const addActivatingNode = (...direction: XResizablePosition[]) => {
      for (let item of direction) {
        const nd = this.positionNodes[item];
        const isNd = this.activatingNodes.includes(nd);
        if (!nd || isNd) continue;
        this.renderer.addClass(nd, 'x-resizable-activating');
        this.activatingNodes.push(nd);
      }
    };
    if (this.cornerPositions.includes(direction)) {
      switch (direction) {
        case 'bottom-end':
          addActivatingNode('bottom', 'right');
          break;
        case 'top-end':
          addActivatingNode('top', 'right');
          break;
        case 'bottom-start':
          addActivatingNode('bottom', 'left');
          break;
        case 'top-start':
          addActivatingNode('top', 'left');
          break;
      }
    }
    addActivatingNode(direction);
  }

  createNode(...classes: XResizablePosition[]) {
    for (let cla of classes) {
      const pos = this.renderer.createElement('div');
      this.renderer.addClass(pos, `x-resizable-${cla}`);
      this.renderer.appendChild(this.ele, pos);
      this.positionNodes[cla] = pos;
    }
  }

  initResize(event: MouseEvent | TouchEvent, direction: XResizablePosition) {
    this.direction = direction;
    this.renderer.addClass(this.ele, `x-resizable-resizing`);
    let { clientWidth, clientHeight, offsetLeft, offsetTop } = this.ele;
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
    for (const node of this.activatingNodes) {
      this.renderer.removeClass(node, 'x-resizable-activating');
    }
    this.activatingNodes = [];
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

    const box = {
      ...this.newBox,
      offsetLeft: this.newBox.offsetLeft - Number(this.offsetLeft),
      offsetTop: this.newBox.offsetTop - Number(this.offsetTop)
    };

    this.resizeWidth(box);
    this.resizeHeight(box);

    this.resizing.emit({ ...this.newBox, event: evt });
  }

  resizeWidth(box: { clientWidth: number; clientHeight: number; offsetLeft: number; offsetTop: number }): void {
    const overMinWidth = !this.minWidth || box.clientWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || box.clientWidth <= this.maxWidth;

    if (['bottom-end', 'right', 'top-end'].includes(this.direction as string)) {
      if (overMinWidth && underMaxWidth) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
      }
    }
    if (['bottom-start', 'left', 'top-start'].includes(this.direction as string)) {
      if (overMinWidth && underMaxWidth) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'left', `${box.offsetLeft}px`);
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
      }
    }
  }

  resizeHeight(box: { clientWidth: number; clientHeight: number; offsetLeft: number; offsetTop: number }): void {
    const overMinHeight = !this.minHeight || box.clientHeight >= this.minHeight;
    const underMaxHeight = !this.maxHeight || box.clientHeight <= this.maxHeight;
    if (['bottom-end', 'bottom', 'bottom-start'].includes(this.direction as string)) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
      }
    }

    if (['top-start', 'top', 'top-end'].includes(this.direction as string)) {
      if (overMinHeight && underMaxHeight) {
        if (!this.ghost) {
          this.renderer.setStyle(this.ele, 'top', `${box.offsetTop}px`);
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
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
