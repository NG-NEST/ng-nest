import { Component } from '@angular/core';

@Component({
  selector: 'ex-prop',
  templateUrl: './prop.component.html'
})
export class ExPropComponent {
  data = [
    { label: '用户管理', icon: 'fto-user' },
    { label: '角色管理', icon: 'fto-users' },
    '组织管理',
    { label: '模块管理', divided: true },
    { label: '日志管理', disabled: true }
  ];
}
