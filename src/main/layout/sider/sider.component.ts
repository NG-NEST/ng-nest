import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ns-sider',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './sider.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SiderComponent {
  constructor(
    public layout: LayoutService,
    public config: ConfigService,
    public router: Router,
    public activated: ActivatedRoute
  ) {}
}
