import { Component } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-separator',
  standalone: true,
  imports: [XCrumbComponent, XIconComponent],
  templateUrl: './separator.component.html'
})
export class ExSeparatorComponent {
  data = ['首页', '用户管理', '用户列表', '用户详情'];
}
