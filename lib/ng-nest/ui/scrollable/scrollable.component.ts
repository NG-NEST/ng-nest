import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  viewChild,
  signal,
  input,
  output
} from '@angular/core';

type DragAxis = 'x' | 'y';

@Component({
  selector: 'x-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XScrollableComponent implements AfterViewInit, OnDestroy {
  yOffsetTop = input(0);
  yOffsetBottom = input(0);
  yOffsetLeft = input(0);
  yOffsetRight = input(0);

  xOffsetTop = input(0);
  xOffsetBottom = input(0);
  xOffsetLeft = input(0);
  xOffsetRight = input(0);

  maxHeight = input('100%');
  maxWidth = input('100%');

  resizeChange = output<ResizeObserverEntry>();
  scrollChange = output<Event>();

  private contentRef = viewChild.required<ElementRef<HTMLElement>>('content');

  private trackXRef = viewChild.required<ElementRef<HTMLElement>>('trackX');
  private thumbXRef = viewChild.required<ElementRef<HTMLElement>>('thumbX');
  private trackYRef = viewChild.required<ElementRef<HTMLElement>>('trackY');
  private thumbYRef = viewChild.required<ElementRef<HTMLElement>>('thumbY');

  isActive = signal(false);

  isAtTop = signal(false);
  isAtBottom = signal(false);
  isAtLeft = signal(false);
  isAtRight = signal(false);

  hasVerticalScrollbar = signal(false);
  hasHorizontalScrollbar = signal(false);

  private isDragging = false;
  private dragAxis: DragAxis | null = null;
  private dragStart = { x: 0, y: 0 };
  private initialScroll = { left: 0, top: 0 };
  private resizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;
  private scrollListener!: () => void;

  private unlistenMouseMove!: () => void;
  private unlistenMouseUp!: () => void;

  private resizeTimeoutId: number | null = null;
  private mutationTimeoutId: number | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.updateScrollbars(), 0);

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.contentRef().nativeElement) {
          if (this.resizeTimeoutId !== null) {
            window.clearTimeout(this.resizeTimeoutId);
          }

          this.resizeTimeoutId = window.setTimeout(() => {
            this.updateScrollbars();
            if (entry && entry.borderBoxSize && entry.borderBoxSize.length > 0) {
              this.resizeChange.emit(entry);
            }
          }, 16);
        }
      }
    });

    this.resizeObserver.observe(this.contentRef().nativeElement, { box: 'border-box' });

    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;

      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate) {
        if (this.mutationTimeoutId !== null) {
          window.clearTimeout(this.mutationTimeoutId);
        }

        this.mutationTimeoutId = window.setTimeout(() => {
          this.updateScrollbars();
        }, 16);
      }
    });

    this.mutationObserver.observe(this.contentRef().nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    this.scrollListener = this.renderer.listen(this.contentRef().nativeElement, 'scroll', (event: Event) => {
      this.updateScrollbars(true, event);
    });
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.scrollListener) {
      this.scrollListener();
    }

    if (this.resizeTimeoutId !== null) {
      window.clearTimeout(this.resizeTimeoutId);
    }

    if (this.mutationTimeoutId !== null) {
      window.clearTimeout(this.mutationTimeoutId);
    }
  }

  updateScrollbars(scroll = false, event?: Event): void {
    this.updateVerticalScrollbar();
    this.updateHorizontalScrollbar();
    if (scroll && event) {
      this.scrollChange.emit(event);
    }
  }

  private updateVerticalScrollbar(): void {
    const thumbY = this.thumbYRef().nativeElement;
    const trackY = this.trackYRef().nativeElement;
    const content = this.contentRef().nativeElement;
    let { clientHeight, scrollHeight, scrollTop } = content;
    this.isAtTop.set(scrollTop === 0);
    this.isAtBottom.set(scrollTop + clientHeight >= scrollHeight);
    this.hasVerticalScrollbar.set(scrollHeight > clientHeight);

    if (this.yOffsetTop() !== 0 && this.yOffsetBottom() === 0) {
      this.renderer.setStyle(trackY, 'top', `${this.yOffsetTop()}px`);
      this.renderer.setStyle(trackY, 'height', `calc(100% - ${this.yOffsetTop()}px)`);
      clientHeight -= this.yOffsetTop();
      scrollHeight -= this.yOffsetTop();
    } else if (this.yOffsetTop() === 0 && this.yOffsetBottom() !== 0) {
      this.renderer.setStyle(trackY, 'height', `calc(100% - ${this.yOffsetBottom()}px)`);
      clientHeight -= this.yOffsetBottom();
      scrollHeight -= this.yOffsetBottom();
    } else if (this.yOffsetTop() !== 0 && this.yOffsetBottom() !== 0) {
      this.renderer.setStyle(trackY, 'top', `${this.yOffsetTop()}px`);
      this.renderer.setStyle(trackY, 'height', `calc(100% - ${this.yOffsetTop() + this.yOffsetBottom()}px)`);
      clientHeight -= this.yOffsetTop() + this.yOffsetBottom();
      scrollHeight -= this.yOffsetTop() + this.yOffsetBottom();
    }
    if (this.yOffsetLeft() !== 0) {
      this.renderer.setStyle(trackY, 'left', `${this.yOffsetLeft()}px`);
    }
    if (this.yOffsetRight() !== 0) {
      this.renderer.setStyle(trackY, 'right', `${this.yOffsetRight()}px`);
    }

    let visibleRatioY = clientHeight / scrollHeight;

    if (visibleRatioY > 0.99 && visibleRatioY < 1) {
      visibleRatioY = 1;
    }

    if (visibleRatioY >= 1) {
      this.renderer.setStyle(trackY, 'display', 'none');
    } else {
      this.renderer.setStyle(trackY, 'display', 'block');
      const thumbHeight = Math.max(visibleRatioY * clientHeight, 20);
      this.renderer.setStyle(thumbY, 'height', `${thumbHeight}px`);
      const maxThumbTop = clientHeight - thumbHeight;
      const thumbTop = Math.min((scrollTop / (scrollHeight - clientHeight)) * maxThumbTop, maxThumbTop);
      this.renderer.setStyle(thumbY, 'transform', `translateY(${thumbTop}px)`);
    }
  }

  private updateHorizontalScrollbar(): void {
    const content = this.contentRef().nativeElement;
    const thumbX = this.thumbXRef().nativeElement;
    const trackX = this.trackXRef().nativeElement;
    let { clientWidth, scrollWidth, scrollLeft } = content;
    this.isAtLeft.set(scrollLeft === 0);
    this.isAtRight.set(scrollLeft + clientWidth >= scrollWidth);
    this.hasHorizontalScrollbar.set(scrollWidth > clientWidth);

    if (this.xOffsetLeft() !== 0 && this.xOffsetRight() === 0) {
      this.renderer.setStyle(trackX, 'left', `${this.xOffsetLeft()}px`);
      this.renderer.setStyle(trackX, 'width', `calc(100% - ${this.xOffsetLeft()}px)`);
      clientWidth -= this.xOffsetLeft();
      scrollWidth -= this.xOffsetLeft();
    } else if (this.xOffsetLeft() === 0 && this.xOffsetRight() !== 0) {
      this.renderer.setStyle(trackX, 'width', `calc(100% - ${this.xOffsetRight()}px)`);
      clientWidth -= this.xOffsetRight();
      scrollWidth -= this.xOffsetRight();
    } else if (this.xOffsetLeft() !== 0 && this.xOffsetRight() !== 0) {
      this.renderer.setStyle(trackX, 'left', `${this.xOffsetLeft()}px`);
      this.renderer.setStyle(trackX, 'width', `calc(100% - ${this.xOffsetLeft() + this.xOffsetRight()}px)`);
      clientWidth -= this.xOffsetLeft() + this.xOffsetRight();
      scrollWidth -= this.xOffsetLeft() + this.xOffsetRight();
    }
    if (this.xOffsetTop() !== 0) {
      this.renderer.setStyle(trackX, 'top', `${this.xOffsetTop()}px`);
    }
    if (this.xOffsetBottom() !== 0) {
      this.renderer.setStyle(trackX, 'bottom', `${this.xOffsetBottom()}px`);
    }

    const visibleRatioX = clientWidth / scrollWidth;

    if (visibleRatioX >= 1) {
      this.renderer.setStyle(trackX, 'display', 'none');
    } else {
      this.renderer.setStyle(trackX, 'display', 'block');
      const thumbWidth = Math.max(visibleRatioX * clientWidth, 20);
      this.renderer.setStyle(thumbX, 'width', `${thumbWidth}px`);
      const maxThumbLeft = clientWidth - thumbWidth;
      const thumbLeft = Math.min((scrollLeft / (scrollWidth - clientWidth)) * maxThumbLeft, maxThumbLeft);
      this.renderer.setStyle(thumbX, 'transform', `translateX(${thumbLeft}px)`);
    }
  }

  startDrag(event: MouseEvent, axis: DragAxis): void {
    this.isDragging = true;
    this.dragAxis = axis;
    event.preventDefault();

    this.dragStart = { x: event.pageX, y: event.pageY };
    this.initialScroll = {
      left: this.contentRef().nativeElement.scrollLeft,
      top: this.contentRef().nativeElement.scrollTop
    };

    this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e) => this.onDrag(e));
    this.unlistenMouseUp = this.renderer.listen('document', 'mouseup', () => this.stopDrag());
  }

  private onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;

    const content = this.contentRef().nativeElement;
    let { scrollHeight, clientHeight, scrollWidth, clientWidth } = content;
    if (this.dragAxis === 'y') {
      if (this.yOffsetTop() !== 0 && this.yOffsetBottom() === 0) {
        clientHeight -= this.yOffsetTop();
        scrollHeight -= this.yOffsetTop();
      } else if (this.yOffsetTop() === 0 && this.yOffsetBottom() !== 0) {
        clientHeight -= this.yOffsetBottom();
        scrollHeight -= this.yOffsetBottom();
      } else if (this.yOffsetTop() !== 0 && this.yOffsetBottom() !== 0) {
        clientHeight -= this.yOffsetTop() + this.yOffsetBottom();
        scrollHeight -= this.yOffsetTop() + this.yOffsetBottom();
      }

      const mouseDeltaY = event.pageY - this.dragStart.y;
      const scrollRatio = scrollHeight / clientHeight;
      content.scrollTop = this.initialScroll.top + mouseDeltaY * scrollRatio;
    } else if (this.dragAxis === 'x') {
      if (this.xOffsetLeft() !== 0 && this.xOffsetRight() === 0) {
        clientWidth -= this.xOffsetLeft();
        scrollWidth -= this.xOffsetLeft();
      } else if (this.xOffsetLeft() === 0 && this.xOffsetRight() !== 0) {
        clientWidth -= this.xOffsetRight();
        scrollWidth -= this.xOffsetRight();
      } else if (this.xOffsetLeft() !== 0 && this.xOffsetRight() !== 0) {
        clientWidth -= this.xOffsetLeft() + this.xOffsetRight();
        scrollWidth -= this.xOffsetLeft() + this.xOffsetRight();
      }

      const mouseDeltaX = event.pageX - this.dragStart.x;
      const scrollRatio = scrollWidth / clientWidth;
      content.scrollLeft = this.initialScroll.left + mouseDeltaX * scrollRatio;
    }
  }

  private stopDrag(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.dragAxis = null;
      this.unlistenMouseMove();
      this.unlistenMouseUp();
    }
  }

  onHostEnter(): void {
    this.isActive.set(true);
    this.updateScrollbars();
  }

  onHostLeave(): void {
    if (!this.isDragging) {
      this.isActive.set(false);
    }
  }
}
