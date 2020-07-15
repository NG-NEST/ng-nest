import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { XTheme, XColorsTheme, X_THEME_COLORS, X_THEME_COLOR_KEYS } from './theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class XThemeService {
  private rootKey = '--x-';
  private merge: string = '#ffffff';
  private amounts: number[] = [0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  private backgrounds: number[] = [-0.2, -0.3, -0.4];
  private texts: number[][] = [
    [-0.5, 0],
    [-0.6, 0.2],
    [-0.7, 0.4]
  ];
  private borders: number[][] = [
    [-0.8, 0],
    [-0.9, 0.2]
  ];
  private exchanges: number[][] = [
    [-0.1, -0.1],
    [0.1, -0.1],
    [0.2, 0.2],
    [0.3, 0],
    [0.4, -0.4],
    [0.5, -0.2],
    [0.6, 0],
    [0.7, -0.4],
    [0.8, -0.4],
    [0.9, -0.2]
  ];
  private colorsProp: XColorsTheme = {};
  private colorsStyleEle: HTMLStyleElement;
  private renderer2: Renderer2;
  private declaration: CSSStyleDeclaration;

  constructor(@Inject(DOCUMENT) private doc: any, private factory: RendererFactory2) {
    this.renderer2 = this.factory.createRenderer(null, null);
    this.declaration = getComputedStyle(this.doc.documentElement);
  }

  setInitialTheme(theme?: XTheme) {
    this.setColors(theme?.colors);
    if (theme?.colors) Object.assign(X_THEME_COLORS, theme.colors);
  }

  setTheme(theme?: XTheme) {
    this.setColors(theme?.colors);
  }

  getTheme(): XTheme {
    return {
      colors: this.getColors()
    };
  }

  setColors(colors?: XColorsTheme) {
    colors = this.getColorsTheme(colors);
    for (let key in colors) {
      Object.assign(this.colorsProp, this.setRoot(key, colors[key]));
    }
    this.createColorsStyle();
  }

  getColors(colors?: XColorsTheme, prefix = this.rootKey): XColorsTheme {
    let result: XColorsTheme = {};
    Object.keys(this.colorsProp).forEach((x) => {
      result[x.replace(prefix, '')] = this.declaration.getPropertyValue(`${x}`).trim();
    });

    return result;
  }

  getColorsInProperty(colors?: XColorsTheme, prefix = this.rootKey): XColorsTheme {
    let result: XColorsTheme = {};
    Object.keys(colors as XColorsTheme).forEach((x) => {
      result[x] = this.declaration.getPropertyValue(`${prefix}${x}`).trim();
    });

    return result;
  }

  getColorsTheme(colors?: XColorsTheme) {
    if (typeof colors === 'undefined') colors = X_THEME_COLORS;
    else colors = Object.assign({}, X_THEME_COLORS, colors);
    return colors;
  }

  setRoot(color: string, value: string, prefix = this.rootKey) {
    let result: XColorsTheme = {};
    if (X_THEME_COLOR_KEYS.includes(color)) {
      for (let amount of this.amounts) {
        if (amount === 0) {
          result[`${prefix}${color}`] = value;
        } else {
          result[`${prefix}${color}${this.getSuffix(amount)}`] = toHex(mixColors(this.merge, value, amount));
        }
      }
    } else {
      result[`${prefix}${color}`] = value;
    }
    return result;
  }

  setDarkRoot(color: string, value: string, prefix = this.rootKey) {
    let result: XColorsTheme = {};
    const allColors = this.setRoot(color, value, '');
    if (X_THEME_COLOR_KEYS.includes(color) && !['background'].includes(color)) {
      const allColors = this.setRoot(color, value, prefix);
      this.exchanges.forEach((x) => {
        if (x[1] >= -0.1) {
          const curr = this.getSuffix(x[0]);
          const next = this.getSuffix(x[1]);
          result[`${prefix}${color}${curr}`] = allColors[`${prefix}${color}${next}`];
        }
      });
    } else if (['background'].includes(color)) {
      result = this.getDefineColors(Object.assign({}, this.getColorsInProperty(X_THEME_COLORS), allColors), '', true);
    }
    return result;
  }

  getDefineColors(colors?: XColorsTheme, prefix = this.rootKey, darken = false): XColorsTheme {
    let result: XColorsTheme = {};
    colors = this.getColorsTheme(colors);
    for (let key in colors) {
      Object.assign(result, this.setRoot(key, colors[key], prefix));
    }
    if (darken) {
      const colorsFunc = (nums: number[] | number[][], callback: Function) => {
        for (let num of nums) {
          for (let color in colors) {
            if (X_THEME_COLOR_KEYS.includes(color) && !['background'].includes(color)) {
              callback(num, color);
            }
          }
        }
      };
      colorsFunc(this.backgrounds, (background: number, color: string) => {
        const theme = this.getSuffix(background);
        result[`${prefix}${color}${theme}`] = result[`${prefix}background${theme.replace('a', '')}`];
      });
      colorsFunc(this.texts, (text: number[], color: string) => {
        const curr = this.getSuffix(text[0]);
        const next = this.getSuffix(text[1]);
        result[`${prefix}${color}${curr}`] = result[`${prefix}text${next}`];
      });
      colorsFunc(this.borders, (border: number[], color: string) => {
        const curr = this.getSuffix(border[0]);
        const next = this.getSuffix(border[1]);
        result[`${prefix}${color}${curr}`] = result[`${prefix}border${next}`];
      });
      colorsFunc(this.exchanges, (exchange: number[], color: string) => {
        const curr = this.getSuffix(exchange[0]);
        const next = this.getSuffix(exchange[1]);
        result[`${prefix}${color}${curr}`] = result[`${prefix}${color}${next}`];
      });
    }
    return result;
  }

  getSuffix(num: number): string {
    if (num > 0) {
      return `-${Math.abs(num * 1000)}`;
    } else if (num < 0) {
      return `-a${Math.abs(num * 1000)}`;
    }
    return '';
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
