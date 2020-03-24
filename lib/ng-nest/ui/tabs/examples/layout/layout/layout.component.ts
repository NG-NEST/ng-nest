import { Component } from '@angular/core';
import { XTabsLayout } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ExLayoutComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
  radios = ['top', 'right', 'bottom', 'left'];
  layout: XTabsLayout = 'top';
}
