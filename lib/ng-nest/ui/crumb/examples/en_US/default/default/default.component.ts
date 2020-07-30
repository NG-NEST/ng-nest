import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = ['首页', '用户管理', '用户列表', '用户详情'];
}
