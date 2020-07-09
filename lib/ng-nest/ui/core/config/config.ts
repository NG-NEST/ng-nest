import { XSize, XBoolean, XType } from '../interfaces';
import { InjectionToken } from '@angular/core';
import { XTheme } from '../theme';

export interface XConfig {
  components?: XComponentConfig;
  theme?: XTheme;
}

export interface XComponentConfig {
  button?: XButtonConfig;
}

export interface XButtonConfig {
  size?: XSize;
  type?: XType;
  plain?: XBoolean;
  round?: XBoolean;
  circle?: XBoolean;
}

export type XConfigKey = keyof XConfig;

export type XComponentConfigKey = keyof XComponentConfig;

export const X_CONFIG = new InjectionToken<XConfig>('x-config');
