import { Component } from '@angular/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = [{ icon: 'fto-home' }, { label: '用户管理', icon: 'fto-user' }, '用户列表', '用户详情'];
}
