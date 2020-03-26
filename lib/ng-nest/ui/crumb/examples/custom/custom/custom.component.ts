import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html'
})
export class ExCustomComponent {
  data = ['首页', '用户管理', '用户列表', '用户详情'];
}
