import { Injectable } from '@angular/core';
import { XI18nService, XI18nProperty, zh_CN, en_US } from '@ng-nest/ui/i18n';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  defaultLang: string;
  langs = ['zh_CN', 'en_US'];
  cacheLangs: { [lang: string]: XI18nProperty } = {};
  versions: string[] = [];
  version = '11.2.12';
  navName = 'NG-NEST';

  get lang() {
    let lg = localStorage.getItem('Lang');
    if (!lg) {
      localStorage.setItem('Lang', this.defaultLang);
      return this.defaultLang;
    }
    return lg;
  }

  set lang(value: string) {
    localStorage.setItem('Lang', value);
  }
  constructor(public i18n: XI18nService, public http: HttpClient, private location: Location, private meta: Meta) {
    this.defaultLang = this.i18n.getLocaleId();
  }

  init() {
    this.setLocale(this.checkPath());
    this.getVersions();
  }

  checkPath() {
    const path = this.location.path();
    let lang = this.langs.find((x) => path.indexOf(`/${x}/`) >= 0);
    return lang;
  }

  setLocale(locale?: string, callback?: () => void) {
    let lang = locale;
    if (!lang) lang = this.lang;
    if (this.cacheLangs[lang]) {
      this.lang = lang as string;
      this.i18n.setLocale(this.cacheLangs[lang], true);
      this.setMeta();
      callback && callback();
    } else {
      this.http.get(`/assets/i18n/${lang}.json`).subscribe((x: XI18nProperty) => {
        this.lang = lang as string;
        const localeProps = this.setLocaleProps(x, this.lang);
        this.i18n.setLocale(localeProps, true);
        this.setMeta();
        this.cacheLangs[this.lang] = localeProps;
        callback && callback();
      });
    }
  }

  setLocaleProps(locale: XI18nProperty, lang: string): XI18nProperty {
    if (lang === 'zh_CN') {
      return { ...zh_CN, ...locale };
    } else if (lang === 'en_US') {
      return { ...en_US, ...locale };
    } else {
      return locale;
    }
  }

  setMeta() {
    const locale = this.i18n.getLocale();
    const description = this.meta.getTag("name='description'");
    description?.setAttribute('content', locale.meta.description);
  }

  getVersions() {
    this.http.get(`https://ngnest.com/static/json/version.json?v=${new Date().getTime()}`).subscribe((x: { versions: [] }) => {
      this.versions = x.versions;
    });
  }
}
