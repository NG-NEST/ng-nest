import { Component } from '@angular/core';

@Component({
  selector: 'ex-card',
  templateUrl: './card.component.html'
})
export class ExCardComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
