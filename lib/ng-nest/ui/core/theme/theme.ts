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
  [prop: string]: any;
}

export type XThemeKey = keyof XTheme;

export type XColors = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const X_THEME = new InjectionToken<XTheme>('x-theme');

export const X_THEME_COLORS: XColorsTheme = {
  primary: '#1976d2',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  text: '#303133',
  border: '#dcdfe6',
  background: '#e3e3e3'
};

export const X_THEME_COLOR_KEYS = Object.keys(X_THEME_COLORS);
