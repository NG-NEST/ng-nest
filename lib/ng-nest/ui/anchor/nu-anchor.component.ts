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
import {
  AnchorPrefix,
  NuAnchorOption,
  NuAnchorNode,
  NuActivatedAnchor,
  NuAnchorLayoutType
} from "./nu-anchor.type";
import { fillDefault, reqAnimFrame, computedStyle } from "@ng-nest/ui/core";
import {
  NuSliderNode,
  NuActivatedSlider,
  NuSliderComponent,
  NuSliderOption
} from "@ng-nest/ui/slider";
import { BehaviorSubject, Subscription, fromEvent, Observable } from "rxjs";
import { throttleTime, distinctUntilChanged } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "nu-anchor",
  templateUrl: "./nu-anchor.component.html",
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./style/index.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuAnchorComponent implements OnInit, OnDestroy {
  private _nuLayout: NuAnchorLayoutType;
  public get nuLayout(): NuAnchorLayoutType {
    return this._nuLayout;
  }
  @Input()
  public set nuLayout(value: NuAnchorLayoutType) {
    this._nuLayout = value;
    this.sliderOption.nuBorderPosition =
      this._nuLayout === "left" ? "right" : "left";
  }
  @Input() nuScrollElement: HTMLElement | Window;
  @Input() nuTop: number;
  @Input() nuSliderFixed: boolean;

  @Output() nuActivatedChange?: EventEmitter<
    NuActivatedAnchor
  > = new EventEmitter<NuActivatedAnchor>();

  listFixed: boolean = false;

  sliderOption: NuSliderOption = {
    nuData: new BehaviorSubject<NuSliderNode[]>([]),
    nuActivatedIndex: 0,
    nuBorderPosition: "left"
  };

  scrollObservable: Observable<any>;

  private _default: NuAnchorOption = {
    nuLayout: "right",
    nuTop: 0,
    nuSliderFixed: false
  };
  private _windowScroll: boolean = false;
  private _scroll$: Subscription | null = null;
  private _windowScroll$: Subscription | null = null;
  private _windowSize$: Subscription | null = null;
  private _hElements: HTMLElement[];
  private _isAnimation: boolean = false;
  private _offsetParent: any;
  private _fontSize: number = parseFloat(
    computedStyle(this.doc.documentElement, "font-size")
  );
  private _top: number = 0;
  @ViewChild("list", { static: false }) list: ElementRef;
  @ViewChild("content", { static: false }) content: ElementRef;

  @HostBinding(`class.nu-anchor-left`)
  get getLayoutLeft() {
    return this.nuLayout === "left";
  }
  @HostBinding(`class.nu-anchor-right`)
  get getLayoutRight() {
    return this.nuLayout === "right";
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, AnchorPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this._top = this._fontSize * this.nuTop;
    this.listFixed = this.nuSliderFixed;
  }

  ngAfterViewInit() {
    this.setElements();
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  activatedChange(activated: NuActivatedSlider) {
    this._isAnimation = true;
    const activatedEle = this._hElements[activated.nuActivatedIndex];
    // const marginTop = parseFloat(computedStyle(activatedEle, "marginTop"));
    let top =
      activatedEle.offsetTop +
      this.elementRef.nativeElement.offsetTop -
      // marginTop -
      this._top;
    let scrollEle = this._windowScroll
      ? this.doc.documentElement
      : (this.nuScrollElement as HTMLElement);
    let scrollHeight = scrollEle.scrollHeight - scrollEle.clientHeight;
    top = top > scrollHeight ? scrollHeight : top;
    if (!this._windowScroll) {
      top -= scrollEle.offsetTop;
    }
    this.scrollTo(scrollEle, parseInt(`${top}`), 150);
    this.nuActivatedChange.emit(activated);
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
      this.renderer.addClass(
        this.elementRef.nativeElement,
        `${AnchorPrefix}-open`
      );
      let list: NuAnchorNode[] = [];
      this._hElements.forEach((x: HTMLElement, i: number) => {
        const link = `nu-anchor-${i}`;
        const left = this.setLeft(x);
        this.renderer.setAttribute(x, "id", link);
        list = [
          ...list,
          {
            nuKey: i,
            nuLabel: x.innerText,
            nuLeft: left,
            // nuIcon: left > 1 ? "adf-forward" : "adf-forward",
            // router: `${this.location.path()}`,
            nuLink: link
          }
        ];
      });
      (this.sliderOption.nuData as BehaviorSubject<NuSliderNode[]>).next(list);
      (this.sliderOption.nuData as BehaviorSubject<NuSliderNode[]>).complete();
    }
  }

  private getScrollTop() {
    if (this._windowScroll) {
      return document.documentElement.scrollTop;
    } else {
      return (this.nuScrollElement as HTMLElement).scrollTop;
    }
  }

  private setScrollElement() {
    if (typeof this.nuScrollElement === "undefined") {
      this.nuScrollElement = window;
      this._windowScroll = true;
      setTimeout(() =>
        this.renderer.setStyle(
          this.list.nativeElement,
          "max-height",
          `calc(100% - ${this._top}px)`
        )
      );
    } else {
      this._offsetParent = (this.nuScrollElement as HTMLElement).offsetParent;
      // ToDo: 当文档在tab中时获取不到高度
      setTimeout(() =>
        this.renderer.setStyle(
          this.list.nativeElement,
          "max-height",
          `${(this.nuScrollElement as HTMLElement).clientHeight - this._top}px`
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
    this.scrollObservable = fromEvent(this.nuScrollElement, "scroll").pipe(
      throttleTime(10),
      distinctUntilChanged()
    );
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
        let distance = scrollTop - this.elementRef.nativeElement.offsetTop;
        if (!this._windowScroll)
          distance += (this.nuScrollElement as HTMLElement).offsetTop;
        if (distance >= item.offsetTop - this._top) {
          now = index;
          return;
        }
      });
      this.sliderOption.nuActivatedIndex = now;
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
    let eleTop = this.elementRef.nativeElement.offsetTop;
    if (this._windowScroll) {
      return scrollTop >= eleTop;
    } else {
      let scroll = this.nuScrollElement as HTMLElement;
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
    let offsetTop = (this.nuScrollElement as HTMLElement).offsetTop;
    let offsetParent = (this.nuScrollElement as HTMLElement)
      .offsetParent as HTMLElement;
    if (offsetParent)
      offsetTop = offsetTop + offsetParent.offsetTop - offsetParent.scrollTop;
    this.renderer.setStyle(
      this.list.nativeElement,
      "top",
      `${offsetTop - windowScrollTop + this._top}px`
    );
  }

  private windowSizeChange() {
    this._windowSize$ = fromEvent(window, "resize")
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.setListFixed();
      });
  }

  private getAnchorLeft() {
    return this.nuLayout === "right"
      ? this.content.nativeElement.clientWidth
      : 0;
  }

  private setListFixed() {
    let fixedLeft = this.elementRef.nativeElement.offsetLeft;
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
