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
  fontSize?: string;
  fontSizeMini?: string;
  fontSizeSmall?: string;
  fontSizeMedium?: string;
  fontSizeLarge?: string;
  fontSizeBig?: string;
  fontVariant?: string;
  fontFamily?: string;
  fontCodeFamily?: string;
  lineHeight?: string;
  heightBig?: string;
  heightLarge?: string;
  heightMedium?: string;
  heightSmall?: string;
  heightMini?: string;
  paddingBig?: string;
  paddingLarge?: string;
  paddingMedium?: string;
  paddingSmall?: string;
  paddingMini?: string;
  borderStyle?: string;
  borderRadius?: string;
  borderSmallRadius?: string;
  borderWidth?: string;
  borderDeepWidth?: string;
  boxShadow?: string;
  boxShadowHover?: string;
  boxShadowTop?: string;
  boxShadowRight?: string;
  boxShadowBottom?: string;
  boxShadowLeft?: string;
  animationDurationSlow?: string;
  animationDurationBase?: string;
  animationDurationFast?: string;
  [property: string]: any;
}

export type XThemeKey = keyof XTheme;

export type XColors = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export const X_THEME = new InjectionToken<XTheme>('xTheme');

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
  fontSize: '0.875rem',
  fontSizeMini: '0.75rem',
  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.25rem',
  fontSizeBig: '1.5rem',
  fontVariant: 'tabular-nums',
  fontFamily:
    '-appleSystem, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sansSerif',
  fontCodeFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
  lineHeight: '1.75rem',
  heightBig: '2.75rem',
  heightLarge: '2.5rem',
  heightMedium: '2.25rem',
  heightSmall: '2rem',
  heightMini: '1.75rem',
  paddingBig: '1.5rem',
  paddingLarge: '1.25rem',
  paddingMedium: '1rem',
  paddingSmall: '0.75rem',
  paddingMini: '0.5rem',
  borderStyle: 'solid',
  borderRadius: '0.75rem',
  borderSmallRadius: '0.5rem',
  borderWidth: '0.0625rem',
  borderDeepWidth: '0.125rem',
  boxShadow: '0 0.0625rem 0.25rem 0.0625rem rgba(0, 0, 0, 0.15)',
  boxShadowHover: '0 0.0625rem 0.25rem 0.0625rem rgba(0, 0, 0, 0.3)',
  boxShadowTop: '0 -0.0625rem 0.25rem rgba(0, 0, 0, 0.15)',
  boxShadowRight: '0.0625rem 0 0.25rem rgba(0, 0, 0, 0.15)',
  boxShadowBottom: '0 0.0625rem 0.25rem rgba(0, 0, 0, 0.15)',
  boxShadowLeft: '-0.0625rem 0 0.25rem rgba(0, 0, 0, 0.15)',
  animationDurationSlow: '0.3s',
  animationDurationBase: '0.2s',
  animationDurationFast: '0.1s'
};

export const X_THEME_COLOR_KEYS = Object.keys(X_THEME_COLORS);
export const X_THEME_VARS_KEYS = Object.keys(X_THEME_VARS);
