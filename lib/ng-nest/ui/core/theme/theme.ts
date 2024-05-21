import { InjectionToken } from '@angular/core';

export interface XTheme {
  colors?: XColorsTheme;
  vars?: XVarsTheme;
}

export interface XColorsTheme {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  text?: string;
  border?: string;
  background?: string;
  [property: string]: any;
}

export interface XVarsTheme {
  black?: string;
  white?: string;
  'font-size'?: string;
  'font-size-mini'?: string;
  'font-size-small'?: string;
  'font-size-medium'?: string;
  'font-size-large'?: string;
  'font-size-big'?: string;
  'font-variant'?: string;
  'font-family'?: string;
  'font-code-family'?: string;
  'line-height'?: string;
  'height-big'?: string;
  'height-large'?: string;
  'height-medium'?: string;
  'height-small'?: string;
  'height-mini'?: string;
  'padding-big'?: string;
  'padding-large'?: string;
  'padding-medium'?: string;
  'padding-small'?: string;
  'padding-mini'?: string;
  'border-style'?: string;
  'border-radius'?: string;
  'border-small-radius'?: string;
  'border-width'?: string;
  'border-deep-width'?: string;
  'box-shadow'?: string;
  'box-shadow-hover'?: string;
  'box-shadow-top'?: string;
  'box-shadow-right'?: string;
  'box-shadow-bottom'?: string;
  'box-shadow-left'?: string;
  'animation-duration-slow'?: string;
  'animation-duration-base'?: string;
  'animation-duration-fast'?: string;
  [property: string]: any;
}

export type XThemeKey = keyof XTheme;

export type XColors = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const X_THEME = new InjectionToken<XTheme>('x-theme');

export const X_THEME_PREFIX = '--x-';

export const X_THEME_MERGE = '#ffffff';

export const X_THEME_BLACK_MERGE = '#cccccc';

export const X_THEME_AMOUNTS = [
  0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9
];

export const X_THEME_BACKGROUNDS = [-0.2, -0.3, -0.4];

export const X_THEME_TEXTS = [
  [-0.5, 0],
  [-0.6, 0.2],
  [-0.7, 0.4]
];

export const X_THEME_BORDERS = [
  [-0.8, 0],
  [-0.9, 0.2]
];

export const X_THEME_EXCHANGES = [
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

export const X_THEME_COLORS: XColorsTheme = {
  primary: '#3B82F6',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  text: '#333333',
  border: '#efefef',
  background: '#ffffff'
};

export const X_THEME_DARK_COLORS: XColorsTheme = {
  text: '#dddddd',
  border: '#252022',
  background: '#0f0f11'
};

export const X_THEME_VARS: XVarsTheme = {
  black: '#000000',
  white: '#ffffff',
  'font-size': '0.875rem',
  'font-size-mini': '0.75rem',
  'font-size-small': '0.875rem',
  'font-size-medium': '1rem',
  'font-size-large': '1.25rem',
  'font-size-big': '1.5rem',
  'font-variant': 'tabular-nums',
  'font-family':
    '-apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
  'font-code-family': 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
  'line-height': '1.75rem',
  'height-big': '2.75rem',
  'height-large': '2.5rem',
  'height-medium': '2.25rem',
  'height-small': '2rem',
  'height-mini': '1.75rem',
  'padding-big': '1.5rem',
  'padding-large': '1.25rem',
  'padding-medium': '1rem',
  'padding-small': '0.75rem',
  'padding-mini': '0.5rem',
  'border-style': 'solid',
  'border-radius': '0.75rem',
  'border-small-radius': '0.5rem',
  'border-width': '0.0625rem',
  'border-deep-width': '0.125rem',
  'box-shadow': '0 0.0625rem 0.1875rem 0.0625rem rgba(0, 0, 0, 0.15)',
  'box-shadow-hover': '0 0.125rem 0.1875rem 0.0625rem rgba(0, 0, 0, 0.3)',
  'box-shadow-top': '0 -0.125rem 0.1875rem rgba(0, 0, 0, 0.15)',
  'box-shadow-right': '0.125rem 0 0.1875rem rgba(0, 0, 0, 0.15)',
  'box-shadow-bottom': '0 0.125rem 0.1875rem rgba(0, 0, 0, 0.15)',
  'box-shadow-left': '-0.125rem 0 0.1875rem rgba(0, 0, 0, 0.15)',
  'animation-duration-slow': '0.3s',
  'animation-duration-base': '0.2s',
  'animation-duration-fast': '0.1s'
};

export const X_THEME_COLOR_KEYS = Object.keys(X_THEME_COLORS);
export const X_THEME_VARS_KEYS = Object.keys(X_THEME_VARS);
