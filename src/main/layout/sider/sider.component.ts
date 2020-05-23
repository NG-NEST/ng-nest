import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Menu } from 'src/environments/routes';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-sider',
  templateUrl: './sider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiderComponent {
  option: Menu[] = this.layoutService.menus;

  constructor(public layoutService: LayoutService, public router: Router, public activated: ActivatedRoute) {}

  nodeClick(menu: Menu) {
    if (menu.type != 'router') this.router.navigate([menu.router], { relativeTo: this.activated });
    this.layoutService.drawerVisible = false;
  }
}
