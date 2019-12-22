import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewChild,
  Inject,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { AnchorPrefix, XAnchorInput, XAnchorNode, XActivatedAnchor, XAnchorLayoutType } from "./anchor.type";
import { fillDefault, reqAnimFrame, computedStyle, XInputBoolean, XInputNumber, removeNgTag } from "@ng-nest/ui/core";
import { XSliderNode, XActivatedSlider, XSliderInput } from "@ng-nest/ui/slider";
import { BehaviorSubject, Subscription, fromEvent, Observable } from "rxjs";
import { throttleTime, distinctUntilChanged } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "x-anchor",
  templateUrl: "./anchor.component.html",
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./style/index.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAnchorComponent implements OnInit, OnDestroy {
  private _layout: XAnchorLayoutType;
  public get layout(): XAnchorLayoutType {
    return this._layout;
  }
  @Input()
  public set layout(value: XAnchorLayoutType) {
    this._layout = value;
    this.sliderOption.borderPosition = this._layout === "left" ? "right" : "left";
  }
  @Input() scrollElement: HTMLElement | Window;
  @Input() @XInputNumber() top: number;
  @Input() @XInputBoolean() sliderFixed: boolean;

  @Output() indexChange?: EventEmitter<XActivatedAnchor> = new EventEmitter<XActivatedAnchor>();

  @ViewChild("list", { static: false }) list: ElementRef;
  @ViewChild("content", { static: false }) content: ElementRef;
  @ViewChild("anchor", { static: true }) anchor: ElementRef;

  listFixed: boolean = false;

  sliderOption: XSliderInput = {
    data: new BehaviorSubject<XSliderNode[]>([]),
    activatedIndex: 0,
    borderPosition: "left"
  };

  scrollObservable: Observable<any>;

  private _default: XAnchorInput = {
    layout: "right",
    top: 0,
    sliderFixed: false
  };
  private _windowScroll: boolean = false;
  private _scroll$: Subscription | null = null;
  private _windowScroll$: Subscription | null = null;
  private _windowSize$: Subscription | null = null;
  private _hElements: HTMLElement[];
  private _isAnimation: boolean = false;
  private _offsetParent: any;
  private _fontSize: number = parseFloat(computedStyle(this.doc.documentElement, "font-size"));
  private _top: number = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {}

  ngOnInit() {
    fillDefault(this, this._default);
    this._top = this._fontSize * this.top;
    // removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.setElements();
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  activatedChange(activated: XActivatedSlider) {
    this._isAnimation = true;
    const activatedEle = this._hElements[activated.activatedIndex];
    let top = activatedEle.offsetTop + this.anchor.nativeElement.offsetTop - this._top;
    let scrollEle = this._windowScroll ? this.doc.documentElement : (this.scrollElement as HTMLElement);
    let scrollHeight = scrollEle.scrollHeight - scrollEle.clientHeight;
    top = top > scrollHeight ? scrollHeight : top;
    if (!this._windowScroll) {
      top -= scrollEle.offsetTop;
    }
    this.scrollTo(scrollEle, parseInt(`${top}`), 150);
    this.indexChange.emit(activated);
    setTimeout(() => {
      this._isAnimation = false;
    }, 300);
  }

  private removeListen() {
    this._scroll$.unsubscribe();
    this._windowSize$.unsubscribe();
    if (this._windowScroll$) {
      this._windowScroll$.unsubscribe();
    }
  }

  private setElements() {
    this.setHElements();
    this.setScrollElement();
    this.windowSizeChange();
    if (this.listFixed) {
      this.setListFixed();
    }
  }

  private setHElements() {
    this._hElements = this.content.nativeElement.querySelectorAll(
      ":scope> h1,:scope> h2,:scope> h3,:scope> h4,:scope> h5"
    );
    if (this._hElements.length > 0) {
      this.renderer.addClass(this.anchor.nativeElement, `${AnchorPrefix}-open`);
      let list: XAnchorNode[] = [];
      this._hElements.forEach((x: HTMLElement, i: number) => {
        const link = `x-anchor-${i}`;
        const left = this.setLeft(x);
        this.renderer.setAttribute(x, "id", link);
        list = [
          ...list,
          {
            key: i,
            label: x.innerText,
            left: left,
            // icon: left > 1 ? "adf-forward" : "adf-forward",
            // router: `${this.location.path()}`,
            link: link
          }
        ];
      });
      (this.sliderOption.data as BehaviorSubject<XSliderNode[]>).next(list);
      (this.sliderOption.data as BehaviorSubject<XSliderNode[]>).complete();
    }
  }

  private getScrollTop() {
    if (this._windowScroll) {
      return document.documentElement.scrollTop;
    } else {
      return (this.scrollElement as HTMLElement).scrollTop;
    }
  }

  private setScrollElement() {
    if (typeof this.scrollElement === "undefined") {
      this.scrollElement = window;
      this._windowScroll = true;
      setTimeout(() => this.renderer.setStyle(this.list.nativeElement, "max-height", `calc(100% - ${this._top}px)`));
    } else {
      this._offsetParent = (this.scrollElement as HTMLElement).offsetParent;
      // ToDo: 当文档在tab中时获取不到高度
      setTimeout(() =>
        this.renderer.setStyle(
          this.list.nativeElement,
          "max-height",
          `${(this.scrollElement as HTMLElement).clientHeight - this._top}px`
        )
      );
      if (this._offsetParent) {
        fromEvent(this._offsetParent, "scroll")
          .pipe(distinctUntilChanged())
          .subscribe(() => {
            if (this.listFixed) {
              this.setFixedTop();
            }
          });
      }
      this.setWindowScroll();
    }
    this.scrollObservable = fromEvent(this.scrollElement, "scroll").pipe(throttleTime(10), distinctUntilChanged());
    this._scroll$ = this.scrollObservable.subscribe(() => {
      this.setActiveatedIndex();
    });
  }

  setActiveatedIndex() {
    let scrollTop = this.getScrollTop();
    this.listFixed = this.setFixed(scrollTop + this._top);
    this.setListFixed();
    if (!this._isAnimation) {
      let now = 0;
      this._hElements.forEach((item, index) => {
        let distance = scrollTop - this.anchor.nativeElement.offsetTop;
        if (!this._windowScroll) distance += (this.scrollElement as HTMLElement).offsetTop;
        if (distance >= item.offsetTop - this._top) {
          now = index;
          return;
        }
      });
      this.sliderOption.activatedIndex = now;
    }
    this.cdr.detectChanges();
  }

  private setWindowScroll() {
    this._windowScroll$ = fromEvent(window, "scroll")
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        if (this.listFixed) {
          this.setFixedTop();
        }
      });
  }

  private setFixed(scrollTop) {
    let eleTop = this.anchor.nativeElement.offsetTop;
    if (this._windowScroll) {
      return scrollTop >= eleTop;
    } else {
      let scroll = this.scrollElement as HTMLElement;
      let fixed = scrollTop >= eleTop - scroll.offsetTop;
      if (fixed) {
        this.setFixedTop();
      } else {
        this.renderer.setStyle(this.list.nativeElement, "top", `${this._top}`);
      }
      return fixed;
    }
  }

  private setFixedTop() {
    let windowScrollTop = document.documentElement.scrollTop;
    let offsetTop = (this.scrollElement as HTMLElement).offsetTop;
    let offsetParent = (this.scrollElement as HTMLElement).offsetParent as HTMLElement;
    if (offsetParent) offsetTop = offsetTop + offsetParent.offsetTop - offsetParent.scrollTop;
    this.renderer.setStyle(this.list.nativeElement, "top", `${offsetTop - windowScrollTop + this._top}px`);
  }

  private windowSizeChange() {
    this._windowSize$ = fromEvent(window, "resize")
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.setListFixed();
      });
  }

  private getAnchorLeft() {
    return this.layout === "right" ? this.content.nativeElement.clientWidth : 0;
  }

  private setListFixed() {
    let fixedLeft = this.anchor.nativeElement.offsetLeft;
    let anchorLeft = this.getAnchorLeft();
    this.renderer.setStyle(
      this.list.nativeElement,
      "left",
      `${this.listFixed ? fixedLeft + anchorLeft : anchorLeft}px`
    );
  }

  private setLeft(element: HTMLElement): number {
    const eles = ["H1", "H2", "H3", "H4", "H5"];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  private scrollTo(element: HTMLElement, to: number, duration: number): void {
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to || duration <= 0) {
        return;
      } else {
        this.scrollTo(element, to, duration - 10);
      }
    });
  }
}
