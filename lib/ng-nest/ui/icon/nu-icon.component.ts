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
  Optional
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { IconPrefix, NuIconOption, NuIconSourceEnum } from "./nu-icon.type";
import { NuIconService } from "./nu-icon.service";
import {
  warnIconTypeNotFound,
  warnSVGTagNotFound,
  fillDefault
} from "@ng-nest/ui/core";
import * as _ from "lodash";

// 来源路径对应
export const NuSouceUrl = {
  adf: `${NuIconSourceEnum.AntDesign}/fill/`,
  ado: `${NuIconSourceEnum.AntDesign}/outline/`,
  adt: `${NuIconSourceEnum.AntDesign}/twotone/`,
  eaf: `${NuIconSourceEnum.Eva}/fill/`,
  eao: `${NuIconSourceEnum.Eva}/outline/`,
  fto: `${NuIconSourceEnum.Feather}/`,
  fab: `${NuIconSourceEnum.FontAwesome}/brands/`,
  far: `${NuIconSourceEnum.FontAwesome}/regular/`,
  fas: `${NuIconSourceEnum.FontAwesome}/solid/`,
  md: `${NuIconSourceEnum.MaterialDesign}/`
};

export const NuViewBox = [
  // { souces: ["adf", "ado", "adt"], value: "0 0 1024 1024" },
  // { souces: ["eaf", "eao"], value: "0 0 24 24" },
  // { souces: ["fto"], value: "0 0 24 24" }
];

@Component({
  selector: "nu-icon",
  templateUrl: "./nu-icon.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuIconComponent implements OnInit, OnChanges {
  @Input() nuType?: string;
  @Input() nuColor?: string | string[];
  @Input() nuRotate?: number;
  @Input() nuSpin?: boolean;
  @Input() nuTo?: string;
  private svgElement: SVGElement;
  private _default: NuIconOption = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public nuIconService: NuIconService,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, IconPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nuTypeChange = changes.nuType;
    if (nuTypeChange.currentValue !== nuTypeChange.previousValue) {
      this.setSvgElement();
      this.renderer.addClass(this.elementRef.nativeElement, `${this.nuType}`);
    }
  }

  setSvgElement() {
    const typeIcon = this.setSourceUrl(this.nuType);
    const toIcon = this.setSourceUrl(this.nuTo);
    let icons = [typeIcon];
    if (typeof typeIcon === "undefined") return;
    if (typeof toIcon !== "undefined") {
      icons = [...icons, toIcon];
    }
    this.nuIconService.getSvgs(...icons).subscribe(x => this.setSvgs(x));
  }

  setSvgs(svgs: string[]) {
    if (svgs && svgs.length > 0) {
      if (this.svgElement) {
        this.renderer.removeChild(
          this.elementRef.nativeElement,
          this.svgElement
        );
      } else {
        this.svgElement = this.buildSvg(svgs.shift());
        // this.setAnimates(svgs);
        this.setAttributes(this.svgElement);
      }
      this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
      this.cdr.markForCheck();
    }
  }

  setSourceUrl(type: string) {
    if (typeof type === "undefined") return;
    const split = type.split("-");
    const souce = split.shift();
    const souceUrl = NuSouceUrl[souce];
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
      if (this.nuSpin) this.renderer.addClass(svgEle, "nu-icon-spin");
    }
  }

  buildSvg(svgStr: string): SVGAElement {
    const result = this.document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    ) as SVGAElement;
    const svg = this.createSvg(svgStr);
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
    return {
      ele: svgEle,
      children: svgEle.querySelectorAll(
        "path, polyline, polygon, circle, line, rect"
      )
    };
  }

  setAttribute(
    svg: SVGElement,
    svgEle: SVGElement,
    attribute: string,
    def?: string
  ) {
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
      for (let i = 0; i < this.svgElement.children.length; i++) {
        let child = this.svgElement.children[i];
        let toChild = svg.children[i];
        if (
          child &&
          toChild &&
          child.nodeName === "path" &&
          toChild.nodeName === "path"
        ) {
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
