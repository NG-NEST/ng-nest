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
  contentRef: ElementRef;
  contentScrolling = new Subject<CdkScrollable>();
  shrink = true;
  small = false;
  drawerVisible = false;
  defaultActivatedId: any;

  menus: Menu[] = menus.filter((x) => x.lang === this.config.lang);

  menusChange: () => void;

  versions = [
    '0.2.0',
    '0.2.1',
    '0.2.2',
    '1.0.0',
    '1.1.2',
    '1.2.0',
    '1.2.1',
    '1.2.2',
    '1.2.4',
    '1.2.5',
    '1.3.0',
    '1.3.1',
    '1.4.0',
    '1.4.1',
    '1.4.2',
    '1.4.3',
    '9.0.0',
    '9.1.0',
    '10.0.0',
    '11.0.0',
    '11.0.1'
  ];

  getCurrentMenu(url: string): Menu {
    return this.menus.find((x) => x.type !== 'router' && url.indexOf(`/${environment.layout}/${x.router}`) === 0) as Menu;
  }

  constructor(private router: Router, private config: ConfigService, private location: Location, private title: Title) {
    this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe((x: NavigationEnd) => {
      // this.shrink = x.url.indexOf(`/${environment.layout}/docs`) == 0;
      // console.log(this.shrink);
      const route = this.getCurrentMenu(x.url);

      if (route) this.title.setTitle(`${route.label}${route.label !== 'NG-NEST' ? ' | NG-NEST' : ''}`);
    });
    const route = this.getCurrentMenu(this.location.path());
    if (route) {
      this.defaultActivatedId = route.id;
    }
  }

  setLocale(lang: string) {
    const beforeLang = this.config.lang;
    this.config.setLocale(lang);
    this.menus = menus.filter((x) => x.lang === lang);
    this.router.navigateByUrl(this.location.path().replace(`/${beforeLang}/`, `/${lang}/`));
  }
}
