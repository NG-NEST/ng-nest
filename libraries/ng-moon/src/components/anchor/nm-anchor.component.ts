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
  OnDestroy
} from "@angular/core";
import { AnchorPrefix, NmAnchorOption, NmAnchorNode } from "./nm-anchor.type";
import { fillDefault, reqAnimFrame, computedStyle } from "../../core/util";
import { NmSliderNode, NmActivatedSlider, NmSliderComponent } from "../slider";
import { BehaviorSubject, Subscription, fromEvent } from "rxjs";
import { DOCUMENT } from "@angular/platform-browser";
import { throttleTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "nm-anchor, [nm-anchor]",
  templateUrl: "./nm-anchor.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmAnchorComponent implements OnInit, OnDestroy {
  data = new BehaviorSubject<NmSliderNode[]>([]);
  activatedIndex: number = 0;
  listFixed: boolean = false;
  private _default: NmAnchorOption = {};
  private _destroyed: boolean = false;
  private _scroll$: Subscription | null = null;
  private _windowSize$: Subscription | null = null;
  private _hElements: HTMLElement[];
  private _scrollElement: HTMLElement | Window;
  private _isAnimation: boolean = false;
  @ViewChild("slider") slider: NmSliderComponent;
  @ViewChild("list") list: ElementRef;
  @ViewChild("content") content: ElementRef;

  @HostBinding(`class.${AnchorPrefix}`) className() {
    return true;
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngAfterViewInit() {
    this.setElements();
  }

  ngOnDestroy(): void {
    this._destroyed = true;
    this.removeListen();
  }

  private removeListen() {
    if (this._scroll$) this._scroll$.unsubscribe();
    if (this._windowSize$) this._windowSize$.unsubscribe();
  }

  private activatedChange(activated: NmActivatedSlider) {
    this._isAnimation = true;
    const activatedEle = this._hElements[activated.nmActivatedIndex];
    const marginTop = computedStyle(activatedEle, "marginTop") as number;
    const top =
      activatedEle.offsetTop +
      this.elementRef.nativeElement.offsetTop -
      marginTop +
      1;
    let scrollEle =
      this._scrollElement instanceof Window
        ? this.doc.documentElement
        : this._scrollElement;
    let scrollH = scrollEle.scrollHeight - scrollEle.clientHeight;
    this.scrollTo(scrollEle, top <= scrollH ? top : scrollH, 150);
    setTimeout(() => {
      this._isAnimation = false;
    }, 300);
  }

  private setElements() {
    this.setHElements();
    this.setScrollElement();
    this.windowSizeChange();
  }

  private setHElements() {
    this._hElements = this.elementRef.nativeElement.querySelectorAll(
      "h1, h2, h3, h4, h5"
    );
    if (this._hElements.length > 0) {
      this.renderer.addClass(
        this.elementRef.nativeElement,
        `${AnchorPrefix}-open`
      );
      let list: NmAnchorNode[] = [];
      this._hElements.forEach((x: HTMLElement, i: number) => {
        const link = `nm-anchor-${i}`;
        const left = this.setLeft(x);
        this.renderer.setAttribute(x, "id", link);
        list = [
          ...list,
          {
            nmKey: i,
            nmLabel: x.innerText,
            nmLeft: left,
            // nmIcon: left > 1 ? "adf-forward" : "adf-forward",
            // router: `${this.location.path()}`,
            nmLink: link
          }
        ];
      });
      this.data.next(list);
      this.data.complete();
    }
  }

  private setScrollElement() {
    let scrollElement = this.elementRef.nativeElement.offsetParent;
    this._scrollElement =
      scrollElement.tagName == "BODY" ? window : scrollElement;
    if (this._scroll$) this._scroll$.unsubscribe();
    this._scroll$ = fromEvent(this._scrollElement, "scroll")
      .pipe(
        throttleTime(30),
        distinctUntilChanged()
      )
      .subscribe(() => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.listFixed = scrollTop >= this.elementRef.nativeElement.offsetTop;
        this.setListFixed();
        if (!this._isAnimation) {
          let now = 0;
          this._hElements.forEach((item, index) => {
            if (
              scrollTop - this.elementRef.nativeElement.offsetTop >=
              item.offsetTop - (computedStyle(item, "marginTop") as number)
            ) {
              now = index;
              return;
            }
          });
          this.activatedIndex = now;
        }
        this.cdr.detectChanges();
      });
  }

  private windowSizeChange() {
    if (this._windowSize$) this._windowSize$.unsubscribe();
    this._windowSize$ = fromEvent(window, "resize")
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.setListFixed();
      });
  }

  private getAnchorLeft() {
    return this.content.nativeElement.clientWidth;
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
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }
}
