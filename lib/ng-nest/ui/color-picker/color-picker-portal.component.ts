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
import { Subscription } from "rxjs";
import { CdkDragMove } from "@angular/cdk/drag-drop";
import { DOCUMENT, DecimalPipe } from "@angular/common";

@Component({
  selector: "x-color-picker-portal",
  templateUrl: "./color-picker-portal.component.html",
  styleUrls: ["./color-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class XColorPickerPortalComponent implements OnInit, OnDestroy {
  value;
  @ViewChild("panelRef", { static: true }) panelRef: ElementRef;
  @ViewChild("plateRef", { static: true }) plateRef: ElementRef;
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  sliderColorNum = 0;
  transparent = 1;
  type = "";
  offset = 0;
  panel: DOMRect;
  plate: DOMRect;

  rgba: { r?: number; g?: number; b?: number; a?: number } = { a: 1 };
  hsla: { h?: number; s?: number; l?: number; a?: number } = { h: 0, a: 1 };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(XColorPickerPortal) public option: any,
    @Inject(DOCUMENT) private doc: Document,
    public ngZone: NgZone,
    public cdr: ChangeDetectorRef,
    public decimal: DecimalPipe
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
    this.sliderChange();
  }

  init() {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    } else {
      this.value = this.getPrimary();
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  setDefault() {}

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
    this.setValue();
  }

  dragEnded() {}

  getPrimary() {
    return getComputedStyle(this.doc.documentElement)
      .getPropertyValue("--x-primary")
      .trim();
  }

  sliderChange() {
    this.renderer.setStyle(this.plateRef.nativeElement, "background-color", `hsl(${this.hsla.h}, 100%, 50%)`);
    this.setValue();
  }

  transparentChange() {
    this.hsla.a = this.transparent;
    this.setValue();
  }

  setValue() {
    this.value = `hsla(${this.hsla.h}, ${this.hsla.s * 100}%, ${this.hsla.l * 100}%, ${this.transparent})`;
    Object.assign(this.rgba, this.hslaToRgba(this.hsla));
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
}
