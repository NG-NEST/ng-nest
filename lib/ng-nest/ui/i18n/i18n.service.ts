import { Injectable, inject } from '@angular/core';

import zh_CN from './languages/zh_CN';
import { XI18nLanguage, XI18nProperty, X_I18N } from './i18n.property';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XI18nService {
  private _locale: XI18nProperty = zh_CN;

  localeChange = new BehaviorSubject<XI18nProperty>(zh_CN);

  private locale = inject<XI18nProperty>(X_I18N, { optional: true });

  readonly L = (path: string, data?: Record<string, any>): string => this.translate(path, data);

  constructor() {
    this.setLocale(this.locale || zh_CN);
  }

  translate(path: string, data?: Record<string, any>) {
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach((key) => (content = content.replace(new RegExp(`%${key}%`, 'g'), data[key])));
      }
      return content;
    }
    return path;
  }

  getLocale(): XI18nProperty {
    return this._locale;
  }

  getLocaleId(): XI18nLanguage {
    return this._locale ? this._locale?.locale! : '';
  }

  setLocale(locale: XI18nProperty, forceRefresh = false) {
    if (!forceRefresh && this._locale && this._locale?.locale === locale.locale) {
      return;
    }

    this._locale = locale;
    this.localeChange.next(locale);
  }

  private _getObjectPath(obj: { [key: string]: any }, path: string): string | object | any {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}
