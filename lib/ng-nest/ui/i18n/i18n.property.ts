import { InjectionToken } from '@angular/core';

/**
 * I18n
 * @selector xI18n
 * @decorator Pipe
 */
export const XI18nPrefix = 'xI18n';

export interface XI18nProperty {
  locale: string;
  comment?: {
    comments: string;
    giveALike: string;
    reply: string;
    more: string;
  };
  [property: string]: any;
}

export const X_I18N = new InjectionToken<XI18nProperty>('x-i18n');
