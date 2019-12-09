import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  Optional,
  HostBinding
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { XIconPrefix, XIconInput, XIconSourceEnum } from "./icon.type";
import { XIconService } from "./icon.service";
import { warnIconTypeNotFound, warnSVGTagNotFound, fillDefault, InputBoolean, InputNumber } from "@ng-nest/ui/core";
import * as _ from "lodash";

// 来源路径对应
export const XSouceUrl = {
  adf: `${XIconSourceEnum.AntDesign}/fill/`,
  ado: `${XIconSourceEnum.AntDesign}/outline/`,
  adt: `${XIconSourceEnum.AntDesign}/twotone/`,
  eaf: `${XIconSourceEnum.Eva}/fill/`,
  eao: `${XIconSourceEnum.Eva}/outline/`,
  fto: `${XIconSourceEnum.Feather}/`,
  fab: `${XIconSourceEnum.FontAwesome}/brands/`,
  far: `${XIconSourceEnum.FontAwesome}/regular/`,
  fas: `${XIconSourceEnum.FontAwesome}/solid/`,
  md: `${XIconSourceEnum.MaterialDesign}/`
};

export const XViewBox = [
  // { souces: ["adf", "ado", "adt"], value: "0 0 1024 1024" },
  // { souces: ["eaf", "eao"], value: "0 0 24 24" },
  // { souces: ["fto"], value: "0 0 24 24" }
];

@Component({
  selector: `${XIconPrefix}`,
  templateUrl: "./icon.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XIconComponent implements OnInit, OnChanges {
  @Input() type?: string;
  @Input() color?: string | string[];
  @Input() @InputNumber() rotate?: number;
  @Input() to?: string;
  @Input() @InputBoolean() spin?: boolean;
  private _svgElement: SVGElement;
  private _default: XIconInput = {};
  private _loaded: boolean = false;

  @HostBinding("class.x-icon-spin") get getSpin() {
    return this.spin;
  }

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    public iconService: XIconService,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, XIconPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const typeChange = changes.type;
    if (typeChange && typeChange.currentValue !== typeChange.previousValue) {
      this.setSvgElement();
      this.renderer.removeClass(this.elementRef.nativeElement, typeChange.previousValue);
      this.renderer.addClass(this.elementRef.nativeElement, `${this.type}`);
    }
  }

  ngAfterViewInit() {
    // this.renderer.listen(window, "scroll", x => {
    // this.getSvg();
    // });
  }

  getSvg() {
    if (this._loaded) return;
    let height = this.document.documentElement.clientHeight;
    let width = this.document.documentElement.clientWidth;
    let box = this.elementRef.nativeElement.getBoundingClientRect();
    if (box.top <= height && box.left <= width) {
      this.setSvgElement();
      this.renderer.addClass(this.elementRef.nativeElement, `${this.type}`);
      this._loaded = true;
    }
  }

  setSvgElement() {
    const typeIcon = this.setSourceUrl(this.type);
    const toIcon = this.setSourceUrl(this.to);
    let icons = [typeIcon];
    if (typeof typeIcon === "undefined") return;
    if (typeof toIcon !== "undefined") {
      icons = [...icons, toIcon];
    }
    this.iconService.getSvgs(...icons).subscribe(x => this.setSvgs(x));
  }

  setSvgs(svgs: string[]) {
    if (svgs && svgs.length > 0) {
      let firstChild = this.elementRef.nativeElement.firstChild;
      if (firstChild) {
        this.renderer.removeChild(this.elementRef.nativeElement, firstChild);
      }
      this._svgElement = this.buildSvg(svgs.shift());
      // this.setAnimates(svgs);
      this.setAttributes(this._svgElement);
      this.renderer.appendChild(this.elementRef.nativeElement, this._svgElement);
      this.cdr.markForCheck();
    }
  }

  setSourceUrl(type: string) {
    if (typeof type === "undefined") return;
    const split = type.split("-");
    const souce = split.shift();
    const souceUrl = XSouceUrl[souce];
    const fileName = split.join("-");
    if (!souceUrl || !fileName) {
      warnIconTypeNotFound();
    }
    return `${souceUrl}${fileName}`;
  }

  setAttributes(svgEle: SVGElement) {
    if (svgEle) {
      this.renderer.setAttribute(svgEle, "width", "1em");
      this.renderer.setAttribute(svgEle, "height", "1em");
    }
  }

  buildSvg(svgStr: string): SVGAElement {
    const result = this.document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGAElement;
    const svg = this.createSvg(svgStr);
    if (!svg) return;
    svg.children.forEach(x => {
      x.removeAttribute("class");
      if (x.tagName === "rect") {
        x.setAttribute("fill", "none");
      }
      result.appendChild(x);
    });
    this.setAttribute(result, svg.ele, "viewBox");
    this.setAttribute(result, svg.ele, "fill", "currentColor");
    this.setAttribute(result, svg.ele, "stroke");
    this.setAttribute(result, svg.ele, "stroke-width");
    this.setAttribute(result, svg.ele, "stroke-linecap");
    this.setAttribute(result, svg.ele, "stroke-linejoin");
    if (!result) {
      warnSVGTagNotFound();
    }

    return result;
  }

  createSvg(svgStr: string) {
    const div = this.document.createElement("div");
    div.innerHTML = svgStr;
    let svgEle = div.querySelector("svg") as SVGElement;
    if (!svgEle) return null;
    return {
      ele: svgEle,
      children: svgEle.querySelectorAll("path, polyline, polygon, circle, line, rect")
    };
  }

  setAttribute(svg: SVGElement, svgEle: SVGElement, attribute: string, def?: string) {
    let attr = svgEle.getAttribute(attribute);
    if (attr) {
      svg.setAttribute(attribute, attr);
    } else if (def) {
      svg.setAttribute(attribute, def);
    }
  }

  //<animate begin="mouseenter" dur="500ms" repeatCount="1" attributeName="d" from="M86.425,13.204l5.648,12.741H0.55   l0.125-12.616L0.55,0.544h91.523L86.425,13.204z" to="M92.725,13.521l0.044,12.887H1.245   l7-12.616l-7-12.785h91.523L92.725,13.521z" fill="freeze"></animate>

  setAnimates(svgs: string[]) {
    if (svgs && svgs.length > 0) {
      let svg = this.createSvg(svgs.shift());
      for (let i = 0; i < this._svgElement.children.length; i++) {
        let child = this._svgElement.children[i];
        let toChild = svg.children[i];
        if (child && toChild && child.nodeName === "path" && toChild.nodeName === "path") {
          let toAnimate = document.createElement("animate");
          toAnimate.setAttribute("dur", "500ms");
          toAnimate.setAttribute("repeatCount", "1");
          toAnimate.setAttribute("attributeName", "d");
          toAnimate.setAttribute("fill", "freeze");
          toAnimate.setAttribute("from", child.getAttribute("d"));
          toAnimate.setAttribute("to", toChild.getAttribute("d"));
          this.renderer.appendChild(child, toAnimate);
        }
      }
    }
  }
}
