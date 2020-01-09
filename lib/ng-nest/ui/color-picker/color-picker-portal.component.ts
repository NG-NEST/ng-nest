import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  NgZone,
  Renderer2,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { XColorPickerPortal } from "./color-picker.type";
import { XIsEmpty } from "@ng-nest/ui/core";
import { XSliderSelectComponent } from "@ng-nest/ui/slider-select";
import { Subscription } from "rxjs";
import { CdkDragMove } from "@angular/cdk/drag-drop";
import { DOCUMENT, DecimalPipe, PercentPipe } from "@angular/common";

@Component({
  selector: "x-color-picker-portal",
  templateUrl: "./color-picker-portal.component.html",
  styleUrls: ["./color-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe, PercentPipe]
})
export class XColorPickerPortalComponent implements OnInit, OnDestroy {
  value;
  @ViewChild("panelRef", { static: true }) panelRef: ElementRef;
  @ViewChild("plateRef", { static: true }) plateRef: ElementRef;
  @ViewChild("transparentCom", { static: true }) transparentCom: XSliderSelectComponent;
  transparentRail: HTMLElement;
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  sliderColorNum = 0;
  type = "";
  offset = 0;
  panel: DOMRect;
  plate: DOMRect;

  rgba: { r?: number; g?: number; b?: number; a?: number } = { a: 1 };
  hsla: { h?: number; s?: number; l?: number; a?: number; sp?: string; lp?: string } = { h: 0, a: 1 };
  hex: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(XColorPickerPortal) public option: any,
    @Inject(DOCUMENT) private doc: Document,
    public ngZone: NgZone,
    public cdr: ChangeDetectorRef,
    public decimal: DecimalPipe,
    public percent: PercentPipe
  ) {
    this.init();
  }

  ngOnInit(): void {
    this.valueChange$ = this.option.valueChange.subscribe(x => {
      this.option.value = x;
      this.init();
      this.cdr.markForCheck();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen("document", "click", () => {
          this.option.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this.valueChange$ && this.valueChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  ngAfterViewInit() {
    this.panel = this.panelRef.nativeElement.getBoundingClientRect();
    this.plate = this.plateRef.nativeElement.getBoundingClientRect();
    this.offset = (this.panel.width - this.plate.width) / 2;
    this.transparentRail = this.transparentCom.elementRef.nativeElement.querySelector(".x-slider-select-rail div");
    this.hueChange();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.value = this.option.value;
    } else {
      this.value = this.getPrimary();
    }
    this.colorConvert();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {}

  colorConvert() {
    if (/^#/.test(this.value)) {
      this.hex = this.value;
      this.rgba = this.hexToRgba(this.value);
      this.hsla = this.rgbaToHsla(this.rgba);
      this.setHslaPercent();
    } else if (/rgb/.test(this.value)) {
      this.rgbaConvert(this.value);
      this.hex = this.rgbaToHex(this.value);
      this.hsla = this.rgbaToHsla(this.rgba);
      this.setHslaPercent();
    }
  }

  rgbaConvert(str) {
    let rgba = str
      .replace(/rgba?\(/, "")
      .replace(/rgb?\(/, "")
      .replace(/\)/, "")
      .replace(/[\s+]/g, "")
      .split(",");
    if (rgba.length > 2) {
      this.rgba = { r: rgba[0], g: rgba[1], b: rgba[2], a: rgba.length > 3 ? rgba[3] : 1 };
    }
  }

  dragStarted() {}

  dragMoved(drag: CdkDragMove) {
    const transform = drag.source._dragRef["_activeTransform"];
    let left = transform.x + this.offset;
    let top = transform.y + this.offset;
    let s = left / this.plate.width;
    let v = 1 - top / this.plate.height;
    let l = ((2 - s) * v) / 2;
    if (l != 0) {
      if (l === 1) {
        s = 0;
      } else if (l < 0.5) {
        s = (s * v) / (l * 2);
      } else {
        s = (s * v) / (2 - l * 2);
      }
    }
    [this.hsla.s, this.hsla.l] = [
      Number(this.decimal.transform(s, "1.2-2")),
      Number(this.decimal.transform(l, "1.2-2"))
    ];
    this.setHslaPercent();
    this.setValue();
  }

  setHslaPercent() {
    this.hsla.sp = this.hsla.s === 0 ? "0%" : this.percent.transform(this.hsla.s, "1.0-0");
    this.hsla.lp = this.hsla.l === 0 ? "0%" : this.percent.transform(this.hsla.l, "1.0-0");
  }

  dragEnded() {}

  getPrimary() {
    return getComputedStyle(this.doc.documentElement)
      .getPropertyValue("--x-primary")
      .trim();
  }

  hueChange() {
    this.renderer.setStyle(this.plateRef.nativeElement, "background-color", `hsl(${this.hsla.h}, 100%, 50%)`);
    this.setValue();
  }

  transparentChange() {
    this.setValue();
  }

  setValue() {
    Object.assign(this.rgba, this.hslaToRgba(this.hsla));
    this.hex = this.rgbaToHex(this.rgba);
    this.value = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`;
    this.renderer.setStyle(
      this.transparentRail,
      "background",
      `linear-gradient(to right, rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, 0) 0%, rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, 1) 100%)`
    );
    this.option.nodeEmit(this.value);
    this.cdr.markForCheck();
  }

  hslaToRgba(hsla: { h?: number; s?: number; l?: number; a?: number }) {
    let r, g, b;
    let [h, s, l] = [hsla.h, hsla.s, hsla.l];
    if (s == 0) {
      r = g = b = l;
    } else {
      let hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h / 360 + 1 / 3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: hsla.a };
  }

  rgbaToHex(rgba: { r?: number; g?: number; b?: number; a?: number }) {
    let ha = Math.round(255 * rgba.a).toString(16);
    if (ha === "ff") ha = "";
    if (ha.length === 1) ha = `0${ha}`;
    return `#${((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1)}${ha}`;
  }

  rgbaToHsla(rgba: { r?: number; g?: number; b?: number; a?: number }) {
    let [r, g, b] = [rgba.r / 255, rgba.g / 255, rgba.b / 255];
    let [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: s, l: l, a: rgba.a };
  }

  hexToRgba(hex: string) {
    let hexNum = hex.substring(1);
    let a = 1;
    if (hexNum.length === 8) {
      a = Number(this.decimal.transform(Number("0x" + hexNum.slice(-2)) / 255, "1.2-2"));
      hexNum = hexNum.substring(0, hexNum.length - 2);
    }
    let num = Number("0x" + (hexNum.length < 6 ? this.repeatLetter(hexNum, 2) : hexNum));
    return { r: num >> 16, g: (num >> 8) & 0xff, b: num & 0xff, a: a };
  }

  repeatWord(word, num) {
    let result = "";
    for (let i = 0; i < num; i++) {
      result += word;
    }
    return result;
  }

  repeatLetter(word, num) {
    let result = "";
    for (let letter of word) {
      result += this.repeatWord(letter, num);
    }
    return result;
  }
}
