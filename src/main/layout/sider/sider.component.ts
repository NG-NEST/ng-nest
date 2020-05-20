import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private layoutService: LayoutService, private router: Router, private activated: ActivatedRoute) {}

  nodeClick(menu: Menu) {
    if (menu.type != 'router') this.router.navigate([menu.router], { relativeTo: this.activated });
  }
}
