import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  viewChild,
  signal
} from '@angular/core';

type DragAxis = 'x' | 'y';

@Component({
  selector: 'x-scrollable',
  templateUrl: './scrollable.html',
  styleUrls: ['./scrollable.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XScrollableComponent implements AfterViewInit, OnDestroy {
  private contentRef = viewChild.required<ElementRef<HTMLElement>>('content');

  private trackXRef = viewChild.required<ElementRef<HTMLElement>>('trackX');
  private thumbXRef = viewChild.required<ElementRef<HTMLElement>>('thumbX');
  private trackYRef = viewChild.required<ElementRef<HTMLElement>>('trackY');
  private thumbYRef = viewChild.required<ElementRef<HTMLElement>>('thumbY');

  isActive = signal(false);

  private isDragging = false;
  private dragAxis: DragAxis | null = null;
  private dragStart = { x: 0, y: 0 };
  private initialScroll = { left: 0, top: 0 };
  private resizeObserver!: ResizeObserver;

  private unlistenMouseMove!: () => void;
  private unlistenMouseUp!: () => void;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.updateScrollbars(), 0);

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollbars();
    });
    this.resizeObserver.observe(this.contentRef().nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateScrollbars(): void {
    this.updateVerticalScrollbar();
    this.updateHorizontalScrollbar();
  }

  private updateVerticalScrollbar(): void {
    const content = this.contentRef().nativeElement;
    const thumbY = this.thumbYRef().nativeElement;
    const trackY = this.trackYRef().nativeElement;
    const visibleRatioY = content.clientHeight / content.scrollHeight;

    if (visibleRatioY >= 1) {
      this.renderer.setStyle(trackY, 'display', 'none');
    } else {
      this.renderer.setStyle(trackY, 'display', 'block');
      const thumbHeight = Math.max(visibleRatioY * content.clientHeight, 20);
      this.renderer.setStyle(thumbY, 'height', `${thumbHeight}px`);

      const thumbTop = (content.scrollTop / content.scrollHeight) * content.clientHeight;
      this.renderer.setStyle(thumbY, 'transform', `translateY(${thumbTop}px)`);
    }
  }

  private updateHorizontalScrollbar(): void {
    const content = this.contentRef().nativeElement;
    const thumbX = this.thumbXRef().nativeElement;
    const trackX = this.trackXRef().nativeElement;
    const visibleRatioX = content.clientWidth / content.scrollWidth;

    if (visibleRatioX >= 1) {
      this.renderer.setStyle(trackX, 'display', 'none');
    } else {
      this.renderer.setStyle(trackX, 'display', 'block');
      const thumbWidth = Math.max(visibleRatioX * content.clientWidth, 20);
      this.renderer.setStyle(thumbX, 'width', `${thumbWidth}px`);

      const thumbLeft = (content.scrollLeft / content.scrollWidth) * content.clientWidth;
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

    if (this.dragAxis === 'y') {
      const mouseDeltaY = event.pageY - this.dragStart.y;
      const scrollRatio = content.scrollHeight / content.clientHeight;
      content.scrollTop = this.initialScroll.top + mouseDeltaY * scrollRatio;
    } else if (this.dragAxis === 'x') {
      const mouseDeltaX = event.pageX - this.dragStart.x;
      const scrollRatio = content.scrollWidth / content.clientWidth;
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
