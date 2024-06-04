import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  inject,
  computed,
  signal,
  viewChild
} from '@angular/core';
import { XSliderPrefix, XSliderNode, XSliderProperty } from './slider.property';
import { XResize, XPosition, XIsUndefined, XIsEmpty, XResizeObserver } from '@ng-nest/ui/core';
import { Subject, of } from 'rxjs';
import { takeUntil, debounceTime, delay } from 'rxjs/operators';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@Component({
  selector: `${XSliderPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, NgTemplateOutlet, XLinkComponent, XButtonComponent, XOutletDirective, XDropdownComponent],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSliderComponent extends XSliderProperty implements OnDestroy, AfterViewInit {
  sliderScroll = viewChild.required('sliderScroll', { read: ElementRef<HTMLElement> });
  sliderNodes = viewChild.required('sliderNodes', { read: ElementRef<HTMLElement> });
  activated = signal<XSliderNode | null>(null);
  showArrow = signal(false);
  activatedId = signal('');
  timeoutHide: any;
  hoverDelay = 200;
  hoverDelayUnsub = new Subject<void>();
  offset = signal(0);
  transform = computed(() => `translate${this.dir()}(-${this.offset()}px)`);

  direction = signal<XPosition>('right');
  maxOffset = signal(0);
  dir = computed(() => (this.layout() === 'row' ? 'X' : 'Y'));
  sizeName = computed(() => (this.layout() === 'row' ? 'Width' : 'Height'));
  highlightBox = computed(() => {
    this.resizeChanged();
    if (!this.activated()) return {};
    const activeEle: HTMLElement = this.sliderNodes().nativeElement.querySelector(
      `li:nth-child(${this.activatedIndex() + 1})`
    )!;
    if (!activeEle) return {};
    return {
      width: `${activeEle.offsetWidth}px`,
      height: `${activeEle.offsetHeight}px`,
      left: `${activeEle.offsetLeft}px`,
      top: `${activeEle.offsetTop}px`
    };
  });
  resizeChanged = signal<DOMRectReadOnly | null>(null);
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  elementRef = inject(ElementRef);

  classMap = computed(() => ({
    [`${XSliderPrefix}-${this.layout()}`]: !XIsEmpty(this.layout()),
    [`${XSliderPrefix}-show-arrow`]: this.showArrow()
  }));
  scrollClassMap = computed(() => ({
    [`x-justify-${this.justify()}`]: !XIsEmpty(this.justify())
  }));
  nodeClassMap = computed(() => ({
    [`x-justify-${this.nodeJustify()}`]: !XIsEmpty(this.nodeJustify()),
    [`x-size-${this.size()}`]: !XIsEmpty(this.size())
  }));

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
    this.hoverDelayUnsub.next();
    this.hoverDelayUnsub.complete();
  }

  ngAfterViewInit(): void {
    this.setSubscribe();
    this.setActivated();
  }

  setSubscribe() {
    XResize(this.sliderScroll().nativeElement, this.sliderNodes().nativeElement)
      .pipe(debounceTime(30), takeUntil(this.unSubject))
      .subscribe((x) => {
        this.resizeObserver = x.resizeObserver;
        this.sizeChecked();
        this.setActivated();
        this.resizeChanged.set(x.entry?.contentRect || null);
      });
  }

  onEnter(event: Event | null, node: XSliderNode, index: number) {
    if (node.disabled || this.trigger() === 'click') return;
    of(true)
      .pipe(delay(this.hoverDelay), takeUntil(this.hoverDelayUnsub))
      .subscribe(() => {
        if (this.timeoutHide) {
          clearTimeout(this.timeoutHide);
          this.timeoutHide = null;
        }
        this.nodeClick(event, node, index);
      });
  }

  onLeave(node: XSliderNode) {
    if (node.disabled || this.trigger() === 'click') return;
    this.hoverDelayUnsub.next();
  }

  nodeClick(event: Event | null, node: XSliderNode, index: number) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (node.disabled) return;
    this.setDirection(index, this.activatedIndex());
    this.activatedIndex.set(index);
    this.activated.set(node);
    this.activatedId.set(node.id);
    this.setTranslate();
    this.indexChange.emit(index);
    this.nodeChange.emit(node);
  }

  dropdownClick(node: XSliderNode) {
    const index = this.data().indexOf(node);
    this.nodeClick(null, node, index);
  }

  scrollPrev() {
    if (this.offset() === 0) return;
    const scrollSize = this.sliderScroll().nativeElement[`offset${this.sizeName()}`];
    const currentOffset = this.offset();
    if (!currentOffset) return;
    const offset = currentOffset > scrollSize ? currentOffset - scrollSize : 0;
    this.offset.set(Math.floor(offset));
  }

  scrollNext() {
    if (this.offset() === this.maxOffset()) return;
    const sliderSize = this.sliderNodes().nativeElement[`offset${this.sizeName()}`];
    const scrollSize = this.sliderScroll().nativeElement[`offset${this.sizeName()}`];
    const currentOffset = this.offset();
    if (sliderSize - currentOffset <= scrollSize) return;
    const offset = sliderSize - currentOffset > scrollSize * 2 ? currentOffset + scrollSize : sliderSize - scrollSize;
    this.offset.set(Math.floor(offset));
  }

  setDirection(index: number, before: number) {
    const increase = index > before;
    this.direction.set(this.layout() === 'row' ? (increase ? 'right' : 'left') : increase ? 'bottom' : 'top');
    return this.direction();
  }

  setTranslate() {
    if (
      XIsUndefined(this.sliderScroll()) ||
      XIsUndefined(this.sliderNodes()) ||
      typeof this.sliderScroll().nativeElement.getBoundingClientRect !== 'function'
    )
      return;
    const sliderRect = this.sliderScroll().nativeElement?.getBoundingClientRect();
    const sliderNodesRect = this.sliderNodes().nativeElement?.getBoundingClientRect();
    let moveIndex =
      ['bottom', 'right'].indexOf(this.direction()) !== -1 ? this.activatedIndex() + 2 : this.activatedIndex();
    moveIndex = moveIndex > this.data().length ? this.data().length : moveIndex === 0 ? 1 : moveIndex;
    let moveEle = this.sliderNodes().nativeElement?.querySelector(`li:nth-child(${moveIndex})`);
    let maxOffset = 0;
    if (XIsEmpty(moveEle)) return;
    const moveRect = moveEle!.getBoundingClientRect();
    const currentOffset = this.offset();
    let offset = currentOffset;
    if (this.layout() === 'row') {
      maxOffset = sliderNodesRect.width - sliderRect.width;
      if (moveRect.left < sliderRect.left) {
        offset = currentOffset - (sliderRect.left - moveRect.left);
      }
      if (moveRect.right > sliderRect.right) {
        offset = currentOffset + moveRect.right - sliderRect.right;
      }
    } else {
      maxOffset = sliderNodesRect.height - sliderRect.height;
      if (moveRect.top < sliderRect.top) {
        offset = currentOffset - (sliderRect.top - moveRect.top);
      }
      if (moveRect.bottom > sliderRect.bottom) {
        offset = currentOffset + (moveRect.bottom - sliderRect.bottom);
      }
    }
    this.maxOffset.set(Math.ceil(maxOffset));
    offset = Math.max(Math.ceil(offset), 0);
    if (!this.showArrow()) {
      this.offset.set(0);
    } else {
      if ([this.maxOffset() + 1, this.maxOffset() - 1].includes(offset)) {
        this.offset.set(this.maxOffset());
      } else {
        this.offset.set(Math.min(offset, this.maxOffset()));
      }
    }
  }

  sizeChecked() {
    const size = this.sliderNodes().nativeElement[`offset${this.sizeName()}`];
    const scrollSize = this.sliderScroll().nativeElement[`offset${this.sizeName()}`];
    const showArrow = this.data().length > 1 && size > scrollSize;
    if (this.showArrow() !== showArrow) {
      this.showArrow.set(showArrow);
      if (!this.showArrow()) {
        this.offset.set(0);
      }
    }
  }

  setActivated() {
    if (this.data().length > 0) {
      this.activated.set(this.data()[this.activatedIndex()]);
      if (this.activated()) {
        this.activatedId.set(this.activated()?.id);
      }
    } else {
      this.activated.set(null);
    }
    this.setTranslate();
  }

  getActivated(index: number) {
    return this.activatedIndex() === index;
  }
}
