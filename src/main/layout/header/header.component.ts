import { Component, ElementRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
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
  elementRef = inject(ElementRef);
  layout = inject(LayoutService);
  storage = inject(XStorageService);

  ngOnInit() {
    this.layout.headerRef.set(this.elementRef);
  }

  push(page: string) {
    this.storage.setLocal('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }

  onLeftDrawer(visible: boolean) {
    this.layout.leftDrawerVisible.set(visible);
  }

  onRightDrawer(visible: boolean) {
    this.layout.rightDrawerVisible.set(visible);
  }
}
