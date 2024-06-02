import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { XConfigService } from '@ng-nest/ui/core';
import { ConfigService } from '@services';
import { XSliderComponent, XSliderNode } from '@ng-nest/ui/slider';
import { AppMenu } from '@interfaces';
import { LayoutService } from '../layout.service';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from '../theme/theme.component';
import { XDialogService } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ns-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, XSliderComponent, XButtonComponent, XSelectComponent, XI18nPipe, ThemeComponent],
  templateUrl: './nav.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  document = inject(DOCUMENT);
  layout = inject(LayoutService);
  xconfig = inject(XConfigService);
  dialogService = inject(XDialogService);
  config = inject(ConfigService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  theme = signal<'dark' | 'light'>('light');
  activatedIndex = computed(() => {
    return this.layout
      .navs()
      .map((x) => x.id)
      .indexOf(this.layout.navActive()?.id);
  });

  action(type: string, param?: AppMenu | XSliderNode | string) {
    const wd = this.document.defaultView!;
    switch (type) {
      case 'zh_CN':
        this.layout.setLocale(type);
        break;
      case 'en_US':
        this.layout.setLocale(type);
        break;
      case 'github':
        wd.open('https://github.com/NG-NEST', '_blank');
        break;
      case 'page':
        const menu = param as AppMenu;
        this.layout.setNavActive(menu);
        this.router.navigate([menu.routerLink], { relativeTo: this.activatedRoute });
        break;
      case 'version':
        const index = this.config.versions().findIndex((x) => x === param);
        if (index <= 0) {
          wd.location.href = wd.location.origin;
        } else {
          wd.location.href = wd.location.origin + `/version/${param}/`;
        }
        break;
      case 'admin':
        wd.open('http://adminui.ngnest.com/', '_blank');
        break;
      case 'theme':
        this.dialogService.create(ThemeComponent, {
          className: 'ns-theme',
          width: '48rem'
        });
        break;
    }
  }
}
