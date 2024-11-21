import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-tag',
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './tag.component.html'
})
export class ExTagComponent {
  labels = signal(['用户管理', '配置管理', '角色管理', '任务']);
}
