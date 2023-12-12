import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';
import { XStorageService } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { LogoComponent } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';
import { NavComponent } from '../nav/nav.component';
import { XDrawerComponent } from '@ng-nest/ui/drawer';
import { SiderComponent } from '../sider/sider.component';

@Component({
  selector: 'ns-header',
  standalone: true,
  imports: [XButtonComponent, LogoComponent, SearchComponent, NavComponent, XDrawerComponent, SiderComponent],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  list = [
    { name: 'Home', page: './home' },
    { name: 'Demo', page: './demo' },
    { name: 'Docs', page: './docs' },
    { name: 'News', page: './news' }
  ];

  lang = this.storage.getLocal('Lang');

  constructor(public ele: ElementRef<HTMLElement>, public layout: LayoutService, private storage: XStorageService) {}

  ngOnInit() {
    this.layout.headerRef = this.ele;
  }

  push(page: string) {
    this.storage.setLocal('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }

  onLeftDrawer(visible: boolean) {
    this.layout.leftDrawerVisible = visible;
  }

  onRightDrawer(visible: boolean) {
    this.layout.rightDrawerVisible = visible;
  }
}
