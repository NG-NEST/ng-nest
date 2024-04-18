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
  inject,
  computed
} from '@angular/core';
import { XAnchorPrefix, XAnchorNode, XAnchorProperty } from './anchor.property';
import {
  XComputedStyle,
  XIsEmpty,
  XRequestAnimationFrame,
  XIsNumber,
  XIsUndefined,
  XConfigService
} from '@ng-nest/ui/core';
import { XSliderComponent } from '@ng-nest/ui/slider';
import type { XSliderNode } from '@ng-nest/ui/slider';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { DOCUMENT, NgClass } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: `${XAnchorPrefix}`,
  standalone: true,
  imports: [NgClass, XAffixComponent, XSliderComponent],
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

  document: Document = inject(DOCUMENT);
  contentChange = new Subject();
  scrollElement = computed(() => {
    let scroll = this.scroll();
    if (!scroll) {
      scroll = this.document.documentElement;
    }
    return scroll;
  });
  sliderHeight = computed(() => {
    if (XIsEmpty(this.sliderData)) {
      return 0;
    } else {
      let height = this.scrollElement().offsetHeight;
      let top = parseFloat(XComputedStyle(this.scrollElement(), 'padding-top'));
      let borderTop = parseFloat(XComputedStyle(this.scrollElement(), 'border-top'));
      let bottom = parseFloat(XComputedStyle(this.scrollElement(), 'padding-bottom'));
      let borderBottom = parseFloat(XComputedStyle(this.scrollElement(), 'border-bottom'));
      return height - top - bottom - borderTop - borderBottom - this.getTop() - this.getBottom();
    }
  });
  classMapSignal = computed(() => ({
    [`${XAnchorPrefix}-${this.layout()}`]: !XIsEmpty(this.layout())
  }));
  private _scrolling = false;
  private _fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  private _unSubject = new Subject<void>();
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngAfterContentChecked(): void {
    this.contentChange.next(this.elementRef.nativeElement.innerHTML);
  }

  ngOnInit() {
    this.setSliderData();
  }

  ngAfterViewInit() {
    this.setScroll();
    this.contentChange.pipe(distinctUntilChanged(), takeUntil(this._unSubject)).subscribe(() => {
      console.log(111222);
      this.setSliderData();
    });
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  activatedChange(index: number) {
    if (XIsEmpty(this.hElements) || XIsUndefined(this.scrollElement())) return;

    this._scrolling = true;
    const hElement = this.hElements[index];
    let scrollTop =
      hElement.offsetTop - this.anchor.nativeElement.offsetTop - parseFloat(XComputedStyle(hElement, 'margin-top'));
    let maxScrollTop = this.scrollElement().scrollHeight - this.scrollElement().clientHeight;
    if (scrollTop > maxScrollTop) scrollTop = maxScrollTop;
    this.scrollTo(this.scrollElement(), parseInt(`${scrollTop}`), 150);
  }

  private setScroll() {
    fromEvent(this.scrollElement(), 'scroll')
      .pipe(throttleTime(10), takeUntil(this._unSubject))
      .subscribe(() => {
        if (this._scrolling) return;
        this.setActivatedByScroll();
      });
  }

  private setActivatedByScroll() {
    let now = 0;
    this.hElements.forEach((h, index) => {
      let distance = this.scrollElement().scrollTop + this.anchor.nativeElement.offsetTop;
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
    console.log(this.sliderData);
  }

  private setLeft(element: HTMLElement): number {
    const eles = ['H1', 'H2', 'H3', 'H4', 'H5'];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  private getTop() {
    const top = this.affixTop();
    if (top === '0') return 0;
    if (XIsNumber(top)) return Number(top);
    else if (top.endsWith('rem')) return Number(top.replace(/rem/g, '')) * this._fontSize();
    else if (top.endsWith('px')) return Number(top.replace(/px/g, ''));
    return 0;
  }

  private getBottom() {
    const bottom = this.affixTop();
    if (bottom === '0') return 0;
    if (XIsNumber(bottom)) return Number(bottom);
    else if (bottom.endsWith('rem')) return Number(bottom.replace(/rem/g, '')) * this._fontSize();
    else if (bottom.endsWith('px')) return Number(bottom.replace(/px/g, ''));
    return 0;
  }

  private scrollTo(element: HTMLElement, to: number, duration: number) {
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    XRequestAnimationFrame(() => {
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
