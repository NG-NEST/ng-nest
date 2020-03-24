import { Component } from '@angular/core';

@Component({
  selector: 'ex-tag',
  templateUrl: './tag.component.html'
})
export class ExTagComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
