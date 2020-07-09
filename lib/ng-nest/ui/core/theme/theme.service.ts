import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { XTheme, XColorsTheme, X_THEME_COLORS, X_THEME_COLOR_KEYS } from './theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class XThemeService {
  private rootKey = '--x-';
  private merge: string = '#ffffff';
  private amounts: number[] = [0, -0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  private colorsProp: { [prop: string]: string } = {};
  private colorsStyleEle: HTMLStyleElement;
  private renderer2: Renderer2;

  constructor(@Inject(DOCUMENT) private doc: any, private factory: RendererFactory2) {
    this.renderer2 = this.factory.createRenderer(null, null);
  }

  setTheme(theme?: XTheme) {
    this.setColors(theme?.colors);
  }

  setColors(colors?: XColorsTheme) {
    if (typeof colors === 'undefined') colors = X_THEME_COLORS;
    else colors = Object.assign(X_THEME_COLORS, colors);
    for (let key in colors) {
      this.setRoot(key, colors[key]);
    }
  }

  setRoot(color: string, value: string) {
    if (X_THEME_COLOR_KEYS.includes(color)) {
      for (let amount of this.amounts) {
        if (amount === 0) {
          this.colorsProp[`${this.rootKey}${color}`] = value;
        } else if (amount < 0) {
          this.colorsProp[`${this.rootKey}${color}-a${Math.abs(amount * 1000)}`] = toHex(mixColors(this.merge, value, amount));
        } else if (amount > 0) {
          this.colorsProp[`${this.rootKey}${color}-${amount * 1000}`] = toHex(mixColors(this.merge, value, amount));
        }
      }
    } else {
      this.colorsProp[`${this.rootKey}${color}`] = value;
    }

    this.createColorsStyle();
  }

  createColorsStyle() {
    if (this.colorsStyleEle) this.renderer2.removeChild(this.colorsStyleEle.parentNode, this.colorsStyleEle);
    const styles = Object.entries(this.colorsProp)
      .map((x) => `${x[0]}: ${x[1]};`)
      .join('');
    this.colorsStyleEle = this.renderer2.createElement('style');
    this.colorsStyleEle.innerHTML = `.x-theme-colors{${styles}}`;
    this.doc.documentElement.getElementsByTagName('head')[0].appendChild(this.colorsStyleEle);
    this.renderer2.addClass(this.doc.documentElement, 'x-theme-colors');
  }
}

export function mixColors(color1: string, color2: string, weight: number) {
  let rgb1 = toRgb(color1);
  let rgb2 = toRgb(color2);
  let weight1 = weight;
  let weight2 = 1 - weight;
  let result: { r: number; g: number; b: number };

  const inRange = (num: number) => {
    return num > 255 ? 255 : num < 0 ? 0 : num;
  };

  result = {
    r: inRange(Math.round(rgb1.r * weight1 + rgb2.r * weight2)),
    g: inRange(Math.round(rgb1.g * weight1 + rgb2.g * weight2)),
    b: inRange(Math.round(rgb1.b * weight1 + rgb2.b * weight2))
  };

  return result;
}

export function toHex(rgb: { r: number; g: number; b: number }) {
  return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}

export function toRgb(hex: string) {
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
