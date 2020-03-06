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
} from '@angular/core';
import { XColorPickerPortal, XColorType } from './color-picker.type';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';
import { Subscription } from 'rxjs';
import { CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { DOCUMENT, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'x-color-picker-portal',
  templateUrl: './color-picker-portal.component.html',
  styleUrls: ['./color-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe, PercentPipe]
})
export class XColorPickerPortalComponent implements OnInit, OnDestroy {
  value;
  @ViewChild('panelRef', { static: true }) panelRef: ElementRef;
  @ViewChild('plateRef', { static: true }) plateRef: ElementRef;
  @ViewChild('transparentCom', { static: true }) transparentCom: XSliderSelectComponent;
  transparentRail: HTMLElement;
  valueChange$: Subscription | null = null;
  docClickFunction: Function;

  sliderColorNum = 0;
  type: XColorType;
  offset = 0;
  panel: DOMRect;
  plate: DOMRect;
  transform = { x: 0, y: 0 };
  initTransform = { x: 0, y: 0 };
  drag = false;

  rgba: { r?: number; g?: number; b?: number; a?: number } = { a: 1 };
  hsla: { h?: number; s?: number; l?: number; a?: number; sp?: string; lp?: string } = { h: 0, a: 1 };
  hex: string;

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    @Inject(XColorPickerPortal) public option: any,
    @Inject(DOCUMENT) public doc: any,
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
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          if (!this.drag) this.option.closePortal();
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
    this.transparentRail = this.transparentCom.elementRef.nativeElement.querySelector('.x-slider-select-rail div');
    this.setTransform();
    this.setPlateBackground();
    this.setRailBackground();
  }

  hexChange() {
    this.rgba = this.hexToRgba(this.hex);
    this.hsla = this.rgbaToHsla(this.rgba);
    this.setHslaPercent();
    this.setTransform();
    this.setPlateBackground();
    this.setValue();
  }

  rgbaChange() {}

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
      this.rgba = this.hexToRgba(this.hex);
      this.hsla = this.rgbaToHsla(this.rgba);
      this.setHslaPercent();
      this.type = 'hex';
    } else if (/rgb/.test(this.value)) {
      this.rgbaConvert(this.value);
      this.hex = this.rgbaToHex(this.rgba);
      this.hsla = this.rgbaToHsla(this.rgba);
      this.setHslaPercent();
      this.type = 'rgba';
    } else if (/hsl/.test(this.value)) {
      this.hslaConvert(this.value);
      this.rgba = this.hslaToRgba(this.hsla);
      this.hex = this.rgbaToHex(this.rgba);
      this.type = 'hsla';
    }
  }

  rgbaConvert(str) {
    let rgba = str
      .replace(/rgba?\(/, '')
      .replace(/rgb?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    if (rgba.length > 2) {
      this.rgba = {
        r: Number(rgba[0]),
        g: Number(rgba[1]),
        b: Number(rgba[2]),
        a: Number(rgba.length > 3 ? rgba[3] : 1)
      };
    }
  }

  hslaConvert(str) {
    let hsla = str
      .replace(/hsla?\(/, '')
      .replace(/hsl?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    if (hsla.length > 2) {
      this.hsla = {
        h: Number(hsla[0]),
        s: Number(hsla[1].replace('%', '')) / 100,
        l: Number(hsla[2].replace('%', '')) / 100,
        a: Number(hsla.length > 3 ? hsla[3] : 1)
      };
      this.setHslaPercent();
    }
  }

  plateClick(event: MouseEvent) {
    if (this.drag) return;
    const rect = this.plateRef.nativeElement.getBoundingClientRect();
    let left = event.clientX - rect.left;
    let top = event.clientY - rect.top;
    this.transform = { x: left - this.offset, y: top - this.offset };
    this.initTransform = { x: this.transform.x, y: this.transform.y };
    this.setLetfTop(left, top);
  }

  setTransform() {
    let hsv = this.hslToHsv(this.hsla.h, this.hsla.s, this.hsla.l);
    this.transform.x = hsv.s * this.plate.width - this.offset;
    this.transform.y = (1 - hsv.v) * this.plate.height - this.offset;
    this.initTransform = { x: this.transform.x, y: this.transform.y };
  }

  started() {
    this.drag = true;
  }

  ended(drag?: CdkDragEnd) {
    this.initTransform = { x: this.transform.x, y: this.transform.y };
    setTimeout(() => {
      this.drag = false;
    });
  }

  moved(drag: CdkDragMove) {
    const transform = drag.source.getFreeDragPosition();
    drag.source.reset();
    this.transform = { x: transform.x + this.initTransform.x, y: transform.y + this.initTransform.y };
    let left = this.transform.x + this.offset;
    let top = this.transform.y + this.offset;
    this.setLetfTop(left, top);
  }

  setLetfTop(left: number, top: number) {
    let s = left / this.plate.width;
    let v = 1 - top / this.plate.height;
    let l = ((2 - s) * v) / 2;
    if (l !== 0) {
      if (l === 1) {
        s = 0;
      } else if (l < 0.5) {
        s = (s * v) / (l * 2);
      } else {
        s = (s * v) / (2 - l * 2);
      }
    }
    [this.hsla.s, this.hsla.l] = [
      Number(this.decimal.transform(s, '1.2-2')),
      Number(this.decimal.transform(l, '1.2-2'))
    ];
    this.setHslaPercent();
    Object.assign(this.rgba, this.hslaToRgba(this.hsla));
    this.hex = this.rgbaToHex(this.rgba);
    this.setValue();
  }

  setHslaPercent() {
    this.hsla.sp = this.hsla.s === 0 ? '0%' : this.percent.transform(this.hsla.s, '1.0-0');
    this.hsla.lp = this.hsla.l === 0 ? '0%' : this.percent.transform(this.hsla.l, '1.0-0');
  }

  getPrimary() {
    return getComputedStyle(this.doc.documentElement)
      .getPropertyValue('--x-primary')
      .trim();
  }

  hueChange() {
    this.setPlateBackground();
    Object.assign(this.rgba, this.hslaToRgba(this.hsla));
    this.hex = this.rgbaToHex(this.rgba);
    this.setValue();
  }

  setPlateBackground() {
    this.renderer.setStyle(this.plateRef.nativeElement, 'background-color', `hsl(${this.hsla.h}, 100%, 50%)`);
  }

  setRailBackground() {
    this.renderer.setStyle(
      this.transparentRail,
      'background',
      `linear-gradient(to right, rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, 0) 0%, rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, 1) 100%)`
    );
  }

  transparentChange() {
    Object.assign(this.rgba, this.hslaToRgba(this.hsla));
    this.hex = this.rgbaToHex(this.rgba);
    this.setValue();
  }

  setValue() {
    this.setValueByType();
    this.setRailBackground();
    this.option.nodeEmit(this.value);
    this.cdr.markForCheck();
  }

  setValueByType() {
    if (this.type === 'hex') {
      this.value = `${this.hex}`;
    } else if (this.type === 'rgba') {
      this.value = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`;
    } else if (this.type === 'hsla') {
      this.value = `hsla(${this.hsla.h}, ${this.hsla.sp}, ${this.hsla.lp}, ${this.hsla.a})`;
    }
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
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: Number(hsla.a) };
  }

  rgbaToHex(rgba: { r?: number; g?: number; b?: number; a?: number }) {
    let hex = [rgba.r.toString(16), rgba.g.toString(16), rgba.b.toString(16), Math.round(255 * rgba.a).toString(16)];
    hex.forEach((x, index) => {
      if (index === 3 && x === 'ff') {
        hex[index] = '';
      }
      if (x.length === 1) {
        hex[index] = '0' + x;
      }
    });
    return `#${hex.join('')}`;
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

    return {
      h: Math.round(h * 360),
      s: Number(this.decimal.transform(s, '1.2-2')),
      l: Number(this.decimal.transform(l, '1.2-2')),
      a: Number(rgba.a)
    };
  }

  hexToRgba(hex: string) {
    let hexNum = hex.substring(1);
    let a = 1;
    if (hexNum.length === 8) {
      a = Number(this.decimal.transform(Number('0x' + hexNum.slice(-2)) / 255, '1.2-2'));
      hexNum = hexNum.substring(0, hexNum.length - 2);
    }
    let num = Number('0x' + (hexNum.length < 6 ? this.repeatLetter(hexNum, 2) : hexNum));
    return { r: num >> 16, g: (num >> 8) & 0xff, b: num & 0xff, a: a };
  }

  hslToHsv(h, s, l) {
    let hHsv, sHsv, v;

    hHsv = h;

    if (l == 0) {
      sHsv = 0;
      v = 0;
    } else if (l > 0 && l <= 0.5) {
      sHsv = (2 * s) / (1 + s);
      v = l * (1 + s);
    } else {
      sHsv = (2 * s - 2 * s * l) / (s - s * l + l);
      v = s - s * l + l;
    }

    return {
      h: hHsv,
      s: Number(this.decimal.transform(sHsv, '1.2-2')),
      v: Number(this.decimal.transform(v, '1.2-2'))
    };
  }

  repeatWord(word, num) {
    let result = '';
    for (let i = 0; i < num; i++) {
      result += word;
    }
    return result;
  }

  repeatLetter(word, num) {
    let result = '';
    for (let letter of word) {
      result += this.repeatWord(letter, num);
    }
    return result;
  }
}
