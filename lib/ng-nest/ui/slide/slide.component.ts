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
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { XSlidePrefix, XSlideNode, XSlideLayout } from './slide.type';
import {
  XClassMap,
  XDataConvert,
  XData,
  XIsChange,
  XIsObservable,
  XToDataConvert,
  XInputBoolean,
  XInputNumber,
  XResize,
  XSliderAnimation,
  XPosition,
  XIsNull
} from '@ng-nest/ui/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: `${XSlidePrefix}`,
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSliderAnimation]
})
export class XSlideComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() @XDataConvert() data: XData<XSlideNode[]>;
  @Input() @XInputBoolean() animated: boolean = true;
  @Input() @XInputNumber() activatedIndex: number = 0;
  @Input() layout: XSlideLayout = 'row';
  @ViewChild('slide', { static: true }) slide: ElementRef;
  @ViewChild('slideScroll', { static: true }) slideScroll: ElementRef;
  @ViewChild('slideNodes', { static: true }) slideNodes: ElementRef;
  @ViewChild('highlight', { static: true }) highlight: ElementRef;
  nodes: XSlideNode[] = [];
  activated: XSlideNode;
  classMap: XClassMap = {};
  showArrow = false;
  private _offset: number = 0;
  get offset(): number {
    return this._offset;
  }
  set offset(value: number) {
    this._offset = value;
    this.transform = `translate${this.dir}(-${value}px)`;
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
  private unSubject = new Subject();
  private resizeObserver: ResizeObserver;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
    this.setSubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
    XIsChange(changes.activatedIndex) &&
      this.setDirection(changes.activatedIndex.currentValue, changes.activatedIndex.previousValue) &&
      this.setActivated();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.unsubscribe();
    this.resizeObserver && this.resizeObserver.disconnect();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => this.setHighlight(), 200);
  }

  setClassMap() {
    this.classMap[`${XSlidePrefix}-${this.layout}`] = this.layout ? true : false;
  }

  setSubscribe() {
    XResize(this.slideScroll.nativeElement, this.slideNodes.nativeElement)
      .pipe(debounceTime(300), takeUntil(this.unSubject))
      .subscribe(x => {
        this.resizeObserver = x.resizeObserver;
        console.log(x.entry.target, x.entry.contentRect.width);
        this.sizeChecked();
        this.setHighlight();
        this.setTranslate();
      });
  }

  nodeClick(node: XSlideNode, index: number) {
    this.setDirection(index, this.activatedIndex);
    this.activatedIndex = index;
    this.activated = node;
    this.setHighlight();
    this.setTranslate();
  }

  scrollPrev() {
    const scrollSize = this.slideScroll.nativeElement[`offset${this.sizeName}`];
    const currentOffset = this.offset;
    if (!currentOffset) return;
    let offset = currentOffset > scrollSize ? currentOffset - scrollSize.width : 0;
    this.offset = offset;
  }

  scrollNext() {
    const slideSize = this.slideNodes.nativeElement[`offset${this.sizeName}`];
    const scrollSize = this.slideScroll.nativeElement[`offset${this.sizeName}`];
    const currentOffset = this.offset;
    if (slideSize - currentOffset <= scrollSize) return;
    let offset = slideSize - currentOffset > scrollSize * 2 ? currentOffset + scrollSize : slideSize - scrollSize;
    this.offset = offset;
  }

  setDirection(index: number, before: number) {
    const increase = index > before;
    this.direction = this.layout === 'row' ? (increase ? 'right' : 'left') : increase ? 'bottom' : 'top';
    return this.direction;
  }

  setTranslate() {
    if (XIsNull(this.slideScroll.nativeElement) || XIsNull(this.slideNodes.nativeElement)) return;
    const slideRect = this.slideScroll.nativeElement.getBoundingClientRect();
    const slideNodesRect = this.slideNodes.nativeElement.getBoundingClientRect();
    let moveIndex = ['bottom', 'right'].indexOf(this.direction) !== -1 ? this.activatedIndex + 2 : this.activatedIndex;
    moveIndex = moveIndex > this.nodes.length ? this.nodes.length : moveIndex === 0 ? 1 : moveIndex;
    let moveEle = this.slideNodes.nativeElement.querySelector(`li:nth-child(${moveIndex})`);
    let maxOffset = 0;
    if (XIsNull(moveEle)) return;
    const moveRect = moveEle.getBoundingClientRect();
    const currentOffset = this.offset;
    let offset = currentOffset;
    if (this.layout === 'row') {
      maxOffset = slideNodesRect.width - slideRect.width;
      if (moveRect.left < slideRect.left) {
        offset = currentOffset - (slideRect.left - moveRect.left);
      }
      if (moveRect.right > slideRect.right) {
        offset = currentOffset + moveRect.right - slideRect.right;
      }
    } else {
      maxOffset = slideNodesRect.height - slideRect.height;
      if (moveRect.top < slideRect.top) {
        offset = currentOffset - (slideRect.top - moveRect.top);
      }
      if (moveRect.bottom > slideRect.bottom) {
        offset = currentOffset + (moveRect.bottom - slideRect.bottom);
      }
    }
    this.maxOffset = maxOffset;
    offset = Math.max(offset, 0);
    this.offset = Math.min(offset, maxOffset);
    console.log(this.offset);
  }

  sizeChecked() {
    let width = this.slideNodes.nativeElement.offsetWidth;
    let scrollWidth = this.slideScroll.nativeElement.offsetWidth;
    let showArrow = this.nodes.length > 1 && width > scrollWidth;
    if (this.showArrow !== showArrow) {
      this.showArrow = showArrow;
      this.classMap[`${XSlidePrefix}-show-arrow`] = this.showArrow;
      if (!this.showArrow) {
        this.offset = 0;
      }
      this.cdr.detectChanges();
    }
  }

  setActivated() {
    if (this.nodes.length > 0) {
      this.activated = this.nodes[this.activatedIndex];
    }
    this.setHighlight();
    this.setTranslate();
  }

  setHighlight() {
    const activeEle = this.slideNodes.nativeElement.querySelector(`li:nth-child(${this.activatedIndex + 1})`);
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
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      (this.data as Observable<any>)
        .pipe(
          map(x => XToDataConvert(x)),
          takeUntil(this.unSubject)
        )
        .subscribe(x => {
          this.setDataChange(x);
        });
    } else {
      this.setDataChange(this.data as XSlideNode[]);
    }
  }

  private setDataChange(value: XSlideNode[]) {
    this.nodes = value;
    this.setActivated();
    this.cdr.detectChanges();
  }
}
