import { Component, signal } from '@angular/core';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XDropdownComponent, XLinkComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['用户管理', '角色管理', '组织管理', '模块管理', '日志管理']);
}
