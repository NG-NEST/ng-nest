import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XCrumbComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = signal([{ icon: 'fto-home' }, { label: '用户管理', icon: 'fto-user' }, '用户列表', '用户详情']);
}
