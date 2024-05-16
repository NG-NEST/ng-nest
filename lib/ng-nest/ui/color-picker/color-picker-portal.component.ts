import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostListener,
  HostBinding,
  inject,
  input,
  output,
  model,
  viewChild,
  signal
} from '@angular/core';
import { XColorPickerPortalPrefix, XColorType } from './color-picker.property';
import { XConnectBaseAnimation, XPositionTopBottom } from '@ng-nest/ui/core';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';
import { Subject } from 'rxjs';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { XInputComponent } from '@ng-nest/ui/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: `${XColorPickerPortalPrefix}`,
  standalone: true,
  imports: [FormsModule, DragDropModule, XSliderSelectComponent, XTabsComponent, XTabComponent, XInputComponent],
  templateUrl: './color-picker-portal.component.html',
  styleUrls: ['./color-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe, PercentPipe],
  animations: [XConnectBaseAnimation]
})
export class XColorPickerPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    event.toState !== 'void' && this.animating.emit(false);
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start(event: { toState: any }) {
    event.toState !== 'void' && this.animating.emit(true);
  }

  panelRef = viewChild.required('panelRef', { read: ElementRef<HTMLElement> });
  plateRef = viewChild.required('plateRef', { read: ElementRef<HTMLElement> });
  transparentCom = viewChild.required('transparentCom', { read: XSliderSelectComponent });
  value = model<string>('');
  inputCom = input<XInputComponent>();
  placement = input<XPositionTopBottom>();

  animating = output<boolean>();
  nodeClick = output<string>();

  transparentRail = signal<HTMLElement | null>(null);
  sliderColorNum = signal(0);
  type = signal<XColorType | null>(null);
  offset = signal(0);
  panel = signal<DOMRect | null>(null);
  plate = signal<DOMRect | null>(null);
  transformX = signal(0);
  transformY = signal(0);
  initTransformX = signal(0);
  initTransformY = signal(0);
  drag = signal(false);

  rgba = signal<{ r?: number; g?: number; b?: number; a?: number }>({ a: 1 });
  hsla = signal<{ h?: number; s?: number; l?: number; a?: number; sp?: string; lp?: string }>({
    h: 0,
    a: 1
  });
  hex = signal<string>('');

  private unSubject = new Subject<void>();

  private renderer = inject(Renderer2);
  private decimal = inject(DecimalPipe);
  private percent = inject(PercentPipe);

  ngOnInit(): void {
    this.colorConvert();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  ngAfterViewInit() {
    this.panel.set(this.panelRef().nativeElement.getBoundingClientRect());
    this.plate.set(this.plateRef().nativeElement.getBoundingClientRect());
    this.offset.set((this.panel()!.width - this.plate()!.width) / 2);
    this.transparentRail.set(
      this.transparentCom().elementRef.nativeElement.querySelector('.x-slider-select-rail div')!
    );
    this.setTransform();
    this.setPlateBackground();
    this.setRailBackground();
  }

  hexChange() {
    if (this.drag() || !/(^#[0-9A-F]{6}$)/i.test(this.hex())) return;
    this.rgba.set(this.hexToRgba(this.hex()));
    this.hsla.set(this.rgbaToHsla(this.rgba()));
    this.setHslaPercent();
    this.setTransform();
    this.setPlateBackground();
    this.setValue();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  colorConvert() {
    const value = this.value()!;
    if (/^#/.test(value)) {
      this.hex.set(value);
      this.rgba.set(this.hexToRgba(this.hex()));
      this.hsla.set(this.rgbaToHsla(this.rgba()));
      this.setHslaPercent();
      this.type.set('hex');
    } else if (/rgb/.test(value)) {
      this.rgbaConvert(value);
      this.hex.set(this.rgbaToHex(this.rgba()));
      this.hsla.set(this.rgbaToHsla(this.rgba()));
      this.setHslaPercent();
      this.type.set('rgba');
    } else if (/hsl/.test(value)) {
      this.hslaConvert(value);
      this.rgba.set(this.hslaToRgba(this.hsla()));
      this.hex.set(this.rgbaToHex(this.rgba()));
      this.type.set('hsla');
    }
  }

  rgbaConvert(str: string) {
    let rgba = str
      .replace(/rgba?\(/, '')
      .replace(/rgb?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    if (rgba.length > 2) {
      this.rgba.set({
        r: Number(rgba[0]),
        g: Number(rgba[1]),
        b: Number(rgba[2]),
        a: Number(rgba.length > 3 ? rgba[3] : 1)
      });
    }
  }

  hslaConvert(str: string) {
    let hsla = str
      .replace(/hsla?\(/, '')
      .replace(/hsl?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    if (hsla.length > 2) {
      this.hsla.set({
        h: Number(hsla[0]),
        s: Number(hsla[1].replace('%', '')) / 100,
        l: Number(hsla[2].replace('%', '')) / 100,
        a: Number(hsla.length > 3 ? hsla[3] : 1)
      });
      this.setHslaPercent();
    }
  }

  plateClick(event: MouseEvent) {
    if (this.drag()) return;
    const rect = this.plateRef().nativeElement.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    this.transformX.set(left - this.offset());
    this.transformY.set(top - this.offset());
    this.initTransformX.set(this.transformX());
    this.initTransformY.set(this.transformY());
    this.setLetfTop(left, top);
  }

  setTransform() {
    let hsv = this.hslToHsv(this.hsla().h!, this.hsla().s!, this.hsla().l!);
    this.transformX.set(hsv.s * this.plate()!.width - this.offset());
    this.transformY.set((1 - hsv.v) * this.plate()!.height - this.offset());
    this.initTransformX.set(this.transformX());
    this.initTransformY.set(this.transformY());
  }

  started() {
    this.drag.set(true);
  }

  ended() {
    this.initTransformX.set(this.transformX());
    this.initTransformY.set(this.transformY());
    setTimeout(() => {
      this.drag.set(false);
    });
  }

  moved(drag: CdkDragMove) {
    const transform = drag.source.getFreeDragPosition();
    drag.source.reset();
    this.transformX.set(transform.x + this.initTransformX());
    this.transformY.set(transform.y + this.initTransformY());

    const left = this.transformX() + this.offset();
    const top = this.transformY() + this.offset();
    this.setLetfTop(left, top);
  }

  setLetfTop(left: number, top: number) {
    let s = left / this.plate()!.width;
    let v = 1 - top / this.plate()!.height;
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
    this.hsla.update((x) => {
      x.s = Number(this.decimal.transform(s, '1.2-2'));
      x.l = Number(this.decimal.transform(l, '1.2-2'));
      return x;
    });
    this.setHslaPercent();
    this.rgba.set(this.hslaToRgba(this.hsla()));
    this.hex.set(this.rgbaToHex(this.rgba()));
    this.setValue();
  }

  setHslaPercent() {
    this.hsla.update((x) => {
      x.sp = this.hsla().s === 0 ? '0%' : (this.percent.transform(this.hsla().s, '1.0-0') as string);
      return x;
    });
    this.hsla.update((x) => {
      x.lp = this.hsla().l === 0 ? '0%' : (this.percent.transform(this.hsla().l, '1.0-0') as string);
      return x;
    });
  }

  hueChange() {
    this.setPlateBackground();
    this.rgba.set(this.hslaToRgba(this.hsla()));
    this.hex.set(this.rgbaToHex(this.rgba()));
    this.setValue();
  }

  setPlateBackground() {
    this.renderer.setStyle(this.plateRef().nativeElement, 'background-color', `hsl(${this.hsla().h}, 100%, 50%)`);
  }

  setRailBackground() {
    this.renderer.setStyle(
      this.transparentRail,
      'background',
      `linear-gradient(to right, rgba(${this.rgba().r}, ${this.rgba().g}, ${this.rgba().b}, 0) 0%, rgba(${this.rgba().r}, ${this.rgba().g}, ${this.rgba().b}, 1) 100%)`
    );
  }

  transparentChange() {
    this.rgba.set(this.hslaToRgba(this.hsla()));
    this.hex.set(this.rgbaToHex(this.rgba()));
    this.setValue();
  }

  setValue() {
    this.setValueByType();
    this.setRailBackground();
    this.nodeClick.emit(this.value());
  }

  setValueByType() {
    if (this.type() === 'hex') {
      this.value.set(`${this.hex()}`);
    } else if (this.type() === 'rgba') {
      this.value.set(`rgba(${this.rgba().r}, ${this.rgba().g}, ${this.rgba().b}, ${this.rgba().a})`);
    } else if (this.type() === 'hsla') {
      this.value.set(`hsla(${this.hsla().h}, ${this.hsla().sp}, ${this.hsla().lp}, ${this.hsla().a})`);
    }
  }

  hslaToRgba(hsla: { h?: number; s?: number; l?: number; a?: number }) {
    let r, g, b;
    let [h, s, l] = [hsla.h as number, hsla.s as number, hsla.l as number];
    if (s == 0) {
      r = g = b = l;
    } else {
      let hue2rgb = (p: number, q: number, t: number) => {
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
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: Number(hsla.a)
    };
  }

  rgbaToHex(rgba: { r?: number; g?: number; b?: number; a?: number }) {
    let hex = [
      (rgba.r as number).toString(16),
      (rgba.g as number).toString(16),
      (rgba.b as number).toString(16),
      Math.round(255 * (rgba.a as number)).toString(16)
    ];
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
    let [r, g, b] = [(rgba.r as number) / 255, (rgba.g as number) / 255, (rgba.b as number) / 255];
    let [max, min] = [Math.max(r, g, b), Math.min(r, g, b)];
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

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

  hslToHsv(h: number, s: number, l: number) {
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

  repeatWord(word: string, num: number) {
    let result = '';
    for (let i = 0; i < num; i++) {
      result += word;
    }
    return result;
  }

  repeatLetter(word: string, num: number) {
    let result = '';
    for (let letter of word) {
      result += this.repeatWord(letter, num);
    }
    return result;
  }
}
