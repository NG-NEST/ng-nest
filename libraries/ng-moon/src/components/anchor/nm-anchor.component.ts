import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  ChangeDetectorRef,
  ElementRef,
  Renderer2
} from "@angular/core";
import { AnchorPrefix, NmAnchorOption, NmAnchorNode } from "./nm-anchor.type";
import { fillDefault, reqAnimFrame } from "../../core/util";
import { NmSliderNode, NmActivatedSlider } from "../slider";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "nm-anchor, [nm-anchor]",
  templateUrl: "./nm-anchor.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmAnchorComponent implements OnInit {
  private default: NmAnchorOption = {};
  _data = new BehaviorSubject<NmSliderNode[]>([]);
  _hElements: HTMLElement[];
  _scrollElement: HTMLElement;

  @HostBinding(`class.${AnchorPrefix}`) className() {
    return true;
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    fillDefault(this, this.default);
  }

  ngAfterViewInit() {
    this.setData();
  }

  activatedChange(activated: NmActivatedSlider) {
    console.log(activated);
    console.log(this.elementRef);
  }

  setData() {
    this._hElements = this.elementRef.nativeElement.querySelectorAll(
      "h1, h2, h3, h4, h5"
    );
    this._scrollElement = this.elementRef.nativeElement.offsetParent;
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
      this._data.next(list);
      this._data.complete();
    }

    this._scrollElement.addEventListener("scroll", x => {
      console.log(1, x);
    });
    this.renderer.listen(document, "scroll", x => {
      console.log(this._scrollElement.scrollTop);
    });
  }

  setLeft(element: HTMLElement): number {
    const eles = ["H1", "H2", "H3", "H4", "H5"];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
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
