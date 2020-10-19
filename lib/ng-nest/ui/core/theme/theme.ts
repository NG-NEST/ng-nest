import { InjectionToken } from '@angular/core';

export interface XTheme {
  colors?: XColorsTheme;
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

export type XThemeKey = keyof XTheme;

export type XColors = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const X_THEME = new InjectionToken<XTheme>('x-theme');

export const X_THEME_PREFIX = '--x-';

export const X_THEME_MERGE = '#ffffff';

export const X_THEME_BLACK_MERGE = '#cccccc';

export const X_THEME_AMOUNTS = [0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

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
  primary: '#1976d2',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  text: '#333333',
  border: '#dddddd',
  background: '#fafafa'
};

export const X_THEME_DARK_COLORS: XColorsTheme = {
  text: '#dddddd',
  border: '#424242',
  background: '#1e1e1f'
};

export const X_THEME_COLOR_KEYS = Object.keys(X_THEME_COLORS);
