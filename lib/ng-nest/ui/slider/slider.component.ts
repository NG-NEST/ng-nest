import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  SimpleChange
} from '@angular/core';
import { XSliderPrefix, XSliderNode, XSliderProperty } from './slider.property';
import { XClassMap, XIsChange, XResize, XPosition, XIsUndefined, XIsEmpty, XSetData, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: `${XSliderPrefix}`,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSliderComponent extends XSliderProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('sliderScroll') sliderScroll!: ElementRef;
  @ViewChild('sliderNodes') sliderNodes!: ElementRef;
  nodes: XSliderNode[] = [];
  activated!: XSliderNode;
  scrollClassMap: XClassMap = {};
  nodeClassMap: XClassMap = {};
  showArrow = false;
  private _offset: number = 0;
  get offset(): number {
    return this._offset;
  }
  set offset(value: number) {
    this._offset = Math.floor(value);
    this.transform = `translate${this.dir}(-${this._offset}px)`;
    this.cdr.detectChanges();
  }
  direction: XPosition = 'right';
  maxOffset: number = 0;
  get dir(): 'X' | 'Y' {
    return this.layout === 'row' ? 'X' : 'Y';
  }
  get sizeName() {
    return this.layout === 'row' ? 'Width' : 'Height';
  }
  transform?: string;
  highlightBox = {
    width: '',
    height: '',
    left: '',
    top: ''
  };
  private _unSubject = new Subject<void>();
  private _resizeObserver!: ResizeObserver;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data, layout, justify, nodeJustify, activatedIndex } = changes;
    XIsChange(data) && this.setData();
    XIsChange(layout) && this.setChange(this.classMap, layout);
    XIsChange(justify) && this.setChange(this.scrollClassMap, justify, 'x-justify');
    XIsChange(nodeJustify) && this.setChange(this.nodeClassMap, nodeJustify, 'x-justify');
    XIsChange(activatedIndex) && this.setDirection(activatedIndex.currentValue, activatedIndex.previousValue) && this.setActivated();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  ngAfterViewInit(): void {
    this.setSubscribe();
    this.setActivated();
  }

  setClassMap() {
    this.classMap[`${XSliderPrefix}-${this.layout}`] = !XIsEmpty(this.layout);
    this.scrollClassMap[`x-justify-${this.justify}`] = !XIsEmpty(this.justify);
    this.nodeClassMap = {
      [`x-justify-${this.nodeJustify}`]: !XIsEmpty(this.nodeJustify),
      [`x-size-${this.size}`]: !XIsEmpty(this.size)
    };
  }

  setChange(map: XClassMap, change: SimpleChange, prefix = XSliderPrefix) {
    map[`${prefix}-${change.previousValue}`] = false;
    map[`${prefix}-${change.currentValue}`] = true;
    this.cdr.detectChanges();
  }

  setSubscribe() {
    XResize(this.sliderScroll.nativeElement, this.sliderNodes.nativeElement)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.sizeChecked();
        this.setActivated();
      });
  }

  nodeClick(node: XSliderNode, index: number) {
    if (node.disabled) return;
    this.setDirection(index, Number(this.activatedIndex));
    this.activatedIndex = index;
    this.activated = node;
    this.setHighlight();
    this.setTranslate();
    this.indexChange.emit(index);
    this.nodeChange.emit(node);
  }

  scrollPrev() {
    const scrollSize = this.sliderScroll.nativeElement[`offset${this.sizeName}`];
    const currentOffset = this.offset;
    if (!currentOffset) return;
    const offset = currentOffset > scrollSize ? currentOffset - scrollSize : 0;
    this.offset = offset;
  }

  scrollNext() {
    const sliderSize = this.sliderNodes.nativeElement[`offset${this.sizeName}`];
    const scrollSize = this.sliderScroll.nativeElement[`offset${this.sizeName}`];
    const currentOffset = this.offset;
    if (sliderSize - currentOffset <= scrollSize) return;
    const offset = sliderSize - currentOffset > scrollSize * 2 ? currentOffset + scrollSize : sliderSize - scrollSize;
    this.offset = offset;
  }

  setDirection(index: number, before: number) {
    const increase = index > before;
    this.direction = this.layout === 'row' ? (increase ? 'right' : 'left') : increase ? 'bottom' : 'top';
    return this.direction;
  }

  setTranslate() {
    if (XIsUndefined(this.sliderScroll) || XIsUndefined(this.sliderNodes)) return;
    const sliderRect = this.sliderScroll.nativeElement?.getBoundingClientRect();
    const sliderNodesRect = this.sliderNodes.nativeElement?.getBoundingClientRect();
    let moveIndex = ['bottom', 'right'].indexOf(this.direction) !== -1 ? Number(this.activatedIndex) + 2 : Number(this.activatedIndex);
    moveIndex = moveIndex > this.nodes.length ? this.nodes.length : moveIndex === 0 ? 1 : moveIndex;
    let moveEle = this.sliderNodes.nativeElement?.querySelector(`li:nth-child(${moveIndex})`);
    let maxOffset = 0;
    if (XIsEmpty(moveEle)) return;
    const moveRect = moveEle.getBoundingClientRect();
    const currentOffset = this.offset;
    let offset = currentOffset;
    if (this.layout === 'row') {
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
    this.maxOffset = Math.floor(maxOffset);
    offset = Math.max(offset, 0);
    this.offset = Math.min(offset, maxOffset);
  }

  sizeChecked() {
    const size = this.sliderNodes.nativeElement[`offset${this.sizeName}`];
    const scrollSize = this.sliderScroll.nativeElement[`offset${this.sizeName}`];
    const showArrow = this.nodes.length > 1 && size > scrollSize;
    if (this.showArrow !== showArrow) {
      this.showArrow = showArrow;
      this.classMap[`${XSliderPrefix}-show-arrow`] = this.showArrow;
      if (!this.showArrow) {
        this.offset = 0;
      }
      this.cdr.detectChanges();
    }
  }

  setActivated() {
    if (this.nodes.length > 0) {
      this.activated = this.nodes[Number(this.activatedIndex)];
    }
    this.setHighlight();
    this.setTranslate();
  }

  setHighlight() {
    if (XIsUndefined(this.sliderNodes)) return;
    const activeEle = this.sliderNodes.nativeElement.querySelector(`li:nth-child(${Number(this.activatedIndex) + 1})`);
    if (!activeEle) return;
    this.highlightBox = {
      width: `${activeEle.offsetWidth}px`,
      height: `${activeEle.offsetHeight}px`,
      left: `${activeEle.offsetLeft}px`,
      top: `${activeEle.offsetTop}px`
    };
    this.cdr.detectChanges();
  }

  private setData() {
    XSetData<XSliderNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.cdr.detectChanges();
      setTimeout(() => this.setActivated());
    });
  }

  getActivated(index: number) {
    return Number(this.activatedIndex) === index;
  }

  trackByNode(_index: number, item: XSliderNode) {
    return item.id;
  }
}
