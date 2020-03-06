import { Injectable, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/overlay';
import { Menu } from 'src/environments/routes';
import { menus } from 'src/environments/menus';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  contentRef: ElementRef;
  contentScrolling = new Subject<CdkScrollable>();
  shrink = false;
  category;

  menus: Menu[] = menus;

  constructor(private router: Router) {
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe((x: NavigationEnd) => {
      this.shrink = x.url.indexOf(`/${environment.layout}/docs`) == 0;
    });
  }
}
