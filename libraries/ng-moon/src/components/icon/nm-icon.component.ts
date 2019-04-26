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
import { IconPrefix, NmIconOption, NmSouceUrl } from "./nm-icon.type";
import { fillDefault } from "../../core/util/option";
import { NmIconService } from "./nm-icon.service";
import { map } from "rxjs/operators";
import { Log } from "../../core/util/log";

@Component({
  selector: "nm-icon",
  templateUrl: "./nm-icon.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmIconComponent implements OnInit, OnChanges {
  @Input() nmType?: string;
  @Input() nmColor?: string | string[];
  @Input() nmRotate?: number;
  private default: NmIconOption = {};

  @HostBinding(`class.${IconPrefix}`) className() {
    return true;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private nmIconService: NmIconService
  ) {}

  ngOnInit() {
    fillDefault(this, this.default);
    this.setSvgElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmTypeChange = changes.nmType;
    nmTypeChange.currentValue !== nmTypeChange.previousValue && this.setSvgElement();
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
        this.renderer.appendChild(this.elementRef.nativeElement, x);
      });
  }

  // ngOnChanges() {
  //   console.log(this.nmType);
  // }

  setSourceUrl(type: string) {
    if (typeof type === "undefined") return;
    const split = type.split("-");
    const souceUrl = NmSouceUrl[split.shift()];
    const fileName = split.join("-");
    if (!souceUrl || !fileName) {
      throw Log.IconTypeNotFoundWarn();
    }
    return `${souceUrl}${fileName}`;
  }

  setAttributes(svgEle: SVGElement) {
    this.renderer.setAttribute(svgEle, "viewBox", "0 0 1024 1024");
    this.renderer.setAttribute(svgEle, "fill", "currentColor");
    this.renderer.setAttribute(svgEle, "width", "1em");
    this.renderer.setAttribute(svgEle, "height", "1em");
  }
}
