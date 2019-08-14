import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { IconPrefix, NmIconOption, NmIconSourceEnum } from "./nm-icon.type";
import { NmIconService } from "./nm-icon.service";
import { map } from "rxjs/operators";
import { warnIconTypeNotFound, fillDefault } from "../../../core/util";

// 来源路径对应
export const NmSouceUrl = {
  adf: `${NmIconSourceEnum.AntDesign}/fill/`,
  ado: `${NmIconSourceEnum.AntDesign}/outline/`,
  adt: `${NmIconSourceEnum.AntDesign}/twotone/`,
  eaf: `${NmIconSourceEnum.Eva}/fill/`,
  eao: `${NmIconSourceEnum.Eva}/outline/`,
  fto: `${NmIconSourceEnum.Feather}/`,
  fab: `${NmIconSourceEnum.FontAwesome}/brands/`,
  far: `${NmIconSourceEnum.FontAwesome}/regular/`,
  fas: `${NmIconSourceEnum.FontAwesome}/solid/`,
  md: `${NmIconSourceEnum.MaterialDesign}/`
};

@Component({
  selector: "nm-icon",
  templateUrl: "./nm-icon.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmIconComponent implements OnInit, OnChanges {
  @Input() nmType?: string;
  @Input() nmColor?: string | string[];
  @Input() nmRotate?: number;
  private svgElement: SVGElement;
  private default: NmIconOption = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public nmIconService: NmIconService
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, IconPrefix);
  }

  ngOnInit() {
    fillDefault(this, this.default);
    this.setSvgElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmTypeChange = changes.nmType;
    if (nmTypeChange.currentValue !== nmTypeChange.previousValue) {
      this.setSvgElement();
      this.renderer.addClass(this.elementRef.nativeElement, `${this.nmType}`);
    }
  }

  setSvgElement() {
    const typeUrl = this.setSourceUrl(this.nmType);
    if (typeof typeUrl === "undefined") return;
    this.nmIconService
      .getSvgElement(typeUrl)
      .pipe(
        map(x => {
          this.setAttributes(x);
          return x;
        })
      )
      .subscribe(x => {
        if (x) {
          if (this.svgElement) {
            this.renderer.removeChild(
              this.elementRef.nativeElement,
              this.svgElement
            );
          } else {
            this.svgElement = x;
          }
          this.renderer.appendChild(
            this.elementRef.nativeElement,
            this.svgElement
          );
        }
      });
  }

  setSourceUrl(type: string) {
    if (typeof type === "undefined") return;
    const split = type.split("-");
    const souceUrl = NmSouceUrl[split.shift()];
    const fileName = split.join("-");
    if (!souceUrl || !fileName) {
      warnIconTypeNotFound();
    }
    return `${souceUrl}${fileName}`;
  }

  setAttributes(svgEle: SVGElement) {
    if (svgEle) {
      this.renderer.setAttribute(svgEle, "viewBox", "0 0 1024 1024");
      this.renderer.setAttribute(svgEle, "fill", "currentColor");
      this.renderer.setAttribute(svgEle, "width", "1em");
      this.renderer.setAttribute(svgEle, "height", "1em");
    }
  }
}
