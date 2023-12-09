import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [CommonModule, XTabsComponent, XTabComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
