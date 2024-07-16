import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  inject
} from '@angular/core';
import { XComputed, XIsArray, XIsChange, XIsString } from '@ng-nest/ui/core';
import { fromEvent, Subscription, takeUntil } from 'rxjs';
import { XResizablePosition, XResizablePrefix, XResizableProperty } from './resizable.property';

@Directive({ selector: '[xResizable]' })
export class XResizableDirective extends XResizableProperty implements OnInit, OnDestroy {
  @HostBinding('class.x-resizable-disabled') get getDisabled() {
    return !this.xResizable;
  }
  document = inject(DOCUMENT);
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

  firstLoaded = true;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
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

  ngOnChanges(changes: SimpleChanges) {
    const { xResizable } = changes;
    XIsChange(xResizable) && this.setPosition();
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
    if (!this.xResizable || !this.firstLoaded) return;
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

    const computedStyle = XComputed(this.ele);
    setTimeout(() => {
      this.minWidth = parseFloat(computedStyle.minWidth);
      this.maxWidth = parseFloat(computedStyle.maxWidth);
      this.minHeight = parseFloat(computedStyle.minHeight);
      this.maxHeight = parseFloat(computedStyle.maxHeight);
      this.firstLoaded = false;
    });
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

    this.resizeBox(box);

    this.resizing.emit({ ...this.newBox, event: evt, direction: this.direction });
  }

  resizeBox(box: { clientWidth: number; clientHeight: number; offsetLeft: number; offsetTop: number }) {
    if (this.ghost) return;
    const overMinWidth = !this.minWidth || box.clientWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || box.clientWidth <= this.maxWidth;
    const overMinHeight = !this.minHeight || box.clientHeight >= this.minHeight;
    const underMaxHeight = !this.maxHeight || box.clientHeight <= this.maxHeight;

    switch (this.direction) {
      case 'right':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        break;
      case 'top-end':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'top', `${box.offsetTop}px`);
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
      case 'bottom-end':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
      case 'bottom-start':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'left', `${box.offsetLeft}px`);
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
      case 'left':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'left', `${box.offsetLeft}px`);
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        break;
      case 'top-start':
        if (overMinWidth && underMaxWidth) {
          this.renderer.setStyle(this.ele, 'left', `${box.offsetLeft}px`);
          this.renderer.setStyle(this.ele, 'width', `${box.clientWidth}px`);
        }
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'top', `${box.offsetTop}px`);
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
      case 'top':
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'top', `${box.offsetTop}px`);
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
      case 'bottom':
        if (overMinHeight && underMaxHeight) {
          this.renderer.setStyle(this.ele, 'height', `${box.clientHeight}px`);
        }
        break;
    }
  }

  private destroySubscription() {
    if (this.mouseUpSub) {
      this.mouseUpSub.unsubscribe();
      this.mouseUpSub = undefined;
    }
  }
}
