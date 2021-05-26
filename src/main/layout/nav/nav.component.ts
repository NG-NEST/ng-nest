import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { X_THEME_DARK_COLORS, X_THEME_COLORS, XConfigService } from '@ng-nest/ui/core';
import { ConfigService } from '@services/config.service';
import { XSliderNode } from '@ng-nest/ui/slider';
import { Menu } from 'src/environments/routes';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'ns-nav',
  templateUrl: './nav.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  theme: 'dark' | 'light' = 'light';
  get getActivatedIndex() {
    return this.layout.navs.map((x) => x.id).indexOf(this.layout.navActive?.id);
  }
  constructor(
    public layout: LayoutService,
    public xconfig: XConfigService,
    public config: ConfigService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    public location: Location
  ) {}

  action(type: string, param?: Menu | XSliderNode | string) {
    switch (type) {
      case 'dark':
        this.theme = type;
        this.xconfig.setDarkTheme({ colors: X_THEME_DARK_COLORS });
        this.cdr.detectChanges();
        break;
      case 'light':
        this.theme = type;
        this.xconfig.setLightTheme({ colors: X_THEME_COLORS });
        this.cdr.detectChanges();
        break;
      case 'zh_CN':
        this.layout.setLocale(type);
        break;
      case 'en_US':
        this.layout.setLocale(type);
        break;
      case 'github':
        window.open('https://github.com/NG-NEST', '_blank');
        break;
      case 'page':
        const menu = param as Menu;
        this.layout.setNavActive(menu);
        this.router.navigate([menu.router], { relativeTo: this.activatedRoute });
        this.cdr.detectChanges();
        break;
      case 'version':
        let index = this.config.versions.findIndex((x) => x === param);
        if (index <= 0) {
          window.location.href = window.location.origin;
        } else {
          window.location.href = window.location.origin + `/version/${param}`;
        }
        break;
      case 'admin':
        window.open('http://adminui.ngnest.com/', '_blank');
        break;
    }
  }
}
