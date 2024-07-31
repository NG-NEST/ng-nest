import { Injectable, Renderer2, RendererFactory2, inject, signal } from '@angular/core';
import { XI18nService, XI18nProperty, zh_CN, en_US, XI18nLanguage } from '@ng-nest/ui/i18n';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { XStorageService, XThemeService } from '@ng-nest/ui/core';
import { Platform } from '@angular/cdk/platform';
import { PrismService } from './prism.service';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  doc: Document = inject(DOCUMENT);
  colorsStyleEle!: HTMLStyleElement;
  defaultLang = signal<XI18nLanguage | null>(null);
  langs = signal(['zh_CN', 'en_US']);
  cacheLangs = signal<{ [lang: string]: XI18nProperty }>({});
  versions = signal<string[]>([]);
  version = signal('18.0.6');
  navName = signal('NG-NEST');
  renderer2: Renderer2;
  light = signal({
    '--layout-border-color': '#f6f6f6;'
  });
  dark = signal({
    '--layout-border-color': '#252525;'
  });

  get lang(): XI18nLanguage {
    let lg = this.storage.getLocal('Lang');
    if (!lg) {
      this.storage.setLocal('Lang', this.defaultLang());
      return this.defaultLang()!;
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
    private theme: XThemeService,
    private platform: Platform,
    private prism: PrismService,
    private factory: RendererFactory2
  ) {
    this.renderer2 = this.factory.createRenderer(null, null);
    this.defaultLang.set(this.i18n.getLocaleId());
    this.handleLang();
    this.prism.init();
    this.theme.changed.subscribe((x) => {
      this.setTheme(x);
    });
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
    let lang = this.langs().find((x) => path.indexOf(`/${x}/`) >= 0);
    return lang;
  }

  setLocale(locale?: string, callback?: () => void) {
    let lang = locale;
    if (!lang) lang = this.lang;
    if (this.cacheLangs()[lang]) {
      this.lang = lang as string;
      this.i18n.setLocale(this.cacheLangs()[lang], true);
      this.setMeta();
      callback && callback();
    } else {
      let url = `/i18n/${lang}.json`;
      if (!this.platform.isBrowser) {
        url = `https://ngnest.com/assets${url}`;
      }
      this.http.get<XI18nProperty>(url).subscribe((x) => {
        this.lang = lang as string;
        const localeProps = this.setLocaleProps(x, this.lang);
        this.i18n.setLocale(localeProps, true);
        this.setMeta();
        this.cacheLangs()[this.lang] = localeProps;
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

  setTheme(theme: 'light' | 'dark') {
    let colors = this.light();
    if (theme === 'light') {
      colors = this.light();
    } else if (theme === 'dark') {
      colors = this.dark();
    }
    if (this.colorsStyleEle) {
      this.renderer2.removeChild(this.colorsStyleEle.parentNode, this.colorsStyleEle);
    }
    const styles = Object.entries(colors)
      .map((x) => `${x[0]}: ${x[1]};`)
      .join('');
    this.colorsStyleEle = this.renderer2.createElement('style');
    this.colorsStyleEle.innerHTML = `.ns-colors{${styles}}`;
    this.renderer2.addClass(this.doc.documentElement, 'ns-colors');
    this.doc.documentElement.getElementsByTagName('head')[0].appendChild(this.colorsStyleEle);
  }

  getVersions() {
    this.http
      .get<{ versions: string[] }>(`https://ngnest.com/static/json/version.json?v=${new Date().getTime()}`)
      .subscribe((x) => {
        const versions = x.versions;
        if (!versions.includes(this.version())) {
          if (versions.length > 0) {
            versions.splice(1, 0, this.version());
          }
        }
        this.versions.set(versions);
      });
  }
}
