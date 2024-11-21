import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@Component({
  selector: 'ex-prop',
  imports: [XDropdownComponent, XButtonComponent],
  templateUrl: './prop.component.html'
})
export class ExPropComponent {
  data = signal([
    { label: '用户管理', icon: 'fto-user' },
    { label: '角色管理', icon: 'fto-users' },
    '组织管理',
    { label: '模块管理', divided: true },
    { label: '日志管理', disabled: true }
  ]);
}
