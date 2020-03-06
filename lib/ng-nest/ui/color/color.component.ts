import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  Inject
} from '@angular/core';
import { XColorPrefix } from './color.type';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'x-color',
  templateUrl: './color.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColorComponent implements OnInit {
  @Input() label?: string = 'color';
  @Input() hex?: string;
  @Input() merge?: string = '#ffffff';
  @Input() amounts?: number[] = [-0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  colors: string[] = [];
  constructor(@Inject(DOCUMENT) private doc: any, private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XColorPrefix);
  }

  ngOnInit() {
    if (!this.hex) this.hex = getComputedStyle(this.doc.documentElement).getPropertyValue('--x-primary');
    if (this.hex) this.setColors();
  }

  setColors() {
    let colors = [];
    for (let amount of this.amounts) {
      colors.push(this.toHex(this.mixColors(this.merge, this.hex.trim(), amount)));
    }
    this.colors = colors;
  }

  mixColors(color1, color2, weight) {
    let rgb1 = this.toRgb(color1);
    let rgb2 = this.toRgb(color2);
    console.log(rgb1, rgb2);
    let weight1 = weight;
    let weight2 = 1 - weight;
    return {
      r: Math.round(rgb1.r * weight1 + rgb2.r * weight2),
      g: Math.round(rgb1.g * weight1 + rgb2.g * weight2),
      b: Math.round(rgb1.b * weight1 + rgb2.b * weight2)
    };
  }

  toHex(rgb) {
    return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
  }

  toRgb(hex) {
    if (hex.indexOf('#') == 0) hex = hex.slice(1);
    let num = parseInt(hex, 16);
    let r = num >> 16;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let g = (num >> 8) & 0x00ff;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    let b = num & 0x0000ff;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return { r: r, g: g, b: b };
  }
}
