import { Injectable, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/overlay';
import { Menu } from 'src/environments/routes';
import { menus } from 'src/environments/menus';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ConfigService } from 'src/services/config.service';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  headerRef: ElementRef;
  contentRef: ElementRef;
  contentScrolling = new Subject<CdkScrollable>();
  shrink = false;
  small = false;
  xsmall = false;
  leftDrawerVisible = false;
  rightDrawerVisible = false;
  defaultActivatedId: any;
  menus: Menu[] = [];
  menusChange: () => void;
  menusLang: { [lang: string]: Menu[] } = {};
  navs: Menu[] = [];
  navActive: Menu;
  navChildrenCatch: { [lang: string]: { [key: string]: Menu[] } } = {
    zh_CN: {},
    en_US: {}
  };

  getCurrentMenu(url: string): Menu {
    let route = menus.find((x) => x.type !== 'router' && url.indexOf(`/${environment.layout}/${x.router}`) === 0) as Menu;
    if (route) {
      this.defaultActivatedId = route.id;
    }
    return route;
  }

  constructor(private router: Router, private config: ConfigService, private location: Location, private title: Title) {
    this.setMenusLang();
    this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe((x: NavigationEnd) => {
      const route = this.getCurrentMenu(x.urlAfterRedirects);
      if (route) {
        this.title.setTitle(`${route.label}${route.label !== 'NG-NEST' ? ' | NG-NEST' : ''}`);
        this.setNav();
      }
    });
    this.getCurrentMenu(this.location.path());
    this.setNav();
  }

  setMenusLang() {
    for (const lang of this.config.langs) {
      this.menusLang[lang] = menus.filter((x) => x.lang === lang);
    }
  }

  setLocale(lang: string) {
    const beforeLang = this.config.lang;
    this.config.setLocale(lang, () => {
      this.navs = this.menusLang[lang].filter((x) => x.pid === null);
      this.setNavActive(this.navs.find((x) => x.id === this.navActive.id) as Menu);
      this.router.navigateByUrl(this.location.path().replace(`/${beforeLang}/`, `/${lang}/`));
    });
  }

  setNav() {
    this.navs = this.menusLang[this.config.lang].filter((x) => x.pid === null);
    let navActive = this.navs.find((x) => this.location.path().indexOf(`/${environment.layout}/${x.router}`) === 0) as Menu;
    this.setNavActive(navActive);
  }

  setNavActive(menu: Menu) {
    if (!menu) {
      return;
    }
    this.navActive = menu;
    let childrenMenus = this.navChildrenCatch[this.config.lang][menu.id as string];
    if (childrenMenus) {
      this.menus = childrenMenus;
    } else {
      const langMenus = this.menusLang[this.config.lang];
      childrenMenus = langMenus
        .filter((x) => x.pid === menu.id)
        .map((x) => {
          const nav = { ...x };
          nav.pid = null;
          return nav;
        });
      const getChildren = (data: Menu[]) => {
        data.forEach((item) => {
          const children = langMenus.filter((x) => x.pid === item.id);
          if (children.length > 0) {
            childrenMenus.push(...children);
            getChildren(children);
          }
        });
      };
      getChildren(childrenMenus);

      this.menus = childrenMenus;
      this.navChildrenCatch[this.config.lang][menu.id as string] = this.menus;
    }
  }
}
