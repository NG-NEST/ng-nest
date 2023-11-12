import { Injectable } from '@angular/core';
import { XI18nService, XI18nProperty, zh_CN, en_US } from '@ng-nest/ui/i18n';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { XStorageService } from '@ng-nest/ui/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  defaultLang: string;
  langs = ['zh_CN', 'en_US'];
  cacheLangs: { [lang: string]: XI18nProperty } = {};
  versions: string[] = [];
  version = '17.0.0';
  navName = 'NG-NEST';

  get lang() {
    let lg = this.storage.getLocal('Lang');
    if (!lg) {
      this.storage.setLocal('Lang', this.defaultLang);
      return this.defaultLang;
    }
    return lg;
  }

  set lang(value: string) {
    this.storage.setLocal('Lang', value);
  }
  constructor(
    public i18n: XI18nService,
    public http: HttpClient,
    private location: Location,
    private meta: Meta,
    private storage: XStorageService,
    private platform: Platform
  ) {
    this.defaultLang = this.i18n.getLocaleId();
    this.handleLang();
  }

  init() {
    this.setLocale(this.checkPath());
    this.getVersions();
  }

  handleLang() {
    let lang = this.lang;
    if (lang.startsWith('"') && lang.endsWith('"')) {
      lang = lang.replace(/\"/g, '');
      this.lang = lang;
    }
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
      let url = `/assets/i18n/${lang}.json`;
      if (!this.platform.isBrowser) {
        url = `https://ngnest.com${url}`;
      }
      this.http.get<XI18nProperty>(url).subscribe((x) => {
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
    const { meta } = locale;
    description?.setAttribute('content', meta.description);
  }

  getVersions() {
    this.http.get<{ versions: string[] }>(`https://ngnest.com/static/json/version.json?v=${new Date().getTime()}`).subscribe((x) => {
      const versions = x.versions;
      if (!versions.includes(this.version)) {
        if (versions.length > 0) {
          versions.splice(1, 0, this.version);
        }
      }
      this.versions = versions;
    });
  }
}
