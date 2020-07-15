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
  [prop: string]: any;
}

export type XThemeKey = keyof XTheme;

export type XColors = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const X_THEME = new InjectionToken<XTheme>('x-theme');

export const X_THEME_PREFIX = '--x-';

export const X_THEME_MERGE = '#ffffff';

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
  text: '#303133',
  border: '#e6e6e6',
  background: '#f6f6f6'
};

export const X_THEME_DARK_COLORS: XColorsTheme = {
  text: '#d1d1d1',
  border: '#474747',
  background: '#0d0d0d'
};

export const X_THEME_COLOR_KEYS = Object.keys(X_THEME_COLORS);
