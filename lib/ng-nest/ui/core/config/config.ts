import { XSize, XBoolean, XType } from '../interfaces';
import { InjectionToken } from '@angular/core';

export interface XConfig {
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

export const X_CONFIG = new InjectionToken<XConfig>('x-config');
