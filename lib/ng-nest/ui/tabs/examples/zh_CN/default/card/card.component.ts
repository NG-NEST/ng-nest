import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-card',
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = signal(['用户管理', '配置管理', '角色管理', '任务']);
}
