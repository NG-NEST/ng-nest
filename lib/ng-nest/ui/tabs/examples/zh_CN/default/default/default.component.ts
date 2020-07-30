import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}
