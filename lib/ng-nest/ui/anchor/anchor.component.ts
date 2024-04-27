import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  AfterContentChecked,
  inject,
  computed,
  signal
} from '@angular/core';
import { XAnchorPrefix, XAnchorProperty } from './anchor.property';
import { XComputedStyle, XIsEmpty, XRequestAnimationFrame, XIsNumber, XIsUndefined, XToCssPx } from '@ng-nest/ui/core';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { DOCUMENT, NgClass } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import type { XSliderNode } from '@ng-nest/ui/slider';
import type { XAnchorNode } from './anchor.property';

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
  sliderData = signal<XSliderNode[]>([]);
  activatedIndex = signal(0);

  document: Document = inject(DOCUMENT);
  contentChange = new Subject<string>();
  scrollElement = computed(() => {
    let scroll = this.scroll();
    if (!scroll) {
      scroll = this.document.documentElement;
    }
    return scroll;
  });
  sliderHeight = computed(() => {
    if (XIsEmpty(this.sliderData())) {
      return 0;
    } else {
      let height = this.scrollElement().offsetHeight;
      let top = parseFloat(XComputedStyle(this.scrollElement(), 'padding-top'));
      let borderTop = parseFloat(XComputedStyle(this.scrollElement(), 'border-top'));
      let bottom = parseFloat(XComputedStyle(this.scrollElement(), 'padding-bottom'));
      let borderBottom = parseFloat(XComputedStyle(this.scrollElement(), 'border-bottom'));
      return (
        height -
        top -
        bottom -
        borderTop -
        borderBottom -
        XToCssPx(this.affixTop(), this.fontSize()) -
        XToCssPx(this.affixBottom(), this.fontSize())
      );
    }
  });
  classMapSignal = computed(() => ({
    [`${XAnchorPrefix}-${this.layout()}`]: !XIsEmpty(this.layout())
  }));
  private scrolling = false;
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  private unSubject = new Subject<void>();
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngAfterContentChecked(): void {
    this.contentChange.next(this.elementRef.nativeElement.innerText);
  }

  ngOnInit() {
    this.setSliderData();
  }

  ngAfterViewInit() {
    this.setScroll();
    this.contentChange.pipe(distinctUntilChanged(), takeUntil(this.unSubject)).subscribe(() => {
      this.setSliderData();
    });
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  activatedChange(index: number) {
    if (XIsEmpty(this.hElements) || XIsUndefined(this.scrollElement())) return;

    this.scrolling = true;
    const hElement = this.hElements[index];
    let scrollTop =
      hElement.offsetTop - this.anchor.nativeElement.offsetTop - parseFloat(XComputedStyle(hElement, 'margin-top'));
    let maxScrollTop = this.scrollElement().scrollHeight - this.scrollElement().clientHeight;
    if (scrollTop > maxScrollTop) scrollTop = maxScrollTop;
    this.scrollTo(this.scrollElement(), parseInt(`${scrollTop}`), 150);
  }

  private setScroll() {
    fromEvent(this.scrollElement(), 'scroll')
      .pipe(throttleTime(10), takeUntil(this.unSubject))
      .subscribe(() => {
        if (this.scrolling) return;
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
    this.activatedIndex.set(now);
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
      this.sliderData.set(list);
    } else {
      this.sliderData.set([]);
    }
  }

  private setLeft(element: HTMLElement): number {
    const eles = ['H1', 'H2', 'H3', 'H4', 'H5'];
    const index = eles.indexOf(element.tagName);
    return index + 1;
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
        setTimeout(() => (this.scrolling = false), 20);
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
