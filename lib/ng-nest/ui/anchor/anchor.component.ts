import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  AfterContentChecked,
  inject
} from '@angular/core';
import { XAnchorPrefix, XAnchorNode, XAnchorProperty } from './anchor.property';
import { XComputedStyle, XIsEmpty, reqAnimFrame, XIsNumber, XIsUndefined, XConfigService } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: `${XAnchorPrefix}`,
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAnchorComponent extends XAnchorProperty implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;
  hElements!: NodeListOf<HTMLElement>;
  sliderData: XSliderNode[] = [];
  activatedIndex: number = 0;
  sliderHeight?: number;
  document: Document = inject(DOCUMENT);
  contentChange = new Subject();
  private _scrolling = false;
  private _fontSize: number;
  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
    this._fontSize = parseFloat(XComputedStyle(this.document.documentElement, 'font-size'));
  }
  ngAfterContentChecked(): void {
    this.contentChange.next(this.elementRef.nativeElement.innerHTML);
  }

  ngOnInit() {
    this.setClassMap();
    this.setSliderData();
    this.setHeight();
  }

  ngAfterViewInit() {
    this.setScroll();
    this.contentChange.pipe(distinctUntilChanged(), takeUntil(this._unSubject)).subscribe(() => {
      this.setSliderData();
      this.setHeight();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  activatedChange(index: number) {
    if (XIsEmpty(this.hElements) || XIsUndefined(this.scroll)) return;

    this._scrolling = true;
    const hElement = this.hElements[index];
    let scrollTop = hElement.offsetTop - this.anchor.nativeElement.offsetTop - parseFloat(XComputedStyle(hElement, 'margin-top'));
    let maxScrollTop = this.scroll.scrollHeight - this.scroll.clientHeight;
    if (scrollTop > maxScrollTop) scrollTop = maxScrollTop;
    this.scrollTo(this.scroll, parseInt(`${scrollTop}`), 150);
  }

  private setClassMap() {
    this.classMap[`${XAnchorPrefix}-${this.layout}`] = !XIsEmpty(this.layout);
  }

  private setScroll() {
    fromEvent(this.scroll ? this.scroll : this.document.defaultView!, 'scroll')
      .pipe(throttleTime(10), takeUntil(this._unSubject))
      .subscribe(() => {
        if (this._scrolling) return;
        this.setActivatedByScroll();
      });
    if (!this.scroll) {
      this.scroll = this.document.documentElement;
    }
  }

  private setActivatedByScroll() {
    let now = 0;
    this.hElements.forEach((h, index) => {
      let distance = this.scroll.scrollTop + this.anchor.nativeElement.offsetTop;
      if (distance >= h.offsetTop) {
        now = index;
        return;
      }
    });
    this.activatedIndex = now;
    this.cdr.detectChanges();
  }

  private setSliderData() {
    this.hElements = this.content.nativeElement.querySelectorAll(
      ':scope> h1,:scope> h2,:scope> h3,:scope> h4,:scope> h5,:scope> x-anchor-inner> h1,:scope> x-anchor-inner>h2,:scope> x-anchor-inner>h3,:scope> x-anchor-inner>h4,:scope> x-anchor-inner>h5'
    );
    if (this.hElements.length > 0) {
      let list: XAnchorNode[] = [];
      this.hElements.forEach((x: HTMLElement, i: number) => {
        const link = `x-anchor-${i}`;
        const left = this.setLeft(x);
        this.renderer.setAttribute(x, 'id', link);
        list = [
          ...list,
          {
            id: i,
            label: x.innerText,
            left: left,
            link: link
          }
        ];
      });
      this.sliderData = list;
    } else {
      this.sliderData = [];
    }
  }

  private setLeft(element: HTMLElement): number {
    const eles = ['H1', 'H2', 'H3', 'H4', 'H5'];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  private setHeight() {
    if (this.scroll) {
      if (XIsEmpty(this.sliderData)) {
        this.sliderHeight = 0;
      } else {
        let height = this.scroll.offsetHeight;
        let top = parseFloat(XComputedStyle(this.scroll, 'padding-top'));
        let borderTop = parseFloat(XComputedStyle(this.scroll, 'border-top'));
        let bottom = parseFloat(XComputedStyle(this.scroll, 'padding-bottom'));
        let borderBottom = parseFloat(XComputedStyle(this.scroll, 'border-bottom'));
        this.sliderHeight = height - top - bottom - borderTop - borderBottom - this.getTop();
      }
    }
  }

  getWidth() {
    if (!this.affixWidth) return null;
    if (this.affixWidth === '0') return 0;
    if (XIsNumber(this.affixWidth)) return this.affixWidth;
    else if (this.affixWidth.indexOf('rem') !== -1) return Number(this.affixWidth.replace(/rem/g, '')) * this._fontSize;
    else if (this.affixWidth.indexOf('px') !== -1) return Number(this.affixWidth.replace(/px/g, ''));
    else return Number(this.affixWidth);
  }

  private getTop() {
    if (this.affixTop === '0') return 0;
    if (XIsNumber(this.affixTop)) return Number(this.affixTop);
    else if (this.affixTop.indexOf('rem') !== -1) return Number(this.affixTop.replace(/rem/g, '')) * this._fontSize;
    else if (this.affixTop.indexOf('px') !== -1) return Number(this.affixTop.replace(/px/g, ''));
    return 0;
  }

  private scrollTo(element: HTMLElement, to: number, duration: number) {
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      const num = element.scrollTop + perTick;
      if (XIsNumber(num) && num !== Infinity) {
        element.scrollTop = num;
      }
      if (element.scrollTop === to || duration <= 0) {
        setTimeout(() => (this._scrolling = false), 20);
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
