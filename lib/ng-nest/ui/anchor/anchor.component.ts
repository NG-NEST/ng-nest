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
  Inject,
  OnDestroy
} from '@angular/core';
import { XAnchorPrefix, XAnchorNode, XAnchorProperty } from './anchor.property';
import { computedStyle, XIsEmpty, reqAnimFrame, XIsNumber, XIsUndefined } from '@ng-nest/ui/core';
import { XSliderNode } from '@ng-nest/ui/slider';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XAnchorPrefix}`,
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAnchorComponent extends XAnchorProperty implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('anchor', { static: true }) anchor: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  hElements: HTMLElement[] = [];
  sliderData: XSliderNode[] = [];
  activatedIndex: number = 0;
  sliderHeight?: number;
  private _scrolling = false;
  private _fontSize: number = parseFloat(computedStyle(this.doc.documentElement, 'font-size'));
  private _unSubject = new Subject();

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
    this.setSliderData();
    this.setHeight();
  }

  ngAfterViewInit() {
    this.setScroll();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  activatedChange(index: number) {
    if (XIsEmpty(this.hElements) || XIsUndefined(this.scroll)) return;
    this._scrolling = true;
    const hElement = this.hElements[index];
    const scrollTop = hElement.offsetTop - this.anchor.nativeElement.offsetTop - parseFloat(computedStyle(hElement, 'margin-top'));
    this.scrollTo(this.scroll, parseInt(`${scrollTop}`), 150);
  }

  private setClassMap() {
    this.classMap[`${XAnchorPrefix}-${this.layout}`] = !XIsEmpty(this.layout);
  }

  private setScroll() {
    if (!this.scroll) this.scroll = this.doc.documentElement;
    fromEvent(this.scroll, 'scroll')
      .pipe(throttleTime(10), takeUntil(this._unSubject))
      .subscribe((x) => {
        if (this._scrolling) return;
        this.setActivatedByScroll();
      });
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
    this.hElements = this.content.nativeElement.querySelectorAll(':scope> h1,:scope> h2,:scope> h3,:scope> h4,:scope> h5');
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
    }
  }

  private setLeft(element: HTMLElement): number {
    const eles = ['H1', 'H2', 'H3', 'H4', 'H5'];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  private setHeight() {
    if (this.scroll) {
      let height = this.scroll.offsetHeight;
      let top = parseFloat(computedStyle(this.scroll, 'padding-top'));
      let borderTop = parseFloat(computedStyle(this.scroll, 'border-top'));
      let bottom = parseFloat(computedStyle(this.scroll, 'padding-bottom'));
      let borderBottom = parseFloat(computedStyle(this.scroll, 'border-bottom'));
      this.sliderHeight = height - top - bottom - borderTop - borderBottom - this.getTop();
    }
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
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to || duration <= 0) {
        setTimeout(() => (this._scrolling = false), 20);
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
