import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-card',
  standalone: true,
  imports: [CommonModule, XTabsComponent, XTabComponent],
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
